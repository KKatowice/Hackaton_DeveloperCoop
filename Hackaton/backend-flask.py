import os, pymongo
from flask import Flask, jsonify, request
from werkzeug.utils import secure_filename
from datetime import timedelta
import json
from openai import OpenAI
from google.cloud import storage


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = "../Hackaton/files"
client = pymongo.MongoClient("mongodb+srv://armandolacerezagc:yyfRehzIWI8M8Nok@cluster0.kwa0fg9.mongodb.net/")
db = client["Hackaton_db"]
forum_post = db["forum_post"]
users = db["users"]
keydb = db["key"]

@app.route("/insertuser", methods=["POST"])
def insertuser():
    dati = json.loads(request.json)

    if dati["email"] and len(list(users.find({'email': dati["email"]}))) == 0:
        users.insert_one(dati)
        return jsonify({"result": "ok"})
    else:
        return jsonify({"result": "error"})


@app.route("/newpost", methods=["POST"])
def newpost():
    new_post = json.loads(request.json)
    forum_post.insert_one(new_post)
    # users.update_one(
    #     {'email': new_post["email"],
    #      {'$push': {}}}
    # )
    return jsonify({"result": "ok"})

@app.route("/newcomment", methods=["POST"])
def newcomment():
    new_comment = json.loads(request.json)
    post = list(forum_post.find({"_id": new_comment["postid"]}))[0]
    comments = post["commenti"]
    newid = new_comment["postid"] + "-" + str(len(comments))
    new_comment["postid"] = newid

    forum_post.update_one(
        {"_id": post["_id"]},
        {"$push": {"commenti": new_comment}}
    )
    return jsonify({"result": "ok"})

@app.route("/newsubcomment", methods=["POST"])
def newsubcomment():
    new_subcomment = json.loads(request.json)
    post = list(forum_post.find({"_id": new_subcomment["commentid"].split("-")[0]}))[0]
    comments = post["commenti"]
    for elem in comments:
        if new_subcomment["commentid"] == elem["commentid"]:
            elem["risposte"].append(new_subcomment)
            break

    filtro = {"_id": post["_id"]}
    aggiornamento = {"$set": {"commenti": comments}}
    forum_post.update_one(filtro, aggiornamento)
    return jsonify({"result": "ok"})


@app.route("/savefile", methods=["POST"])
def savefile():
    if "newfile" in request.files:
        file =request.files["newfile"]
        infofile = json.loads(request.json) #idperson+idpost

        if file and file != "":
            if correct_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(filename)


                # os.remove(file.filename)

@app.route("/pswd", methods=["POST"])
def get_salt_pswd():
    email = json.loads(request.json)["email"]
    response = users.find({"email": email}, {"_id":0, "salt":1, "password":1})
    for elem in response:
        diz = {"salt": elem["salt"], "password": elem["password"]}
        return jsonify(diz)

@app.route("/ia", methods=["POST"])
def ia():
    info = json.loads(request.json)
    prompt = info["prompt"]
    response = ia_service(prompt)
    return jsonify({"response": response})


def correct_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def ia_service(prompt):
    risultato = list(keydb.find())
    key = risultato[0]["key"]
    client = OpenAI(api_key=key)

    chat_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )
    return str(chat_completion.choices[0].message.content)

