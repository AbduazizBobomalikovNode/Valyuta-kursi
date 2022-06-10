import time as t
import os
CONNECTION_STRING =os.environ['DATE_URL']

def get_database():
    from pymongo import MongoClient
    import pymongo

    # Provide the mongodb atlas url to connect python to mongodb using pymongo

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['currency']

dbname = get_database()
date = t.strftime('%Y-%m-%d', t.localtime())
def get_RUB():
    collection_name = dbname["RUB"]
    return collection_name.find({"time" : date})

def get_USD():
    collection_name = dbname["USD"]
    return collection_name.find({"time" : date})

def get_MB():
    collection_name = dbname["MaB"]
    return collection_name.find({"time" : date})

def get_BR():
    collection_name = dbname["BR"]
    return collection_name.find({"time" : date})

def get_BN():
    collection_name = dbname["BN"]
    return collection_name.find({"time" : date})