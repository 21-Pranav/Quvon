from flask import Blueprint

from models.user_model import (
    find_user_by_username
)

user_bp = Blueprint(
    "users",
    __name__
)


# GET USER PUBLIC KEYS
@user_bp.route(

    "/public-key/<username>",

    methods=["GET"]

)
def get_public_key(username):

    user = find_user_by_username(
        username
    )

    if not user:

        return {

            "error":
            "User not found"

        }, 404

    return {

        # KYBER
        "publicKey":
        user["publicKey"],

        # DILITHIUM
        "signPublicKey":
        user.get(
            "signPublicKey"
        )

    }, 200