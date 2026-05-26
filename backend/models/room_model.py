from database.db import (
    rooms_collection
)


# CREATE ROOM
def create_room(room_data):

    return rooms_collection.insert_one(
        room_data
    )


# FIND ROOM
def find_room_by_room_id(room_id):

    return rooms_collection.find_one({

        "roomId":
        room_id

    })


# SHARE ROOM KEY
def share_room_key(

    room_id,

    username,

    encrypted_key_data

):

    return rooms_collection.update_one(

        {

            "roomId":
            room_id

        },

        {

            "$set": {

                f"encryptedKeys.{username}":
                encrypted_key_data

            },

            "$addToSet": {

                "members":
                username

            }

        }

    )


# ADD MEMBER
def add_member_to_room(

    room_id,

    member_data

):

    return rooms_collection.update_one(

        {

            "roomId":
            room_id

        },

        {

            "$addToSet": {

                "members":
                member_data

            }

        }

    )


# GET USER ROOMS
def get_user_rooms(username):

    return list(

        rooms_collection.find({

            "members":
            username

        })

    )