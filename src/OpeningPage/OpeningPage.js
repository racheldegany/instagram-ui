import React from 'react';
import './OpeningPage.scss';

function OpeningPage(props) {
    return (
        <div className="OpeningPage d-flex align-items-center justify-content-around    ">
            <div className="design"></div>
            <div className="user-input container position-absolute col-md-6">
                {props.children}
            </div>
            {/* <div className="design d-flex align-items-center justify-content-around col-12 col-md-6">
                <div className="img-1 img"></div>
                <div className="img-2 img"></div>
                <div className="img-center align-self-center"></div>
            </div>
            <div className="user-entry col-12 col-md-5"> 
                {props.children}
            </div> */}
            
        </div>
    );
}

export default OpeningPage;