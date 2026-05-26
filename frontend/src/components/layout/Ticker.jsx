import "../../styles/ticker.css";

function Ticker() {

    const items = [

        "END-TO-END ENCRYPTION ACTIVE",

        "CRYSTALS-KYBER-1024 SECURED",

        "AES-256-GCM FILE ENCRYPTION",

        "QUANTUM-RESISTANT KEY EXCHANGE",

        "MONGODB GRIDFS ENCRYPTED STORAGE",

        "ZERO-KNOWLEDGE ARCHITECTURE",

        "CLIENT-SIDE FILE ENCRYPTION",

        "SECURE ROOM KEY DISTRIBUTION",

        "POST-QUANTUM SECURE MESSAGING",

        "ALL TRAFFIC ENCRYPTED IN REAL TIME",

    ];

    return (

        <div style={{ paddingTop: "64px" }}>

            <div className="ticker-wrap">

                <div className="ticker-label">

                    // LIVE

                </div>

                <div className="ticker-track">

                    {[...Array(2)].map((_, i) => (

                        <div
                            key={i}
                            className="ticker-group"
                        >

                            {items.map((item) => (

                                <span
                                    key={item}
                                    className="ticker-item"
                                >

                                    {item}

                                </span>

                            ))}

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default Ticker;