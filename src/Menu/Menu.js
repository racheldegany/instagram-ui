import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHome, faPlusCircle, faHandHoldingHeart, faSearch, } from '@fortawesome/free-solid-svg-icons';
import MenuAvatar from './MenuAvatar/MenuAvatar';

//d-flex justify-content-around align-items-center - Menu
//d-md-block d-none instagram

function Menu(props) {

   return (
        <div className="Menu">
            <div className="menu-instagram col-12 col-md-6  ">
                <a className="instagram-title navbar-brand text-white " href="#">Instagram</a>
            </div>
            
           
            <ul className="nav justify-content-around justify-content-md-between d-flex col-12 col-md-4 offset-md-7">
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
                        <FontAwesomeIcon icon={faSearch}/>
                    </Link>
                </li>
                <li className="nav-item active">
                    <Link to="/notification/:userId" className="text-white">
                        <FontAwesomeIcon icon={faHandHoldingHeart} />
                    </Link>
                </li>
                <li className="nav-item active">
                    <Link to="/profile"  className="text-white">
                        <MenuAvatar/>
                    </Link>
                </li>
            </ul> 
        </div>
   )
}

export default Menu;