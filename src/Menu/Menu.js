import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHome, faPlusCircle, faMeteor, faSearch, } from '@fortawesome/free-solid-svg-icons';
import MenuAvatar from './MenuAvatar/MenuAvatar';

function Menu(props) {

   return (
        <div className="Menu d-md-flex">
            <div className="menu-instagram col-12 col-md-7 ">
                <Link to="/" className="instagram-title navbar-brand text-white">
                    Instagram
                </Link>
            </div>
            <ul className="nav justify-content-around justify-content-md-between align-items-center d-flex col-12 col-md-5">
                <li className="nav-item active">
                    <Link className="text-white " to='/'>
                        <FontAwesomeIcon icon={faHome} />
                    </Link>
                </li>
                <li className="nav-item active ">
                    <Link to="/post/create" className="text-white">
                        <FontAwesomeIcon icon={faPlusCircle}/>
                    </Link>
                </li>
                <li className="nav-item active">
                    <Link to="/search" className="text-white">
                        <FontAwesomeIcon icon={faSearch} />
                    </Link>
                </li>
                <li className="nav-item active">
                    <Link to="/post/random" className="text-white">
                        <FontAwesomeIcon icon={faMeteor} />
                    </Link>
                </li>
                <li className="nav-item active">
                    <MenuAvatar/>
                </li>
            </ul> 
        </div>
   )
}

export default Menu;