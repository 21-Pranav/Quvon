from flask import (
    Blueprint,
    request,
    send_file
)

from bson import ObjectId

from io import BytesIO

from datetime import datetime

import uuid

from models.file_model import (
    create_file,
    get_room_files
)

from database.db import fs

file_bp = Blueprint(
    "files",
    __name__
)


# UPLOAD ENCRYPTED FILE
@file_bp.route(
    "/upload",
    methods=["POST"]
)
def upload_file():

    try:

        encrypted_file =      request.files.get("file")

        room_id =    request.form.get("roomId")

        username = request.form.get("username")

        iv =request.form.get("iv")
 
        # ENCRYPTED FILE NAME
        encrypted_filename = request.form.get(
                "encryptedFilename"
            )

        file_name_iv = request.form.get(
                "fileNameIV"
            )

        # ML-DSA SIGNATURE
        signature = request.form.get(
                "signature"
            )

        if not encrypted_file:

            return {

                "error":
                "File missing"

            }, 400

        # RANDOM INTERNAL NAME
        unique_filename = str(
            uuid.uuid4()
        )

        # STORE ENCRYPTED FILE
        file_id = fs.put(

            encrypted_file,

            filename=unique_filename

        )

        # FILE METADATA
        file_data = {

            "roomId":
            room_id,

            "username":
            username,

            "encryptedFilename":
            encrypted_filename,

            "fileNameIV":
            file_name_iv,

            "fileId":
            str(file_id),

            "iv":
            iv,

            # SIGNATURE
            "signature":
            signature,

            "createdAt":
            datetime.utcnow()

        }

        # SAVE FILE
        create_file(file_data)

        return {

            "message":
            "Encrypted file uploaded",

            "file": {

                "encryptedFilename":
                encrypted_filename,

                "fileNameIV":
                file_name_iv,

                "fileId":
                str(file_id),

                "iv":
                iv,

                "username":
                username,

                # RETURN SIGNATURE
                "signature":
                signature,

                "timestamp":
                str(
                    fs.get(file_id).upload_date
                )

            }

        }, 201

    except Exception as error:

        print(error)

        return {

            "error":
            "File upload failed"

        }, 500


# GET ROOM FILES
@file_bp.route(
    "/room/<room_id>",
    methods=["GET"]
)
def fetch_room_files(room_id):

    files = get_room_files(room_id)

    formatted_files = []

    for file in files:

        # GRIDFS FILE
        grid_file = fs.get(

            ObjectId(
                file["fileId"]
            )

        )

        formatted_files.append({

            "_id":
            str(file["_id"]),

            "roomId":
            file["roomId"],

            "username":
            file["username"],

            "encryptedFilename":
            file["encryptedFilename"],

            "fileNameIV":
            file["fileNameIV"],

            "fileId":
            file["fileId"],

            "iv":
            file["iv"],

            # RETURN SIGNATURE
            "signature":
            file.get(
                "signature"
            ),

            "timestamp":
            str(
                grid_file.upload_date
            )

        })

    return {

        "files":
        formatted_files

    }, 200


# DOWNLOAD ENCRYPTED FILE
@file_bp.route(
    "/download/<file_id>",
    methods=["GET"]
)
def download_file(file_id):

    try:

        grid_file = fs.get(

            ObjectId(file_id)

        )

        return send_file(

            BytesIO(
                grid_file.read()
            ),

            download_name=
            "encrypted.bin",

            as_attachment=True

        )

    except Exception as error:

        print(error)

        return {

            "error":
            "File download failed"

        }, 500