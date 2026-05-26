function PendingCard({ request }) {
  return (
    <div className="pending-card">
      <span className="pending-card__label">ROOM ID</span>
      <h3 className="pending-card__id">{request.roomId}</h3>
      <div className="pending-card__status">
        <span className="pending-card__dot" />
        Awaiting creator approval
      </div>
    </div>
  );
}

export default PendingCard;
