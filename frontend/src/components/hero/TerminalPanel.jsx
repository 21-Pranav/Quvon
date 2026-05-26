function TerminalPanel() {
    return (
        <div className="terminal">
            <div className="terminal-bar">
                <div className="t-dot red" />
                <div className="t-dot yellow" />
                <div className="t-dot green" />

                <div className="terminal-title">
                    QS — SECURE SHELL v2.4.1
                </div>
            </div>

            <div className="terminal-body">
                <span className="t-line">
                    <span className="t-prompt">$ </span>
                    <span className="t-cmd">
                        qs init --protocol kyber-1024
                    </span>
                </span>

                <span className="t-line t-out">
                    Initializing PQC layer...
                </span>

                <span className="t-line t-ok">
                    ✓ CRYSTALS-Kyber-1024 loaded
                </span>

                <span className="t-line t-out">
                    Generating keypair...
                </span>

                <span className="t-line t-ok">
                    ✓ Public key: a4f2...9c81
                </span>

                <span className="t-line t-ok">
                    ✓ AES-256-GCM session ready
                </span>

                <span className="t-line"> </span>

                <span className="t-line">
                    <span className="t-prompt">$ </span>
                    <span className="t-cmd">
                        qs connect --room "secure-ops-7"
                    </span>
                </span>

                <span className="t-line t-ok">
                    ✓ Handshake complete [0.3ms]
                </span>

                <span className="t-line t-warn">
                    ⚠ Quantum threat: NONE DETECTED
                </span>

                <span className="t-line t-ok">
                    ✓ Channel encrypted end-to-end
                </span>

                <span className="t-line"> </span>

                <span className="t-line">
                    <span className="t-prompt">$ </span>
                    <span className="t-cursor" />
                </span>
            </div>
        </div>
    );
}

export default TerminalPanel;