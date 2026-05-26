from flask import Blueprint, request

import bcrypt
import jwt
import os

from dotenv import load_dotenv

from models.user_model import (
    create_user,
    find_user_by_email,
    find_user_by_username
)

load_dotenv()

JWT_SECRET = os.getenv(
    "JWT_SECRET"
)

auth_bp = Blueprint(
    "auth",
    __name__
)


# REGISTER ROUTE
@auth_bp.route(
    "/register",
    methods=["POST"]
)
def register():

    data = request.json

    username = data.get(
        "username"
    )

    email = data.get(
        "email"
    )

    password = data.get(
        "password"
    )

    # KYBER PUBLIC KEY
    public_key = data.get(
        "publicKey"
    )

    # DILITHIUM PUBLIC KEY
    sign_public_key = data.get(
        "signPublicKey"
    )

    # CHECK EMAIL
    existing_email = (
        find_user_by_email(email)
    )

    if existing_email:

        return {

            "error":
            "Email already exists"

        }, 400

    # CHECK USERNAME
    existing_username = (
        find_user_by_username(
            username
        )
    )

    if existing_username:

        return {

            "error":
            "Username already exists"

        }, 400

    # HASH PASSWORD
    hashed_password = bcrypt.hashpw(

        password.encode("utf-8"),

        bcrypt.gensalt()

    )

    # USER DOCUMENT
    user_data = {

        "username":
        username,

        "email":
        email,

        "password":
        hashed_password,

        # KYBER PUBLIC KEY
        "publicKey":
        public_key,

        # DILITHIUM PUBLIC KEY
        "signPublicKey":
        sign_public_key

    }

    # SAVE USER
    create_user(user_data)

    return {

        "message":
        "User registered successfully"

    }, 201


# LOGIN ROUTE
@auth_bp.route(
    "/login",
    methods=["POST"]
)
def login():

    data = request.json

    email = data.get(
        "email"
    )

    password = data.get(
        "password"
    )

    user = find_user_by_email(
        email
    )

    if not user:

        return {

            "error":
            "Invalid email or password"

        }, 401

    password_match = bcrypt.checkpw(

        password.encode("utf-8"),

        user["password"]

    )

    if not password_match:

        return {

            "error":
            "Invalid email or password"

        }, 401

    # JWT TOKEN
    token = jwt.encode(

        {

            "email":
            user["email"],

            "username":
            user["username"]

        },

        JWT_SECRET,

        algorithm="HS256"

    )

    return {

        "message":
        "Login successful",

        "token":
        token,

        "user": {

            "username":
            user["username"],

            "email":
            user["email"],

            "publicKey":
            user["publicKey"],

            "signPublicKey":
            user.get(
                "signPublicKey"
            )

        }

    }, 200