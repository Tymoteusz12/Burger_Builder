import React, { Component }from 'react';
import Styles from './layout.css';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
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
                    openDrawer= {this.sideDrawerOpenHandler}
                    open={this.props.showSideDrawer}/>
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className={Styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
            );
    }
};

export default Layout;
