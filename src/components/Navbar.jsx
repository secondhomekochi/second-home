import '../styles/Navbar.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { Heart } from 'lucide-react';

function Navbar() {
    return (
        <>
            <header>
                <div className="top">
                    <img className="logo-lg logo" src='src/assets/logo/logo-250x150.svg'></img>
                    <Heart fontSize={'2rem'} color='green' className='icon-heart' />
                </div>
                {/* <nav>
                    <Dropdown>
                        <Dropdown.Toggle id="btn-dropdown">
                            Price
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Low-High</Dropdown.Item>
                            <Dropdown.Item href="#/action-2" active>High-Low</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle id="btn-dropdown">
                            Property Type
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Apartments</Dropdown.Item>
                            <Dropdown.Item href="#/action-2" active>Villas</Dropdown.Item>
                            <Dropdown.Item href="#/action-2" >Home</Dropdown.Item>
                            <Dropdown.Item href="#/action-2" >Studio Apartment</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </nav> */}
            </header>
        </>
    );
}

export default Navbar;
