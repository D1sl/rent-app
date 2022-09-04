import './style.css';
import emptyProfile from '../../assets/img/empty-profile.png';
import magnifyingGlassIcon from '../../assets/img/magnifying-glass-icon.png';
import userIcon from '../../assets/img/user-icon.png';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Footer = () => {
    return (
        <div className='main-footer'>
            <div className='footer-content-desktop'>
                <div className='main-footer-left'>
                    © 2022 Rent App - Info links
                </div>
                <div className='main-footer-right'>

                </div>
            </div>
            <div className='footer-content-mobile'>
                <div className='main-footer-left'>
                    <div className='mobile-tabs'>
                        <Link to="/">
                            <div className="tab-button">
                                <img src={magnifyingGlassIcon} className="tab-button-icon" alt="magnifying glass" />
                                <span>Apartments</span>
                            </div>
                        </Link>


                        {Auth.loggedIn() ? (
                            <>
                                <Link to="/profile">
                                    <div className="tab-button">
                                        <img src={userIcon} className="tab-button-icon" alt="magnifying glass" />
                                        <span>Profile</span>
                                    </div>
                                </Link>
                            </>
                        ) : (
                            <Link to="/login">
                                <div className="tab-button">
                                    <img src={userIcon} className="tab-button-icon" alt="magnifying glass" />
                                    <span>Sign in</span>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
                <div className='main-footer-right'>

                </div>
            </div>
        </div>
    )
};

export default Footer;