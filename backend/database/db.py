from pymongo import MongoClient
from dotenv import load_dotenv
import gridfs

import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["QuvonDB"]

users_collection = db["users"]

rooms_collection = db["rooms"]

messages_collection = db["messages"]

join_requests_collection = db["join_requests"]

files_collection = db["files"]

# GRIDFS
fs = gridfs.GridFS(db)