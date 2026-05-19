import React, {Component} from 'react';

import Navigation from '../../components/Ui/Navigation/NavigationItems/NavigationItems'
import Footer from '../../components/Footer/Footer'
import classes from './Layout.css'

class MyComponent extends Component {
    render() {
        return (
            <React.Fragment>
                <Navigation/>
                <main className={classes.Container}>
                    {this.props.children}
                </main>
                <Footer/>
            </React.Fragment>
        );
    }
}


export default MyComponent;
