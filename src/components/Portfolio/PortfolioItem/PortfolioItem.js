import React from 'react';
import classes from './PortfolioItem.css'
import * as MatIcon from 'react-icons/lib/md';
import * as animation from 'animate.css'

const portfolio = (props) => {
    return (
        <div className={classes.PortfolioItem}>
            <div className={classes.ThumbWrap}>
                <div className={[classes.OpenLink, animation.animated , animation.slideInUp].join(' ')}> <MatIcon.MdLaunch/> </div>
            <img src={props.thumb} alt={props.name}/>
            </div>
            <div className={classes.Meta}>
                <span className={classes.Name}>{props.name}</span>
                <p>{props.desc}</p>
            </div>
        </div>
    );
};

export default portfolio;
