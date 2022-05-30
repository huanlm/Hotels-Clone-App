import { faBed, faCakeCandles, faGifts, faPeopleGroup, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"
import "./navbar.css"

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleSignInClick = (type) => {
    if(type === "signin")
      navigate("/login")
    else navigate("/register")
  }
  return (
    <>
      <div className="navbar">
        <div className="navContainer">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <span className="logo"><h1>Hotels+</h1></span>
          </Link>
          {user ? 
            <div className="navItems">
              <h3>{user.username}</h3>
              <button onClick={() => {}} className="navButton">Sign out</button>
            </div>
            :
            <div className="navItems">
              <button onClick={() => {handleSignInClick()}} className="navButton">Create Account</button>
              <button onClick={() => {handleSignInClick("signin")}} className="navButton">Sign In</button>
            </div>}
        </div>

        <div className="navbarList">
          <div className="navbarListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="navbarListItem">
            <FontAwesomeIcon icon={faTag} />
            <span>Deals</span>
          </div>
          <div className="navbarListItem">
            <FontAwesomeIcon icon={faCakeCandles} />
            <span>Holiday lets</span>
          </div>
          <div className="navbarListItem">
            <FontAwesomeIcon icon={faPeopleGroup} />
            <span>Groups & Meetings</span>
          </div>
          <div className="navbarListItem">
            <FontAwesomeIcon icon={faGifts}/>
            <span>Gift Cards</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar