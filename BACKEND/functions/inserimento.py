import pymongo
import time

from pymongo import MongoClient
from bson.objectid import ObjectId 

client = MongoClient("mongodb+srv://armandolacerezagc:yyfRehzIWI8M8Nok@cluster0.kwa0fg9.mongodb.net/")
db = client.Hackaton_db
forum_postCollection = db.forum_post

def inserisci_post(id_user, titolo, testo):
    nuovo_post = {
    "userID" : id_user,
    "titolo" : titolo,
    "testo" : testo,
    "likes" : 0,
    "commenti" : []
    }
    forum_postCollection.insert_one(nuovo_post)


def inserisci_commento(id_post, id_user, testo):
    commento = {
        "commentID" : "",
        "userID" : id_user,                                  #da prendere in automatico
        "testo" : testo,
        "likes" : 0,                                   #da aggiornare ogni volta che il like viene messo 
        "timestamp" : time.time(),
        "risposte" : []                                #da aggiornare
    }
    record = forum_postCollection.find({"_id": ObjectId(id_post)}, {"_id": 0, "commenti": 1})
    for elem in record:
        length = len(elem["commenti"])
    commento["commentID"] = id_post + "-" + str(length)
    #update che aggiunge commento sotto ad un post
    forum_postCollection.update_one(
        {"_id" : ObjectId(id_post)}, 
        {"$push": {"commenti": commento}})
    print("Commento caricato")


def inserisci_sottocommento(id_commento, id_user, testo):
    sottocommento = {
    "userID" : id_user,                                  
    "testo" : testo,
    "likes" : 0,                                    
    "timestamp" : time.time()                      
    }
    path = "commenti." + id_commento + ".risposte"
    #update che aggiunge commento sotto ad un commento
    forum_postCollection.update_one(
        {"_id" : ObjectId("664602cdf9e176e49ced5f94")}, 
        {"$push": {path: sottocommento}})      
    print("Sottocommento caricato")



