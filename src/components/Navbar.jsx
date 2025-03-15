import '../styles/Navbar.css'
import { Heart } from 'lucide-react';
import logo from '../assets/logo/logo-250x150.svg';

function Navbar() {
    return (
        <>
            <header>
                <div className="top">
                    <img className="logo-lg logo" src={logo}></img>
                    <Heart fontSize={'2rem'} color='green' className='icon-heart' />
                </div>
            </header>
        </>
    );
}

export default Navbar;
