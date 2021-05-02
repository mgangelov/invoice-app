import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const FileUploadButton = ({
    buttonTitle,
    fileUploadHandler
}) => {
    return (
        <Button
            type="submit"
            onClick={(e) => fileUploadHandler(e)}
        >
            {buttonTitle}
        </Button>
    )
};

FileUploadButton.propTypes = {
    buttonTitle: PropTypes.string,
    fileUploadHandler: PropTypes.func
};

FileUploadButton.defaultProps = {
    buttonTitle: 'Upload',
    fileUploadHandler: () => {}
};

export default FileUploadButton;