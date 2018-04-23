import React, {Component} from 'react';

import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

class navigationItems extends Component {

    render() {
        return (
            <div className={classes.Nav}>
            <ul className={classes.NavigationItems}>
                <NavigationItem to="top">Home</NavigationItem>
                <NavigationItem to="work">Work</NavigationItem>
                <NavigationItem to="about">About</NavigationItem>
                <NavigationItem to="contact">Contact</NavigationItem>
            </ul>
            </div>
        )
    }
};

export default navigationItems;
