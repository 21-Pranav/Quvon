from flask import Blueprint, request

import shortuuid

from datetime import datetime

from models.room_model import (

    create_room,

    find_room_by_room_id,

    share_room_key,

    get_user_rooms

)

room_bp = Blueprint(
    "rooms",
    __name__
)


# CREATE SECURE ROOM
@room_bp.route(
    "/create",
    methods=["POST"]
)
def create_secure_room():

    data = request.json

    created_by = data.get(
        "createdBy"
    )

    encrypted_keys = data.get(
        "encryptedKeys"
    )

    room_id = (
        f"QS-{shortuuid.ShortUUID().random(length=6)}"
    )

    room_data = {

        "roomId":
        room_id,

        "createdBy":
        created_by,

        # CREATOR IS FIRST MEMBER
        "members": [

            created_by

        ],

        # ENCRYPTED ROOM KEYS
        "encryptedKeys":
        encrypted_keys,

        "createdAt":
        datetime.utcnow()

    }

    create_room(room_data)

    return {

        "message":
        "Secure room created successfully",

        "roomId":
        room_id

    }, 201


# VALIDATE ROOM
@room_bp.route(
    "/join/<room_id>",
    methods=["GET"]
)
def validate_room(room_id):

    room = find_room_by_room_id(
        room_id
    )

    if not room:

        return {

            "error":
            "Room not found"

        }, 404

    room["_id"] = str(room["_id"])

    return {

        "message":
        "Room exists",

        "room":
        room

    }, 200


# SHARE ROOM KEY
@room_bp.route(

    "/share-key/<room_id>",

    methods=["POST"]

)
def share_secure_room_key(room_id):

    data = request.json

    username = data.get(
        "username"
    )

    encrypted_key_data = (
        data.get(
            "encryptedKeyData"
        )
    )

    share_room_key(

        room_id,

        username,

        encrypted_key_data

    )

    return {

        "message":
        "Secure room key shared"

    }, 200


# GET USER ROOMS
@room_bp.route(

    "/user/<username>",

    methods=["GET"]

)
def fetch_user_rooms(username):

    rooms = get_user_rooms(username)

    formatted_rooms = []

    for room in rooms:

        formatted_rooms.append({

            "_id":
            str(room["_id"]),

            "roomId":
            room["roomId"],

            "createdBy":
            room["createdBy"]

        })

    return {

        "rooms":
        formatted_rooms

    }, 200