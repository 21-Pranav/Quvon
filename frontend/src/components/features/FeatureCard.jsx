function FeatureCard({
    num,
    tag,
    title,
    desc,
    accent,
}) {
    return (
        <div 
            className="feature-card"
            style={{ position: "relative" }}
        >
            <div className="feature-num">
                {num}
            </div>

            <div className="feature-icon-row">
                <span
                    className="feature-tag"
                    style={{ color: accent }}
                >
                    {tag}
                </span>
            </div>

            <h3
                className="feature-title"
                style={{ whiteSpace: "pre-line" }}
            >
                {title}
            </h3>

            <p className="feature-desc">
                {desc}
            </p>

            <div
                className="feature-bar"
                style={{ background: accent }}
            />

            <div
                className="bracket-tl"
                style={{
                    borderColor: accent,
                }}
            />
        </div>
    );
}

export default FeatureCard;