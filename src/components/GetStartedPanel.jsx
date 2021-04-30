import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron } from 'react-bootstrap';

const GetStartedPanel = ({ description }) => {
    return (
        <Jumbotron>
            <h2>Get started</h2>
            <p>{description}</p>
        </Jumbotron>
    );
};

GetStartedPanel.propTypes = {
    description: PropTypes.string
};

export default GetStartedPanel;