import './Header.css';
import NavigationUnauthorized from '../NavigationUnauthorized/NavigationUnauthorized';
import NavigationAuthorized from '../NavigationAuthorized/NavigationAuthorized';
import Logo from '../Logo/Logo';

const Header = () => {
  // const mainPage = window.location.pathname === '/';
  const notMainPage: boolean = true;

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
