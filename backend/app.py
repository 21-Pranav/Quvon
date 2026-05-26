from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

# AUTH ROUTES
from routes.auth_routes import auth_bp

# ROOM ROUTES
from routes.room_routes import room_bp

# MESSAGE ROUTES
from routes.message_routes import message_bp

# FILE ROUTES
from routes.file_routes import file_bp

# SOCKET EVENTS
from sockets.socket_handler import register_socket_events

from routes.join_request_routes import (
    join_request_bp
)

from routes.user_routes import (
    user_bp
)

app = Flask(__name__)

# CORS CONFIG
CORS(app)

# SOCKET.IO CONFIG
socketio = SocketIO(
    app,
    cors_allowed_origins="*"
)

# REGISTER SOCKET EVENTS
register_socket_events(socketio)

# AUTH API
app.register_blueprint(
    auth_bp,
    url_prefix="/api/auth"
)

# ROOM API
app.register_blueprint(
    room_bp,
    url_prefix="/api/rooms"
)

# MESSAGE API
app.register_blueprint(
    message_bp,
    url_prefix="/api/messages"
)

# FILE API
app.register_blueprint(
    file_bp,
    url_prefix="/api/files"
)

# JOIN REQUEST API
app.register_blueprint(

    join_request_bp,

    url_prefix="/api/join-requests"

)

# USER API
app.register_blueprint(

    user_bp,

    url_prefix="/api/users"

)

# ROOT ROUTE
@app.route("/")
def home():

    return {
        "message": "QuantumShield Backend Running",
        "status": "ACTIVE",
        "services": [
            "Authentication",
            "Persistent Rooms",
            "Persistent Messages",
            "Encrypted File Sharing",
            "Socket.IO Communication"
        ]
    }


# START SERVER
if __name__ == "__main__":

    socketio.run(
    app,
    host="0.0.0.0",
    port=5000,
    debug=True
)