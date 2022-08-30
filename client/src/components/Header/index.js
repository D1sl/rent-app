// React
import { Link } from 'react-router-dom';

// Styles
import './style.css';

// Elements
import logo from '../../assets/img/logo.png';
import magnifyingGlass from '../../assets/img/magnifying-glass.png';
import emptyProfile from '../../assets/img/empty-profile.png';

const Header = () => {

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
                    <div className="button login-button">
                        <div className="button-text">Sign in</div>
                        <img src={emptyProfile} className="empty-profile" alt="grey person" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;