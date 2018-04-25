import React, {Component} from 'react';

import Layout from '../../hoc/Layout/Layout'
import Welcome from '../../components/Welcome/Welcome';
import Portfolio from '../../components/Portfolio/Portfolio';
import About from '../../components/About/About';
import Contact from '../../components/Contact/Contact';

class Home extends Component {
    render() {
        return (
            <Layout>
                <Welcome/>
                <Portfolio/>
                <About/>
                <Contact/>
            </Layout>
        );
    }
}


export default Home;
