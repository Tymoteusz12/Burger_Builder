import React, { useState } from 'react';
import Styles from './layout.css';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

const layout = props => {

    const [showSideDrawer, changeSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        changeSideDrawer(false);
    };

    const sideDrawerOpenHandler = () => {
       changeSideDrawer(prevState => (!prevState))
       }

        return(
            <Aux>
                <Toolbar 
                    isAuth = {props.isAuthenticated}
                    openDrawer= {sideDrawerOpenHandler}
                    open={props.showSideDrawer}/>
                <SideDrawer 
                    isAuth = {props.isAuthenticated}
                    open={showSideDrawer} 
                    closed={sideDrawerClosedHandler}/>
                <main className={Styles.Content}>
                    {props.children}
                </main>
            </Aux>
            );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null
    };
}

export default connect(mapStateToProps)(layout);
