import { useState } from "react";
import "../../styles/RecoveryPhraseModal.css";

function RecoveryPhraseModal({ phrase, onConfirm }) {
    const [copied, setCopied] = useState(false);
    const [acknowledged, setAcknowledged] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(phrase);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rpm-overlay">
            <div className="rpm-dialog">

                <div className="rpm-header">
                    <div className="rpm-header-tag">RECOVERY PHRASE</div>
                    <div className="rpm-warn-badge">⚠ SAVE THIS NOW</div>
                </div>

                <div className="rpm-body">
                    <p className="rpm-desc">
                        Your identity and encrypted rooms are tied to this phrase.
                        It <strong>cannot be recovered</strong> if lost — store it
                        somewhere safe before continuing.
                    </p>

                    <div className="rpm-phrase-block">
                        <div className="rpm-phrase-label">RECOVERY PHRASE</div>

                        <p className="rpm-phrase-text">{phrase}</p>

                        <div className="rpm-copy-row">
                            <span className="rpm-copy-hint">
                                Click phrase to select all · or use the button
                            </span>
                            <button
                                className={`rpm-copy-btn${copied ? " copied" : ""}`}
                                onClick={handleCopy}
                            >
                                {copied ? "✓ COPIED" : "COPY PHRASE"}
                            </button>
                        </div>
                    </div>

                    <label className="rpm-ack">
                        <input
                            type="checkbox"
                            checked={acknowledged}
                            onChange={(e) => setAcknowledged(e.target.checked)}
                        />
                        <span>
                            I have saved my recovery phrase in a secure location
                        </span>
                    </label>
                </div>

                <div className="rpm-footer">
                    <span className="rpm-footer-note">
                        // CANNOT PROCEED WITHOUT CONFIRMATION
                    </span>
                    <button
                        className="rpm-confirm-btn"
                        onClick={onConfirm}
                        disabled={!acknowledged}
                    >
                        CONTINUE →
                    </button>
                </div>

            </div>
        </div>
    );
}

export default RecoveryPhraseModal;