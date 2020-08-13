import React, { Component }from 'react';
import Styles from './layout.css';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
class Layout extends Component{
    state ={
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    };

    sideDrawerOpenHandler = () => {
        this.setState((prevState) =>{
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
    }
    );}

    render(){
        return(
            <Aux>
                <Toolbar 
                    isAuth = {this.props.isAuthenticated}
                    openDrawer= {this.sideDrawerOpenHandler}
                    open={this.props.showSideDrawer}/>
                <SideDrawer 
                    isAuth = {this.props.isAuthenticated}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className={Styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
            );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null
    };
}

export default connect(mapStateToProps)(Layout);
