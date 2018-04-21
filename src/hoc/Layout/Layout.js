import React, {Component} from 'react';

import Navigation from '../../components/Navigation/NavigationItems/NavigationItems'
import classes from './Layout.css'

class MyComponent extends Component {
    render() {
        return (
            <React.Fragment>
                <Navigation/>
                <main className={classes.Container}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}


export default MyComponent;
