import logo from "../assets/event_keeper_logo.png";
function Header() {
  return (
    <div className="header">
      <div className="header-title-container">
        <img src={logo} alt="Event Keeper Logo" className="header-logo" />
        <h1>Event Keeper</h1>
      </div>
    </div>
  );
}

export default Header;
