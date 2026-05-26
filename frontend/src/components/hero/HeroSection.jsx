import { Link } from "react-router-dom";
import TerminalPanel from "./TerminalPanel";
import SectionDivider from "../common/SectionDivider";
import "../../styles/HeroSection.css";

function HeroSection() {
    return (
        <section className="hero">
            <div className="hero-tag">
                QUANTUM-RESISTANT SECURE
                COMMUNICATION PLATFORM
            </div>

            <h1 className="hero-heading">
                <span className="accent">
                    Quvon
                </span>

                <span className="dim">:</span>

                <br />

                <span>
                    Post-Quantum
                </span>

                <br />

                <span className="accent">
                    Secure Communication
                </span>
            </h1>

            <div className="hero-layout">
                <div>
                    <div className="hero-desc">
                        <p>
                            <strong>
                                Military-grade encryption
                            </strong>{" "}
                            for the era of quantum computing. 
                            Browser-based secure communication using <strong>CRYSTAL-Kyber</strong>
                            and AES-256, with zero-trust architecture and real-time threat monitoring.
                            Your data remains yours - even against tomorrow's quantum threats.
                        </p>
                    </div>

                    <div className="btn-row">
                        <Link
                            to="/register"
                            className="btn btn-primary btn-lg"
                        >
                            Get Started →
                        </Link>

                        <Link
                            to="/login"
                            className="btn btn-secondary btn-lg"
                        >
                            Login
                        </Link>
                    </div>
                    
                </div>

                <TerminalPanel />
            </div>

        </section>
    );
}

export default HeroSection;