import './NavigationAuthorized.css';
import NavLinks from '../NavLinks/NavLinks';
import { useState } from 'react';
import SideBar from '../SideBar/SideBar';

const NavigationAuthorized = () => {
  const isMobile = window.matchMedia('max-width: 768px');
  const [isOpen, setIsOpen] = useState(false);
  const showSideBar = () => setIsOpen(!isOpen);

  return (
    <>
      {isMobile ? (
        <>
          <button className="header__nav-button" onClick={showSideBar}></button>
          <SideBar
            isMobile={isMobile}
            isOpen={isOpen}
            showSideBar={showSideBar}
          />
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
