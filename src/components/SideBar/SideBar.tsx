import NavLinks from "../NavLinks/NavLinks";
import "./SideBar.scss";
import CrossIcon from "../../images/cross-icon";

const SideBar = ({
  isOpen,
  showSideBar,
}: {
  isOpen: boolean;
  showSideBar: any;
}) => {
  return (
    <>
      <nav className={`sidebar ${isOpen ? "" : "sidebar_invisible"}`}>
        <CrossIcon className="sidebar__button-image" />
        <button className="sidebar__button" onClick={showSideBar}></button>
        <NavLinks />
      </nav>
      <div
        className={`sidebar-overlay ${
          isOpen ? "" : "sidebar-overlay_invisible"
        }`}
      ></div>
    </>
  );
};

export default SideBar;
