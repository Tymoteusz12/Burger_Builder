import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from './NavigationItems/NavigationItems';
const toolbar = (props) => (
    <header className = {classes.Toolbar}>
        <DrawerToggle openDrawer = {props.openDrawer}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;