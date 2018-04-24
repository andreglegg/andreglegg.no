import React from 'react';
import classes from './Contact.css'

const contact = (props) => {
    return (
        <div className={classes.Contact} name={props.name}>
            <div className={classes.Container}>
                <h2>I'd love to chat, send me an email!</h2>
            </div>
        </div>
    );
};

export default contact;
