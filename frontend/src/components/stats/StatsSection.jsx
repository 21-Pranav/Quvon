import SectionDivider from "../common/SectionDivider";
import { statsData } from "../../data/statsData";
import "../../styles/stat.css"

function StatsSection() {
    return (
        <section
            className="stats-section"
            id="security"
        >
            <SectionDivider
                label="THREAT INTELLIGENCE"
                number="03"
            />
            
            <div className="stats-grid">

                <div className="bracket-tl" />
                <div className="bracket-br" />

                {statsData.map((stat) => (
                    <div
                        className="stat-item"
                        key={stat.label}
                    >
                        <div className="stat-val">
                            {stat.val}

                            <span className="stat-unit">
                                {stat.unit}
                            </span>
                        </div>

                        <div className="stat-label">
                            {stat.label}
                        </div>

                        <div className="stat-sub">
                            {stat.sub}
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}

export default StatsSection;