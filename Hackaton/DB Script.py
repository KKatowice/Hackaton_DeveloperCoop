import pymongo
from fastapi import FastAPI, Form

app = FastAPI()

client = pymongo.MongoClient("mongodb+srv://armandolacerezagc:yyfRehzIWI8M8Nok@cluster0.kwa0fg9.mongodb.net/")
db = client["forum"]
prodotti = db["forum_post"]
users = db["users"]


@app.post('/insertuser')
async def insert_user():
    return 0


# @app.get('/insertforum')
# async def insert_forum():
#     return 0

@app.post("/signup")
def signup(email: str = Form(...), nome: str = Form(...), cognome: str = Form(...),
           password: str = Form(...), role: str = Form(...), interessi: str = Form(...)):

    users.insert_one({
        "email": email,
        "nome": nome,
        "cognome": cognome,
        "password": password,
        "role": role,
        "interessi": interessi,
        "post": [],
        "coment": [],
        "file": []
    })



def insert_forum():
    id = 0
    titolo = 0
    email = 0
    like = 0
    timestamp = 0
    comments = 0
    tags = 0
