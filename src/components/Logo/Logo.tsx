import { Link } from "react-router-dom";
import LogoIcon from "../../images/logo-icon";
import "./Logo.scss";

function Logo() {
  return (
    <Link to="/" className="logo-link">
      <LogoIcon className="logo-link__image" />
    </Link>
  );
}

export default Logo;
