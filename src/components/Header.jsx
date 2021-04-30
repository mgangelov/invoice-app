import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'react-bootstrap';

const Header = ({
    title,
    description
}) => {
    return (
        <Media>
            <Media.Body>
                <h1>{title}</h1>
                <p>{description}</p>
            </Media.Body>
        </Media>

    );
};

Header.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
}

export default Header;