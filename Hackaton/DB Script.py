import pymongo
from fastapi import FastAPI, Form, Body
from pydantic import BaseModel

app = FastAPI()

client = pymongo.MongoClient("mongodb+srv://armandolacerezagc:yyfRehzIWI8M8Nok@cluster0.kwa0fg9.mongodb.net/")
db = client["forum"]
prodotti = db["forum_post"]
users = db["users"]


class User_Signin(BaseModel):
    salt: str | None = None
    address: str | None = None
    email: str | None = None
    password: str | None = None
    nome: str | None = None
    cognome: str | None = None
    role: str | None = None
    interessi: str | None = None

@app.post('/insertuser')
async def insert_user():
    return 0


# @app.get('/insertforum')
# async def insert_forum():
#     return 0

@app.post("/signup")
def signup(user_data: User_Signin):
    
    if user_data.email and len(list(users.find({'email': user_data.email}))) == 0:
        users.insert_one({
            "email": user_data.email,
            "nome": user_data.nome,
            "cognome": user_data.cognome,
            "password": user_data.password,
            "role": user_data.role,
            "interessi": user_data.interessi,
            "post": [],
            "comment": [],
            "file": [],
            "salt": user_data.salt,
            "address": user_data.address
        })
    else:
        return 0



def insert_forum():
    id = 0
    titolo = 0
    email = 0
    like = 0
    timestamp = 0
    comments = 0
    tags = 0
