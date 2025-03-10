import './Navbar.css'
import { TbHeartPin } from "react-icons/tb";
import Dropdown from 'react-bootstrap/Dropdown';

function Navbar() {
    return (
        <>
            <header>
                <img className="logo" src='https://cdn.sanity.io/images/sh7exmvn/production/510281cd5ff8665708c1a8b3c48223449a64d5e2-96x96.gif'></img>
                <TbHeartPin fontSize={'2rem'} color='green' className='icon-heart' />
            </header>
            <nav>
                <Dropdown>
                    <Dropdown.Toggle  id="btn-dropdown">
                        Price
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Low-High</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" active>High-Low</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle  id="btn-dropdown">
                        Property Type
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Apartments</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" active>Villas</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" >Home</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" >Studio Apartment</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </nav>
        </>
    );
}

export default Navbar;
