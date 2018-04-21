import React, {Component} from 'react';

import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'
import {Link, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll';

class navigationItems extends Component {

    scrollToTop() {
        scroll.scrollToTop();
    }

    scrollTo(el) {
        scroller.scrollTo(el, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }

    render() {
        return (
            <ul className={classes.NavigationItems}>
                <NavigationItem to={this.scrollToTop}>Home</NavigationItem>
                <NavigationItem to={() => this.scrollTo("work")}>Work</NavigationItem>
                <NavigationItem to={() => this.scrollTo("about")}>About</NavigationItem>
                <NavigationItem to={() => this.scrollTo("contact")}>Contact</NavigationItem>
            </ul>
        )
    }
};

export default navigationItems;
