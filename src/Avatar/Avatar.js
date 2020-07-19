import React, { useContext } from 'react';
import './Avatar.scss';
import PropTypes from 'prop-types';
import avatarDefault from '../assest/img/avatar-default.jpg';


function Avatar(props) {
    
    const size = props.size || 'sm';
	const image = props.image || avatarDefault;
	const className = 'Avatar--' + size;

	return (
		<img src={image} className={'Avatar ' + className} />
	);

    
}

Avatar.propTypes = {
	size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default Avatar;