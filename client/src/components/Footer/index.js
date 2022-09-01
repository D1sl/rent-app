import './style.css';
import emptyProfile from '../../assets/img/empty-profile.png';
import magnifyingGlassIcon from '../../assets/img/magnifying-glass-icon.png';
import userIcon from '../../assets/img/user-icon.png';
import { Link } from 'react-router-dom';

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
                        <div className="tab-button">
                            <img src={userIcon} className="tab-button-icon" alt="magnifying glass" />
                            <span>Sign in</span>
                        </div>
                    </div>
                </div>
                <div className='main-footer-right'>

                </div>
            </div>
        </div>
    )
};

export default Footer;