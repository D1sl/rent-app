import { Link } from 'react-router-dom';
import './style.css';

const LandlordInfo = ({ landlord }) => {
    console.log(landlord)
    return (
        <div>
            <h2>Contact the landlord</h2>
            <div>
                <Link to={`/profile/${landlord.username}`}>
                    <div className="landlord-box">
                        <img src="https://api.lorem.space/image/face?w=150&h=150" alt="landlords profile picture" className='landlord-image' />
                        <div className='landlord-details'>
                            <h3>{landlord.firstName}</h3>
                            <ul>
                                <li>{landlord.phone}</li>
                                <li>{landlord.email}</li>
                            </ul>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
};

export default LandlordInfo;