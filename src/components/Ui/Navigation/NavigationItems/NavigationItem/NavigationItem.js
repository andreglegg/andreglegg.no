import React from 'react';
import classes from './NavigationItem.css'
import {Link} from 'react-scroll';

const navigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <Link activeClass={classes.Active} to={props.to} spy={true} offset={props.offset} smooth="easeInOutQuad" duration={500} >{props.children}</Link>
        </li>
    );
};

export default navigationItem;
