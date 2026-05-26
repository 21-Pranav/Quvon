from flask import Blueprint

from models.message_model import (
    get_room_messages
)

message_bp = Blueprint(
    "messages",
    __name__
)


# GET ROOM MESSAGES
@message_bp.route(

    "/<room_id>",

    methods=["GET"]

)
def fetch_room_messages(room_id):

    messages = get_room_messages(
        room_id
    )

    formatted_messages = []

    for msg in messages:

        formatted_messages.append({

            "_id":
            str(msg["_id"]),

            "roomId":
            msg["roomId"],

            "username":
            msg["username"],

            "message":
            msg["message"],

            "iv":
            msg["iv"],

            # DILITHIUM SIGNATURE
            "signature":
            msg.get(
                "signature"
            ),

            "createdAt":
            str(
                msg.get(
                    "createdAt"
                )
            )

        })

    return {

        "messages":
        formatted_messages

    }, 200