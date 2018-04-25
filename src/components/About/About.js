import React from 'react';
import classes from './About.css'
import {Link} from 'react-scroll';


const about = (props) => {
    return (
        <div className={classes.About} name="about">
            <h2>Learn About My Journey</h2>
            <div className={classes.Container}>
                <div className={classes.Picture}>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/andreglegg-no.appspot.com/o/andre.jpg?alt=media&token=a56f400b-63a1-43e5-bd11-1d238d6eff59"
                        alt="Andre"/>
                </div>
                <div className={classes.Text}>

                    <ul className={classes.Timeline}>
                        <li className={classes.TimelineItem}>
                            <div className={classes.TimelineItemTail}/>
                            <div className={[classes.TimelineItemHead, classes.TimelineItemHeadHighlight].join(' ')}/>
                            <div className={classes.TimelineItemContent}>
                                <strong>My Humble Beginnings</strong>
                                <p>I attended St. George's College in Kingston, Jamaica where I studied Science and Information Technology, It was during these years I started teaching myself web design and development.</p>
                            </div>
                        </li>
                        <li className={classes.TimelineItem}>
                            <div className={classes.TimelineItemTail}/>
                            <div className={[classes.TimelineItemHead, classes.TimelineItemHeadHighlight].join(' ')}/>
                            <div className={classes.TimelineItemContent}>
                                <strong>A Website Designer is Born</strong>
                                <p>Almost immediately after high school I started at Irie FM and Zip Fm (two of Jamaica's largest radio stations), I was employed as a web/ui designer, I was then given other responsibilities that include administering a linux server that I configured to serve as a web server and shoutcast streaming server.</p>
                            </div>
                        </li>
                        <li className={classes.TimelineItem}>
                            <div className={classes.TimelineItemTail}/>
                            <div className={[classes.TimelineItemHead, classes.TimelineItemHeadHighlight].join(' ')}/>
                            <div className={classes.TimelineItemContent}>
                                <strong>Transition to Full Freelance</strong>
                                <p>After working at Irie Fm for three years I decided to freelance and also do some work for myself. I started expanding my knowledge and developed various mobile apps and games, some of which are visible on my portfolio.</p>
                            </div>
                        </li>
                        <li className={[classes.TimelineItem].join(' ')}>
                            <div className={classes.TimelineItemTail}/>
                            <div className={[classes.TimelineItemHead, classes.TimelineItemHeadHighlight].join(' ')}/>
                            <div className={classes.TimelineItemContent}>
                                <strong>Move to Norway</strong>
                                <p>I moved to Norway in november 2016 and got a job at Greenpeace Norway where I worked for 8 months. I am currently learning the language and culture of this beautiful country.</p>
                            </div>
                        </li>
                        <li className={[classes.TimelineItem, classes.TimelineItemLast].join(' ')}>
                            <div className={classes.TimelineItemTail}/>
                            <div className={[classes.TimelineItemHead, classes.TimelineItemHeadHighlight].join(' ')}/>
                            <div className={classes.TimelineItemContent}>
                                <Link className={classes.TimelineButton} to="contact" spy={true} smooth={true} duration={500} >BE PART OF MY STORY</Link>
                            </div>
                        </li>
                    </ul>
                    {/*<h4>My Humble Beginnings</h4>
                    <p>I attended St. George's College in Kingston, Jamaica where I studied Science and Information Technology, It was during these years I started teaching myself web design and development.</p>

                    <h4>A Website Designer is Born</h4>
                    <p>Almost immediately after highschool I started at Irie FM and Zip Fm (two of Jamaica's largest radio stations), I was employed as a web/ui designer, I was then given other responsibilities that include administering a linux server that I configured to serve as a web server and shoutcast streaming server.</p>

                    <h4>Transition to Full Freelance</h4>
                    <p>After working at Irie Fm for three years I decided to freelance and also do some work for myself. I started expanding my knowledge and developed various mobile apps and games, some of which are visible on my portfolio.</p>

                    <h4>Move to Norway</h4>
                    <p>I moved to Norway in november 2016 and got a job at Greenpeace Norway where I worked for 8 months. I am currently learning the language and culture of this beautiful country.</p>
               */} </div>
            </div>
        </div>
    );
};

export default about;
