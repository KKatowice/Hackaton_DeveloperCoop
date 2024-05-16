import os, pymongo
from flask import Flask, jsonify, request
from werkzeug.utils import secure_filename
from datetime import timedelta
import json


app = Flask(__name__)
client = pymongo.MongoClient("mongodb+srv://armandolacerezagc:yyfRehzIWI8M8Nok@cluster0.kwa0fg9.mongodb.net/")
db = client["Hackaton_db"]
forum_post = db["forum_post"]
users = db["users"]


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
    users.update_one(
        {'email': new_post["email"],
         {'$push': {}}}
    )
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
    email = json.loads(request.json)
    response = users.find({"email": email}, {"_id":0, "salt":1, "password":1})
    for elem in response:
        diz = {"salt": elem["salt"], "password": elem["password"]}
        return jsonify(diz)


def correct_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS