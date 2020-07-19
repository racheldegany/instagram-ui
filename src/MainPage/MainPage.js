import React from 'react';
import './MainPage.scss';

function MainPage(props) {
    return (
        <div className="MainPage d-flex flex-column align-items-center justify-content-around">
            <div className="main-body d-flex flex-column justify-content-center align-items-center rounded">
                {props.children}
            </div>
        </div>
    );
}

export default MainPage;