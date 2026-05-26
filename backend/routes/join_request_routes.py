from flask import Blueprint, request

from datetime import datetime

from bson import ObjectId

from models.join_request_model import (

    create_join_request,

    get_room_join_requests,

    approve_join_request,

    delete_join_request,

    get_user_join_requests

)

join_request_bp = Blueprint(

    "join_requests",

    __name__

)


# SEND JOIN REQUEST
@join_request_bp.route(

    "/create",

    methods=["POST"]

)
def create_request():

    data = request.json

    room_id = data.get(
        "roomId"
    )

    requested_by = {

        "username":
        data.get("username")

    }

    request_data = {

        "roomId":
        room_id,

        "requestedBy":
        requested_by,

        "status":
        "pending",

        "createdAt":
        datetime.utcnow()

    }

    create_join_request(
        request_data
    )

    return {

        "message":
        "Join request sent"

    }, 201


# GET ROOM REQUESTS
@join_request_bp.route(

    "/room/<room_id>",

    methods=["GET"]

)
def get_requests(room_id):

    requests = (
        get_room_join_requests(
            room_id
        )
    )

    formatted_requests = []

    for req in requests:

        formatted_requests.append({

            "_id":
            str(req["_id"]),

            "roomId":
            req["roomId"],

            "requestedBy":
            req["requestedBy"],

            "status":
            req["status"]

        })

    return {

        "requests":
        formatted_requests

    }, 200


# GET USER JOIN REQUESTS
@join_request_bp.route(

    "/user/<username>",

    methods=["GET"]

)
def get_user_requests(username):

    requests = get_user_join_requests(
        username
    )

    formatted_requests = []

    for req in requests:

        formatted_requests.append({

            "_id":
            str(req["_id"]),

            "roomId":
            req["roomId"],

            "status":
            req["status"]

        })

    return {

        "requests":
        formatted_requests

    }, 200


# APPROVE REQUEST
@join_request_bp.route(

    "/approve/<request_id>",

    methods=["POST"]

)
def approve_request(request_id):

    approve_join_request(

        ObjectId(request_id)

    )

    return {

        "message":
        "Request approved"

    }, 200


# DELETE REQUEST
@join_request_bp.route(

    "/delete/<request_id>",

    methods=["DELETE"]

)
def delete_request(request_id):

    delete_join_request(

        ObjectId(request_id)

    )

    return {

        "message":
        "Request deleted"

    }, 200