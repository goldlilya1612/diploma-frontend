import { NavLink } from "react-router-dom";
import "./NavLinks.css";

function NavLinks() {
  return (
    <ul className="navigation__links navigation__links_authorized">
      <li className="navigation__link-item navigation__link-item_authorized">
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            isActive
              ? "navigation__link navigation__link_authorized"
              : "navigation__link navigation__link_authorized navigation__link_active"
          }
        >
          Главная
        </NavLink>
      </li>
      <li className="navigation__link-item navigation__link-item_authorized navigation__link-item_account">
        <NavLink to="/profile" className="navigation__link">
          <button className="navigation__profile-button">Аккаунт</button>
          <div className="profile-button__icon"></div>
        </NavLink>
      </li>
    </ul>
  );
}

export default NavLinks;
