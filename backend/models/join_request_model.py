from database.db import (
    join_requests_collection
)


# CREATE REQUEST
def create_join_request(data):

    return join_requests_collection.insert_one(
        data
    )


# GET ROOM REQUESTS
def get_room_join_requests(room_id):

    return list(

        join_requests_collection.find({

            "roomId":
            room_id,

            "status":
            "pending"

        })

    )


# APPROVE REQUEST
def approve_join_request(request_id):

    return join_requests_collection.update_one(

        {

            "_id":
            request_id

        },

        {

            "$set": {

                "status":
                "approved"

            }

        }

    )


# DELETE REQUEST
def delete_join_request(request_id):

    return join_requests_collection.delete_one({

        "_id":
        request_id

    })


# GET USER JOIN REQUESTS
def get_user_join_requests(username):

    return list(

        join_requests_collection.find({

            "requestedBy.username":
            username,

            "status":
            "pending"

        })

    )