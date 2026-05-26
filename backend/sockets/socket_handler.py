from flask_socketio import (

    emit,

    join_room,

    leave_room

)

from datetime import datetime

from models.message_model import (

    save_message

)


def register_socket_events(socketio):

    # JOIN ROOM
    @socketio.on("join_room")
    def handle_join_room(data):

        username = data["username"]

        room_id = data["roomId"]

        # JOIN SOCKET ROOM
        join_room(room_id)

        print(
            f"{username} joined {room_id}"
        )

        # SYSTEM EVENT
        emit(

            "user_joined",

            {

                "username":
                "SYSTEM",

                "message":
                f"{username} joined secure room"

            },

            room=room_id

        )

    # LEAVE ROOM
    @socketio.on("leave_room")
    def handle_leave_room(data):

        room_id = data["roomId"]

        leave_room(room_id)

    # SEND MESSAGE
    @socketio.on("send_message")
    def handle_send_message(data):

        room_id = data["roomId"]

        username = data["username"]

        message = data["message"]

        iv = data["iv"]

        # DILITHIUM SIGNATURE
        signature = data.get(
            "signature"
        )

        message_data = {

            "roomId":
            room_id,

            "username":
            username,

            "message":
            message,

            "iv":
            iv,

            "signature":
            signature,

            "createdAt":
            datetime.utcnow()

        }

        # SAVE ENCRYPTED MESSAGE
        save_message(
            message_data
        )

        # BROADCAST MESSAGE
        emit(

            "receive_message",

            {

                "username":
                username,

                "message":
                message,

                "iv":
                iv,

                "signature":
                signature,

                "createdAt":
                str(
                    datetime.utcnow()
                )

            },

            room=room_id

        )

    # SEND FILE EVENT
    @socketio.on("send_file")
    def handle_send_file(data):

        room_id = data["roomId"]

        file_data = data["file"]

        # BROADCAST FILE TO ROOM
        emit(

            "receive_file",

            file_data,

            room=room_id

        )