import Logo from "./Logo"
import LoginBar from "./LoginBar"
import { WhenLoggedIn } from "../LoginContext"
import { Link } from "react-router"

export default function Header() {

    return (
        <header>
            <div className="header-icon"><Logo size={100}/></div>
            <nav className="header-nav">
                <Link to="/">Home</Link>                
                <Link to="/">About Us</Link>
                <Link to="/ConnectToCoach">Coaching</Link>
                <Link to="/VIPMeet">VIP Meet</Link>
                <Link to="/Resources">Resources</Link>
                <Link to="/CommunityFeed">Community Feed</Link>
                <Link to="/ContactUs">ContactUs</Link>
            </nav>
            <LoginBar />
        </header>
    )
}