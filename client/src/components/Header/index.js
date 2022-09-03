// React
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

// Styles
import './style.css';

// Elements
import logo from '../../assets/img/logo.png';
import magnifyingGlass from '../../assets/img/magnifying-glass.png';
import emptyProfile from '../../assets/img/empty-profile.png';

const Header = () => {

    const logout = event => {
        event.preventDefault();
        Auth.logout();
    }

    return (
        <div className='main-header'>
            <div className='header-content'>
                <div className='main-header-left'>
                    <Link to="/">
                        <img src={logo} className="logo" alt="logo" />
                    </Link>
                </div>
                <div className='main-header-center'>
                    <nav>
                        <ul>
                            <li>Where</li>
                            <li>Type of Home</li>
                            <li>More</li>
                        </ul>
                        <div className="search-button">
                            <img src={magnifyingGlass} className="search-icon" alt="magnifying glass" />
                        </div>
                    </nav>
                </div>
                <div className='main-header-right'>

                    {Auth.loggedIn() ? (
                        <>
                            <Link to="/profile" className="button login-button">
                                <div className="button-text">Profile</div>
                                <img src={emptyProfile} className="empty-profile" alt="grey person" />
                            </Link>
                            <a href="/" onClick={logout}>Sign out</a>
                        </>
                    ) : (
                        <Link to="/login">
                            <button className="button login-button">
                                <div className="button-text">Sign in</div>
                                <img src={emptyProfile} className="empty-profile" alt="grey person" />
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;