import pymongo
import time

from pymongo import MongoClient
from bson.objectid import ObjectId 

client = MongoClient("mongodb+srv://armandolacerezagc:yyfRehzIWI8M8Nok@cluster0.kwa0fg9.mongodb.net/")
db = client.Hackaton_db
forum_postCollection = db.forum_post

record = forum_postCollection.find({"_id": ObjectId("664602cdf9e176e49ced5f94")}, {"_id": 0, "commenti": 1})

c = 0
for elem in record:
    print(len(elem["commenti"]))


#ESEMPI STRUTTURE:

#QUANDO IL POST SARA' CREATO VERRA' FUORI COSI' CON LA LISTA COMMENTI VUOTA
prova_post_no_commento = {
    "userID" : 1,
    "titolo" : "Esempio post forum",
    "testo" : "Esempio di testo del post. Lo faccio abbastanza lungo almeno si distingue",
    "likes" : 3,
    "commenti" : []
}

#ESEMPIO DI UN POST CON UN COMMENTO GIA' INSERITO
prova_post = {
    "userID" : 1,
    "titolo" : "Esempio post forum",
    "testo" : "Esempio di testo del post. Lo faccio abbastanza lungo almeno si distingue",
    "likes" : 3,
    "commenti" : [
        {
        "userID" : 2,
        "testo" : "Testo di prova del commento sotto al post",
        "likes" : 5,
        "timestamp" : time.time(),
        "risposte" : [
            {
                "userID": 3,
                "testo" : "Testo di prova del commento in risposta ad un altro commento",
                "likes" : 10,
                "timestamp" : time.time()    
            }
            ]
        }
    ]
}

#STRUTTURA DI UN COMMENTO GENERICO PER SOTTO IL POST
commento_prova = {
    "commentID" : "",
    "userID" : 3,                                  #da prendere in automatico
    "testo" : "Questo è un commento di un post",
    "likes" : 0,                                   #da aggiornare ogni volta che il like viene messo 
    "timestamp" : time.time(),
    "risposte" : []                                #da aggiornare
}

#STRUTTURA DI UN SOTTOCOMMENTO IN RISPOSTA AD UN COMMENTO DI UN POST
sottocommento_prova = {
    "userID" : 3,                                  
    "testo" : "Questo è un commento di un post",
    "likes" : 0,                                    
    "timestamp" : time.time()                      
}

#664602cdf9e176e49ced5f94-1  index per i commenti