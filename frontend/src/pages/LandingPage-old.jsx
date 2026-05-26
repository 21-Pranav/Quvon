import { Link } from "react-router-dom";

// Inline keyframes injected once
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');

  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes flicker {
    0%, 95%, 100% { opacity: 1; }
    96% { opacity: 0.4; }
    97% { opacity: 1; }
    98% { opacity: 0.2; }
    99% { opacity: 1; }
  }
  @keyframes glitch {
    0%, 90%, 100% { clip-path: none; transform: translate(0); }
    91% { clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); transform: translate(-4px, 2px); }
    92% { clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); transform: translate(4px, -2px); }
    93% { clip-path: none; transform: translate(0); }
  }
  @keyframes pulse-border {
    0%, 100% { box-shadow: 6px 6px 0 #00ff9f; }
    50% { box-shadow: 8px 8px 0 #00ff9f, 0 0 20px #00ff9f44; }
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes noise {
    0%, 100% { background-position: 0 0; }
    10% { background-position: -5% -10%; }
    30% { background-position: -15% 5%; }
    50% { background-position: 7% -25%; }
    70% { background-position: 20% 10%; }
    90% { background-position: -7% 15%; }
  }

  .qs-root * { box-sizing: border-box; margin: 0; padding: 0; }

  .qs-root {
    font-family: 'Space Mono', monospace;
    background: #030303;
    color: #e8e8e8;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }

  /* CRT scanline sweep */
  .qs-root::before {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(to bottom, transparent, #00ff9f22, transparent);
    animation: scanline 6s linear infinite;
    pointer-events: none;
    z-index: 1000;
  }

  /* Grid background */
  .bg-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(to right, #00ff9f09 1px, transparent 1px),
      linear-gradient(to bottom, #00ff9f09 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  /* NAV */
  .qs-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
    height: 64px;
    border-bottom: 2px solid #00ff9f33;
    background: #030303ee;
    backdrop-filter: blur(4px);
  }

  .nav-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 4px;
    color: #00ff9f;
    text-decoration: none;
    animation: flicker 8s infinite;
  }

  .nav-status {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: #00ff9f99;
    letter-spacing: 2px;
  }

  .status-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #00ff9f;
    animation: blink 2s infinite;
  }

  .nav-links {
    display: flex;
    gap: 0;
  }

  .nav-link {
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #888;
    text-decoration: none;
    padding: 8px 20px;
    border: 1px solid transparent;
    transition: all 0.1s;
  }

  .nav-link:hover {
    color: #00ff9f;
    border-color: #00ff9f44;
    background: #00ff9f08;
  }

  /* TICKER */
  .ticker-wrap {
    border-top: 2px solid #111;
    border-bottom: 2px solid #111;
    background: #070707;
    overflow: hidden;
    height: 36px;
    display: flex;
    align-items: center;
  }

  .ticker-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    color: #030303;
    background: #00ff9f;
    padding: 0 16px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .ticker-track {
    display: flex;
    animation: marquee 24s linear infinite;
    white-space: nowrap;
  }

  .ticker-item {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: #00ff9f66;
    padding: 0 40px;
    letter-spacing: 2px;
  }

  .ticker-item span {
    color: #00ff9f;
  }

  /* HERO */
  .hero {
    padding: 160px 48px 80px;
    position: relative;
    z-index: 10;
  }

  .hero-tag {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    letter-spacing: 4px;
    color: #00ff9f;
    text-transform: uppercase;
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .hero-tag::before {
    content: '//';
    color: #00ff9f44;
  }

  .hero-heading {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(80px, 14vw, 180px);
    line-height: 0.88;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 48px;
    position: relative;
  }

  .hero-heading .accent {
    color: #00ff9f;
    display: inline-block;
    animation: glitch 10s infinite;
  }

  .hero-heading .dim {
    color: #333;
  }

  .hero-layout {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 80px;
    align-items: start;
  }

  .hero-desc {
    border-left: 4px solid #00ff9f;
    padding-left: 24px;
    margin-bottom: 48px;
  }

  .hero-desc p {
    font-size: 15px;
    line-height: 1.9;
    color: #888;
    font-family: 'Share Tech Mono', monospace;
  }

  .hero-desc p strong {
    color: #e8e8e8;
    font-weight: 700;
  }

  /* BUTTONS */
  .btn-primary {
    display: inline-block;
    background: #00ff9f;
    color: #000;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 4px;
    padding: 16px 40px;
    border: 3px solid #000;
    box-shadow: 6px 6px 0 #fff;
    text-decoration: none;
    transition: all 0.1s;
    cursor: pointer;
  }

  .btn-primary:hover {
    transform: translate(3px, 3px);
    box-shadow: 3px 3px 0 #fff;
  }

  .btn-secondary {
    display: inline-block;
    background: transparent;
    color: #00ff9f;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 4px;
    padding: 14px 40px;
    border: 3px solid #00ff9f;
    box-shadow: 6px 6px 0 #00ff9f44;
    text-decoration: none;
    transition: all 0.1s;
    cursor: pointer;
  }

  .btn-secondary:hover {
    transform: translate(3px, 3px);
    box-shadow: 3px 3px 0 #00ff9f44;
  }

  .btn-row {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
  }

  /* TERMINAL PANEL */
  .terminal {
    border: 2px solid #00ff9f33;
    background: #050505;
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    animation: pulse-border 4s infinite;
    position: relative;
    overflow: hidden;
  }

  .terminal::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      #00ff9f03 2px,
      #00ff9f03 4px
    );
    pointer-events: none;
  }

  .terminal-bar {
    background: #0a0a0a;
    border-bottom: 2px solid #00ff9f22;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .t-dot { width: 10px; height: 10px; border-radius: 50%; }
  .t-dot.red { background: #ff453a; }
  .t-dot.yellow { background: #ffd60a; }
  .t-dot.green { background: #30d158; }

  .terminal-title {
    font-size: 10px;
    letter-spacing: 2px;
    color: #444;
    text-transform: uppercase;
    margin-left: auto;
  }

  .terminal-body {
    padding: 20px;
    line-height: 2;
  }

  .t-line { display: block; }
  .t-prompt { color: #00ff9f; }
  .t-cmd { color: #e8e8e8; }
  .t-out { color: #555; }
  .t-ok { color: #00ff9f; }
  .t-warn { color: #ffaa00; }
  .t-cursor {
    display: inline-block;
    width: 8px; height: 14px;
    background: #00ff9f;
    vertical-align: middle;
    animation: blink 1s infinite;
    margin-left: 4px;
  }

  /* DIVIDER */
  .section-divider {
    display: flex;
    align-items: center;
    gap: 0;
    margin: 80px 0 0;
  }

  .divider-label {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 13px;
    letter-spacing: 6px;
    color: #030303;
    background: #00ff9f;
    padding: 8px 24px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .divider-line {
    flex: 1;
    height: 2px;
    background: #111;
  }

  .divider-num {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    color: #333;
    padding: 0 24px;
    white-space: nowrap;
  }

  /* FEATURE SECTION */
  .features-section {
    padding: 0 48px 80px;
    position: relative;
    z-index: 10;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border: 2px solid #1a1a1a;
    margin-top: 48px;
  }

  .feature-card {
    border-right: 2px solid #1a1a1a;
    padding: 40px 32px;
    position: relative;
    transition: background 0.15s;
  }

  .feature-card:last-child { border-right: none; }

  .feature-card:hover {
    background: #080808;
  }

  .feature-card:hover .feature-num {
    color: #00ff9f;
  }

  .feature-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 64px;
    color: #111;
    line-height: 1;
    margin-bottom: 8px;
    transition: color 0.15s;
  }

  .feature-icon-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .feature-tag {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    color: #00ff9f;
    text-transform: uppercase;
  }

  .feature-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #e8e8e8;
    margin-bottom: 16px;
    line-height: 1.1;
  }

  .feature-desc {
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    line-height: 1.9;
    color: #555;
  }

  .feature-bar {
    position: absolute;
    bottom: 0; left: 0;
    height: 3px;
    width: 0;
    background: #00ff9f;
    transition: width 0.3s;
  }

  .feature-card:hover .feature-bar { width: 100%; }

  /* STATS ROW */
  .stats-section {
    padding: 0 48px 80px;
    position: relative;
    z-index: 10;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    border: 2px solid #1a1a1a;
    margin-top: 48px;
  }

  .stat-item {
    padding: 40px 32px;
    border-right: 2px solid #1a1a1a;
    position: relative;
  }

  .stat-item:last-child { border-right: none; }

  .stat-val {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 64px;
    color: #00ff9f;
    line-height: 1;
    letter-spacing: 2px;
  }

  .stat-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    color: #444;
    text-transform: uppercase;
    margin-top: 8px;
  }

  .stat-sub {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: #333;
    margin-top: 4px;
  }

  /* CTA */
  .cta-section {
    padding: 0 48px 120px;
    position: relative;
    z-index: 10;
  }

  .cta-block {
    border: 2px solid #1a1a1a;
    padding: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    position: relative;
    overflow: hidden;
  }

  .cta-block::before {
    content: 'QUANTUM\\ASHIELD';
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
    font-family: 'Bebas Neue', sans-serif;
    font-size: 120px;
    color: #0a0a0a;
    letter-spacing: 8px;
    white-space: nowrap;
    pointer-events: none;
    line-height: 1;
  }

  .cta-heading {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(40px, 6vw, 80px);
    line-height: 0.9;
    letter-spacing: 2px;
    text-transform: uppercase;
    max-width: 600px;
  }

  .cta-heading .accent { color: #00ff9f; }

  .cta-right {
    flex-shrink: 0;
    text-align: right;
  }

  .cta-note {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: #444;
    letter-spacing: 2px;
    margin-top: 16px;
    text-transform: uppercase;
  }

  /* FOOTER */
  .qs-footer {
    border-top: 2px solid #111;
    padding: 32px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 10;
  }

  .footer-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 4px;
    color: #222;
  }

  .footer-copy {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: #333;
    letter-spacing: 2px;
  }

  .footer-links {
    display: flex;
    gap: 32px;
  }

  .footer-link {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    color: #333;
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.1s;
  }

  .footer-link:hover { color: #00ff9f; }

  /* Decorative corner brackets */
  .bracket-tl, .bracket-br {
    position: absolute;
    width: 20px; height: 20px;
  }
  .bracket-tl { top: -2px; left: -2px; border-top: 3px solid #00ff9f; border-left: 3px solid #00ff9f; }
  .bracket-br { bottom: -2px; right: -2px; border-bottom: 3px solid #00ff9f; border-right: 3px solid #00ff9f; }
`;

function LandingPage() {
    return (
        <>
            <style>{styles}</style>
            <div className="qs-root">
                <div className="bg-grid" />

                {/* NAV */}
                <nav className="qs-nav">
                    <a href="/" className="nav-logo">QuantumShield</a>
                    <div className="nav-status">
                        <div className="status-dot" />
                        SYS ONLINE — ENCRYPTION ACTIVE
                    </div>
                    <div className="nav-links">
                        <a href="#features" className="nav-link">Features</a>
                        <a href="#security" className="nav-link">Security</a>
                        <Link to="/login" className="nav-link" style={{ color: '#00ff9f', borderColor: '#00ff9f33' }}>Login</Link>
                    </div>
                </nav>

                {/* TICKER */}
                <div style={{ paddingTop: '64px' }}>
                    <div className="ticker-wrap">
                        <div className="ticker-label">// LIVE</div>
                        <div className="ticker-track">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} style={{ display: 'flex' }}>
                                    <span className="ticker-item">CRYSTALS-KYBER-1024 <span>ACTIVE</span></span>
                                    <span className="ticker-item">AES-256-GCM <span>ENABLED</span></span>
                                    <span className="ticker-item">PACKETS ENCRYPTED: <span>2,847,391</span></span>
                                    <span className="ticker-item">THREAT LEVEL: <span>NOMINAL</span></span>
                                    <span className="ticker-item">PQC HANDSHAKE: <span>0.3ms AVG</span></span>
                                    <span className="ticker-item">NODES ONLINE: <span>1,024</span></span>
                                    <span className="ticker-item">KYBER KEY EXCHANGE <span>SECURE</span></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* HERO */}
                <section className="hero">
                    <div className="hero-tag">QUANTUM-RESISTANT SECURE COMMUNICATION PLATFORM</div>
                    <h1 className="hero-heading">
                        <span className="dim">The</span><br />
                        <span className="accent">Post-Quantum</span><br />
                        <span>Shield_</span>
                    </h1>

                    <div className="hero-layout">
                        <div>
                            <div className="hero-desc">
                                <p>
                                    <strong>Military-grade encryption</strong> for the era of quantum computing.
                                    Browser-based secure communication using <strong>CRYSTALS-Kyber</strong> and
                                    AES-256, with zero-trust architecture and real-time threat monitoring.
                                    Your data remains yours — even against tomorrow's quantum adversaries.
                                </p>
                            </div>
                            <div className="btn-row">
                                <Link to="/register" className="btn-primary">
                                    Get Started →
                                </Link>
                                <Link to="/login" className="btn-secondary">
                                    Login
                                </Link>
                            </div>
                        </div>

                        {/* TERMINAL */}
                        <div className="terminal">
                            <div className="terminal-bar">
                                <div className="t-dot red" />
                                <div className="t-dot yellow" />
                                <div className="t-dot green" />
                                <div className="terminal-title">QS — SECURE SHELL v2.4.1</div>
                            </div>
                            <div className="terminal-body">
                                <span className="t-line"><span className="t-prompt">$ </span><span className="t-cmd">qs init --protocol kyber-1024</span></span>
                                <span className="t-line t-out">  Initializing PQC layer...</span>
                                <span className="t-line t-ok">  ✓ CRYSTALS-Kyber-1024 loaded</span>
                                <span className="t-line t-out">  Generating keypair...</span>
                                <span className="t-line t-ok">  ✓ Public key: a4f2...9c81</span>
                                <span className="t-line t-ok">  ✓ AES-256-GCM session ready</span>
                                <span className="t-line"> </span>
                                <span className="t-line"><span className="t-prompt">$ </span><span className="t-cmd">qs connect --room "secure-ops-7"</span></span>
                                <span className="t-line t-ok">  ✓ Handshake complete [0.3ms]</span>
                                <span className="t-line t-warn">  ⚠ Quantum threat: NONE DETECTED</span>
                                <span className="t-line t-ok">  ✓ Channel encrypted end-to-end</span>
                                <span className="t-line"> </span>
                                <span className="t-line"><span className="t-prompt">$ </span><span className="t-cursor" /></span>
                            </div>
                        </div>
                    </div>

                    {/* Section Divider */}
                    <div className="section-divider">
                        <div className="divider-label">CORE CAPABILITIES</div>
                        <div className="divider-line" />
                        <div className="divider-num">// 01</div>
                    </div>
                </section>

                {/* FEATURES */}
                <section className="features-section" id="features">
                    <div className="features-grid">
                        <div className="feature-card" style={{ borderBottom: '2px solid #1a1a1a', gridColumn: '1 / -1', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', letterSpacing: '4px', color: '#333', textTransform: 'uppercase' }}>
                                SELECT CAPABILITY — INTERACT TO EXPLORE
                            </div>
                            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', letterSpacing: '3px', color: '#00ff9f66' }}>
                                3 MODULES LOADED
                            </div>
                        </div>

                        {[
                            {
                                num: '01',
                                tag: 'Encryption Layer',
                                title: 'Quantum-Safe\nEncryption',
                                desc: 'CRYSTALS-Kyber-1024 key encapsulation combined with AES-256-GCM symmetric encryption. Resistant to Shor\'s algorithm and Grover\'s algorithm. NIST PQC Round 3 finalist.',
                                accent: '#00ff9f',
                            },
                            {
                                num: '02',
                                tag: 'Collaboration',
                                title: 'Secure\nRooms',
                                desc: 'Invite-only encrypted rooms with ephemeral session keys. Zero-knowledge architecture — the server never sees plaintext. Messages self-destruct on session end.',
                                accent: '#ffffff',
                            },
                            {
                                num: '03',
                                tag: 'Monitoring',
                                title: 'Cyber\nDashboard',
                                desc: 'Real-time packet inspection, anomaly detection, and threat visualization. Monitor encryption health, handshake latency, and quantum threat posture across all nodes.',
                                accent: '#00c8ff',
                            },
                        ].map(({ num, tag, title, desc, accent }) => (
                            <div className="feature-card" key={num} style={{ position: 'relative' }}>
                                <div className="feature-num">{num}</div>
                                <div className="feature-icon-row">
                                    <span className="feature-tag" style={{ color: accent }}>{tag}</span>
                                </div>
                                <h3 className="feature-title" style={{ whiteSpace: 'pre-line' }}>{title}</h3>
                                <p className="feature-desc">{desc}</p>
                                <div className="feature-bar" style={{ background: accent }} />
                                <div className="bracket-tl" style={{ borderColor: accent + '44' }} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* STATS */}
                <section className="stats-section" id="security">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                        <div className="divider-label">THREAT INTELLIGENCE</div>
                        <div className="divider-line" />
                        <div className="divider-num">// 02</div>
                    </div>
                    <div className="stats-grid" style={{ marginTop: '48px' }}>
                        {[
                            { val: '256', unit: '-BIT', label: 'AES Key Length', sub: 'Post-quantum symmetric' },
                            { val: '1024', unit: '', label: 'Kyber Security Level', sub: 'NIST Category 5' },
                            { val: '0.3', unit: 'MS', label: 'Avg Handshake Time', sub: 'Browser-native WebAssembly' },
                            { val: '100', unit: '%', label: 'Zero Knowledge', sub: 'Server sees only ciphertext' },
                        ].map(({ val, unit, label, sub }) => (
                            <div className="stat-item" key={label}>
                                <div className="stat-val">
                                    {val}<span style={{ fontSize: '28px', color: '#00ff9f88' }}>{unit}</span>
                                </div>
                                <div className="stat-label">{label}</div>
                                <div className="stat-sub">{sub}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="cta-section">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '48px' }}>
                        <div className="divider-label">GET PROTECTED</div>
                        <div className="divider-line" />
                        <div className="divider-num">// 03</div>
                    </div>
                    <div className="cta-block" style={{ position: 'relative' }}>
                        <div className="bracket-tl" />
                        <div className="bracket-br" />
                        <h2 className="cta-heading">
                            Encrypt<br />
                            <span className="accent">Everything.</span><br />
                            Trust Nothing.
                        </h2>
                        <div className="cta-right">
                            <Link to="/register" className="btn-primary" style={{ display: 'block', textAlign: 'center' }}>
                                Initialize Shield →
                            </Link>
                            <p className="cta-note">No credit card · Open protocol · Self-hostable</p>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="qs-footer">
                    <div className="footer-logo">QuantumShield</div>
                    <div className="footer-copy">© 2024 — ALL COMMS ENCRYPTED</div>
                    <div className="footer-links">
                        <a href="#" className="footer-link">Docs</a>
                        <a href="#" className="footer-link">Protocol</a>
                        <a href="#" className="footer-link">GitHub</a>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default LandingPage;