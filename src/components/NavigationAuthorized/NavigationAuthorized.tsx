import "./NavigationAuthorized.scss";
import BurgerMenuIcon from "../../images/burger-menu";
import NavLinks from "../NavLinks/NavLinks";
import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import useWindowViewport from "../../hooks/useWindowViewport";
import { EViewportNames } from "../../enums/viewport-names.enum";

const NavigationAuthorized = () => {
  const [isOpen, setIsOpen] = useState(false);
  const viewport = useWindowViewport();

  const showSideBar = () => setIsOpen(!isOpen);

  return (
    <>
      {viewport !== EViewportNames.DESKTOP ? (
        <>
          <button className="header__nav-button" onClick={showSideBar}>
            <BurgerMenuIcon />
          </button>
          <SideBar isOpen={isOpen} showSideBar={showSideBar} />
        </>
      ) : (
        <nav className="navigation">
          <NavLinks />
        </nav>
      )}
    </>
  );
};

export default NavigationAuthorized;
