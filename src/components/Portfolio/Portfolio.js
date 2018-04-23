import React, {Component} from 'react';
import classes from './Portfolio.css'
import axios from '../../axios-portfolio';
import {connect} from 'react-redux';
import * as portfolioActions from '../../store/actions/index';

import PortfolioItem from './PortfolioItem/PortfolioItem'
import * as actionTypes from "../../store/actions/actionTypes";

class Portfolio extends Component {

    state = {
        currentCategory: "all",
    };

    componentWillMount() {
        this.props.onInitPortfolioItems()
    };

    componentDidMount() {
        console.log(this.props)
    }

    onFilterHandler = (cat) => {
        this.setState({
            ...this.state,
            currentCategory: cat,
        });
    };

    render() {
        let items = "Loading portfolioItems...";
        if (this.props.portfolioItems) {
            items = this.props.portfolioItems
                .map((item, i) => {
                    //console.log(item);
                    if (this.state.currentCategory === "all") {
                        return (
                            <PortfolioItem key={i} thumb={item.thumb} name={item.name} desc={item.desc}/>);
                    }
                    else if (item.category === this.state.currentCategory) {
                        return (
                            <PortfolioItem key={i} thumb={item.thumb} name={item.name} desc={item.desc}/>);
                    }
                });
        }
        return (
            <div className={classes.Portfolio} name="work">
                <div className={classes.Container}>
                    <h2>Work</h2>
                    <h3>My Latest Work</h3>
                    <div className={classes.FilterButtons}>
                        <button onClick={() => this.onFilterHandler("all", 0)}
                                className={this.state.currentCategory === "all" ? classes.Active : ' '}>All
                        </button>
                        <button onClick={() => this.onFilterHandler("web", 1)}
                                className={this.state.currentCategory === "web" ? classes.Active : ' '}>Web
                        </button>
                        <button onClick={() => this.onFilterHandler("app", 2)}
                                className={this.state.currentCategory === "app" ? classes.Active : ' '}>App
                        </button>
                    </div>
                    <div className={classes.Items}>
                        {items}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        portfolioItems: state.portfolioItems
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPortfolioItems: () => dispatch(portfolioActions.initPortfolioItems()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio, axios);