import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';
import NavigationUnauthorized from '../NavigationUnauthorized/NavigationUnauthorized';
import NavigationAuthorized from '../NavigationAuthorized/NavigationAuthorized';
import Logo from '../Logo/Logo';

const Header = () => {
  const [windowPathname, setWindowPathname] = useState(
    window.location.pathname
  );
  const notMainPage: boolean = !(windowPathname === '/');
  const history = useHistory();

  useEffect(() => {
    return history.listen((location: any) => {
      setWindowPathname(location.pathname);
    });
  }, [history]);

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
            localStorage.getItem('loggedIn') ? 'header_authorized' : ''
          }`}
        >
          <Logo />
          {localStorage.getItem('loggedIn') ? (
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
