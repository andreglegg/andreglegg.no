import React from 'react';
import classes from './Welcome.css'
import {Link} from 'react-scroll';

const Home = (props) => {

    return (
        <div className={classes.Welcome} name="top">
            <div className={classes.Dim}>
                <h1>André Glegg</h1>
                <h2>Designer & Developer</h2>
                <Link className={classes.Button} to="work" spy={true} smooth={true} duration={500} >View My Work</Link>
            </div>
        </div>
    )
};


export default Home;



