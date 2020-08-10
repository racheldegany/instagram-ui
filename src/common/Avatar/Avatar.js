import React from 'react';
import './Avatar.scss';
import PropTypes from 'prop-types';
import avatarDefault from '../../assest/img/avatar-default.jpg';
import config from '../../config/index';

function Avatar(props) {
	const size = props.size || 'sm';
	let image;
	if(props.image instanceof Blob){
		image = URL.createObjectURL(props.image)
	} else {
		image = props.image ? `${config.apiUrl}/avatars/${props.image}`
							: avatarDefault;
	}
	const className = 'Avatar--' + size;
	return (
		<img src={image} className={'Avatar ' + className} />
	);

    
}

Avatar.propTypes = {
	size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default Avatar;