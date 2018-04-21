import React from 'react';
import classes from './NavigationItem.css'

import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const navigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <a onClick={props.to}>{props.children}</a>
        </li>
    );
};

export default navigationItem;
