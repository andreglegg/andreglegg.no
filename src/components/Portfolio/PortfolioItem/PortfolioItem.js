import React from 'react';
import classes from './PortfolioItem.css'
import * as MatIcon from 'react-icons/lib/md';
import * as animation from 'animate.css'

const portfolio = (props) => {
    return (
        <div className={classes.PortfolioItem}>
            <div className={classes.ThumbWrap} onClick={props.OpenModal}>
                <div className={[classes.OpenLink, animation.animated , animation.slideInUp].join(' ')}> <MatIcon.MdLaunch/> </div>
            <img src={props.data.thumb} alt={props.data.name}/>
            </div>
            <div className={classes.Meta}>
                <span className={classes.Name}>{props.data.name}</span>
                <p>{props.data.tags}</p>
            </div>
        </div>
    );
};

export default portfolio;
