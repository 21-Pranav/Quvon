function SectionPanel({ label, title, count, accent, children, empty }) {
  return (
    <section className={`panel panel--${accent}`}>
      <div className="panel__header">
        <div className="panel__header-text">
          <span className="panel__label">{label}</span>
          <h2 className="panel__title">{title}</h2>
        </div>
        <div className={`panel__count panel__count--${accent}`}>{count}</div>
      </div>

      {count === 0 ? (
        <div className="panel__empty">{empty}</div>
      ) : (
        <div className="panel__grid">{children}</div>
      )}
    </section>
  );
}

export default SectionPanel;
