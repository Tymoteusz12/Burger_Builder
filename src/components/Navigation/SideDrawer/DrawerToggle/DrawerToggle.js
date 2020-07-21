import React from 'react';
import classes from './DrawerToggle.css';
const drawerToggle = (props) => (
    <div className = {classes.Button} 
        onClick={props.openDrawer}>MENU
    </div>
);

export default drawerToggle;