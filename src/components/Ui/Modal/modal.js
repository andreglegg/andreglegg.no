import React from 'react';
import * as MatIcon from 'react-icons/lib/md';
import classes from './modal.css';
import * as animation from 'animate.css'


const modal = (props) => {
    return (
        <div className={[classes.Modal, animation.animated, animation.pulse].join(' ')}
             style={{display: props.isOpen ? "block" : "none"}}>
            <div className={classes.Container}>
                <div className={classes.Close} onClick={props.close}>
                    <MatIcon.MdClose/>
                </div>

                <h1>{props.data.name}</h1>
                <div className={classes.ImageWrap}>
                <img src={props.data.image} alt={props.data.name}/>
                </div>
                <p>{props.data.desc}</p>
                <p><strong>Tags:</strong> {props.data.tags}</p>
            </div>
        </div>
    );
};

export default modal;
