import { useEffect, useState } from "react";
import "./Header.scss";
import NavigationUnauthorized from "../NavigationUnauthorized/NavigationUnauthorized";
import NavigationAuthorized from "../NavigationAuthorized/NavigationAuthorized";
import Logo from "../Logo/Logo";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [windowPathname, setWindowPathname] = useState(
    window.location.pathname
  );
  const location = useLocation();
  const notMainPage: boolean = windowPathname !== "/";

  useEffect(() => {
    setWindowPathname(location.pathname);
  }, [location]);

  return (
    <>
      {notMainPage ? (
        <header className="header header_authorized">
          <Logo />
          <NavigationAuthorized />
        </header>
      ) : (
        <header
          className={`header ${
            localStorage.getItem("loggedIn") ? "header_authorized" : ""
          }`}
        >
          <Logo />
          {localStorage.getItem("loggedIn") ? (
            <NavigationAuthorized />
          ) : (
            <NavigationUnauthorized />
          )}
        </header>
      )}
    </>
  );
};

export default Header;
