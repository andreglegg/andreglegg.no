import React, {Component} from 'react';
import classes from './Portfolio.css'
import axios from '../../axios-portfolio';
import {connect} from 'react-redux';
import * as portfolioActions from '../../store/actions/index';

import PortfolioItem from './PortfolioItem/PortfolioItem'
import Modal from '../Ui/Modal/modal';

class Portfolio extends Component {

    state = {
        currentCategory: "all",
        modalIsOpen: false,
        currentModalIndex: null,
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
        console.log("filter" + this.state.currentCategory)
    };

    openModalHandler = (i) => {
        this.setState({
            modalIsOpen: true,
            currentModalIndex: i
        })

    };

    closeModalHandler = () => {
        this.setState({
            modalIsOpen: false
        })
    };



    render() {
        let modal = null;
        let items = "Loading portfolioItems...";
        if (this.props.portfolioItems) {
            if (this.state.modalIsOpen) {
                modal = (<Modal isOpen={this.state.modalIsOpen} close={this.closeModalHandler}
                                data={this.props.portfolioItems[this.state.currentModalIndex]}/>);
            }
            items = this.props.portfolioItems
                .map((item, i) => {
                    //console.log(item);
                    if (this.state.currentCategory === "all") {
                        return (
                            <PortfolioItem key={i} OpenModal={() => this.openModalHandler(i)} data={item}/>);
                    }
                    else if (item.category === this.state.currentCategory) {
                        return (
                            <PortfolioItem key={i} OpenModal={() => this.openModalHandler(i)} data={item}/>);
                    }

                    return null

                });
        }





        return (
            <React.Fragment>
                {this.props.portfolioItems? modal : ""}
            <div className={classes.Portfolio} name="work">
                <div className={classes.Container}>
                    <h2>Work</h2>
                    <h3>My Latest Work</h3>
                    <div className={classes.FilterButtons}>
                        <button onClick={() => this.onFilterHandler("all")}
                                className={this.state.currentCategory === "all" ? classes.Active : ' '}>All
                        </button>
                        <button onClick={() => this.onFilterHandler("web")}
                                className={this.state.currentCategory === "web" ? classes.Active : ' '}>Web
                        </button>
                        <button onClick={() => this.onFilterHandler("app")}
                                className={this.state.currentCategory === "app" ? classes.Active : ' '}>App
                        </button>
                    </div>
                    <div className={classes.Items}>
                        {items}
                    </div>
                </div>
            </div>
            </React.Fragment>
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