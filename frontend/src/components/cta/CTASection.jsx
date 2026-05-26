import { Link } from "react-router-dom";
import SectionDivider from "../common/SectionDivider";
import "../../styles/cta.css";

function CTASection() {
    return (
        <section className="cta-section">
            <SectionDivider
                label="GET PROTECTED"
                number="04"
            />

            <div className="cta-block">
                <div className="bracket-tl" />
                <div className="bracket-br" />

                <h2 className="cta-heading">
                    Encrypt
                    <br />

                    <span className="accent">
                        Everything.
                    </span>

                    <br />

                    Trust Nothing.
                </h2>
<div className="cta-right">

  <Link
    to={
      localStorage.getItem("token")
        ? "/dashboard"
        : "/register"
    }
    className="btn btn-primary btn-full btn-lg"
  >
    {
      localStorage.getItem("token")
        ? "Initialize Shield →"
        : "Initialize Shield →"
    }
  </Link>

</div>
            </div>
        </section>
    );
}

export default CTASection;