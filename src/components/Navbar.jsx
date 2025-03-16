import '../styles/Navbar.css'
import { Heart } from 'lucide-react';
import logo from '../assets/logo/logo.svg';

function Navbar() {
    return (
        <>
            <header>
                <img className="logo-lg logo" src={logo}></img>
                <Heart fontSize={'24px'}className='icon-heart' />
            </header>
        </>
    );
}

export default Navbar;
