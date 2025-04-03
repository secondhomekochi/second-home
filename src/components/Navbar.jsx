import '../styles/Navbar.css'
import { Heart } from 'lucide-react';
import logo from '../assets/logo/logo.svg';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <header>
                <img className="logo-lg logo" src={logo}></img>
                <Link to={'/favorites'} >
                    <Heart fontSize={'24px'} className='icon-heart' />
                </Link>
            </header>
        </>
    );
}

export default Navbar;
