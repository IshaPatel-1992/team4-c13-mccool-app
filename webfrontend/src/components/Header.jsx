import Logo from "./Logo";
import LoginBar from "./LoginBar";
import { WhenLoggedIn } from "../LoginContext";
import { Link } from "react-router";

export default function Header() {
  return (
    <header>
      <div className="header-icon">
        <Logo size={100} />
      </div>
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/meeting">Book Meeting</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/profile">User Profile</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
      <LoginBar />
    </header>
  );
}
