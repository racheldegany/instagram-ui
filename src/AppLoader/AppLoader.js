import React from 'react';
import './AppLoader.scss';
import { CSSTransition } from 'react-transition-group';

function AppLoader(props) {
    return (
        // <CSSTransition
        //     in={!props.isLoading}
        //     timeout={3000}
        //     classNames="Loader"
        //     unmountOnExit
        // >
            <div className="AppLoader d-flex justify-content-center align-items-center vh-100">
                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/be4d8e17390019.562b96742afb7.gif" alt="loading" />
                <span className="sr-only">Loading...</span>
                <span className="text-white instagram-title AppLoader-instagram">Instagram</span>
            </div>
        // </CSSTransition>
        
    );
}

export default AppLoader;