from database.db import (
    messages_collection
)


# SAVE MESSAGE
def save_message(message_data):

    return messages_collection.insert_one(
        message_data
    )


# GET ROOM MESSAGES
def get_room_messages(room_id):

    return list(

        messages_collection.find({

            "roomId":
            room_id

        }).sort(

            "createdAt",
            1

        )

    )