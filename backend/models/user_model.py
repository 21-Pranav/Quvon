from database.db import (
    users_collection
)


# CREATE USER
def create_user(user_data):

    return users_collection.insert_one(
        user_data
    )


# FIND BY EMAIL
def find_user_by_email(email):

    return users_collection.find_one({

        "email":
        email

    })


# FIND BY USERNAME
def find_user_by_username(username):

    return users_collection.find_one({

        "username":
        username

    })