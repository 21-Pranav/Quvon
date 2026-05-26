import "../../styles/footer.css"

function Footer() {
    return (
        <footer className="qs-footer">
            <div className="footer-logo">Quvon</div>

            <div className="footer-copy">
                © 2026
            </div>

            <div className="footer-links">
                <a href="#" className="footer-link">
                    Docs
                </a>

                <a href="#" className="footer-link">
                    Protocol
                </a>

                <a href="#" className="footer-link">
                    GitHub
                </a>
            </div>
        </footer>
    );
}

export default Footer;