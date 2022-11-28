import React from 'react';
import './loader.css'

const Loader = ({ hide = false, onTop = false }) => {

    return (
        <div className={`loader-container d-flex-center text-white bg-secondary bg-opacity-100 ${onTop && 'on-top'} ${hide && 'hide'}`}>
            <span className="loader"></span>
        </div>
    );
}

export default Loader;
