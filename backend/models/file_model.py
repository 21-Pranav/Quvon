from database.db import (
    files_collection
)

# SAVE FILE METADATA
def create_file(file_data):

    return files_collection.insert_one(
        file_data
    )

# GET ROOM FILES
def get_room_files(room_id):

    return list(

        files_collection.find({

            "roomId":
            room_id

        })

    )

# GET SINGLE FILE
def get_file_by_gridfs_id(file_id):

    return files_collection.find_one({

        "fileId":
        file_id

    })