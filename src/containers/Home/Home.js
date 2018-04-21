import React, {Component} from 'react';

import Layout from '../../hoc/Layout/Layout'
import Welcome from '../../components/Welcome/Welcome';
import Portfolio from '../../components/Portfolio/Portfolio';

class Home extends Component {
    render() {
        return (
            <Layout>
                <Welcome/>
                <Portfolio/>
            </Layout>
        );
    }
}


export default Home;
