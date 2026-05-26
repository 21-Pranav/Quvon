function SectionDivider({ label, number }) {
    return (
        <div className="section-divider">
            <div className="divider-label">
                {label}
            </div>

            <div className="divider-line" />

            <div className="divider-num">
        // {number}
            </div>
        </div>
    );
}

export default SectionDivider;