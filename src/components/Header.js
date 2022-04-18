// Images
import headerLogo from "src/assets/images/logos/logo.png";
const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="brand-wrap">
          <img src={headerLogo} alt="" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
