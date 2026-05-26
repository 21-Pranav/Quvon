import FeatureCard from "./FeatureCard";
import SectionDivider from "../common/SectionDivider";

import { featuresData } from "../../data/featuresData";

import "../../styles/features.css"

function FeaturesSection() {
    return (
        <section
            className="features-section"
            id="features"
        >
            <SectionDivider
                label="FEATURE MODULES"
                number="02"
            />

            <div className="features-grid">
            
                <div className="features-topbar">
                    <div className="features-topbar-left">
                        SELECT CAPABILITY —
                        INTERACT TO EXPLORE
                    </div>

                    <div className="features-topbar-right">
                        3 MODULES LOADED
                    </div>
                </div>

                {featuresData.map((feature) => (
                    <FeatureCard
                        key={feature.num}
                        {...feature}
                    />
                ))}
            </div>
        </section>
    );
}

export default FeaturesSection;