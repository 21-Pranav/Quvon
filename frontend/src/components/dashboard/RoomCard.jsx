function RoomCard({ room, isOwner, onOpen }) {
  return (
    <div className={`room-card ${isOwner ? "room-card--owner" : "room-card--shared"}`}>
      <div className="room-card__body">
        <span className="room-card__label">ROOM ID</span>
        <h3 className="room-card__id">{room.roomId}</h3>
        <span className={`room-card__badge ${isOwner ? "room-card__badge--owner" : "room-card__badge--shared"}`}>
          {isOwner ? "Owner Access" : "Shared Access"}
        </span>
      </div>
      <button className={`room-card__btn ${isOwner ? "room-card__btn--owner" : "room-card__btn--shared"}`} onClick={onOpen}>
        Open →
      </button>
    </div>
  );
}

export default RoomCard;
