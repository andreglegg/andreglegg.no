import React from 'react';
import classes from './Footer.css'

import * as FontAwesome from 'react-icons/lib/fa'

const footer = (props) => {
    return (
        <div className={classes.Footer}>
            <div className={classes.Container}>
                <p>Copyright &copy; André Glegg 2017</p>
                <p>Made with React, powered by Firebase</p>
                <span className={classes.Links}><a
                    href="https://github.com/andreglegg"><FontAwesome.FaGithubSquare/></a></span>
            </div>
        </div>
    );
};

export default footer;
