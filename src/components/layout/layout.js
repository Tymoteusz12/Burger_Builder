import React from 'react';
import Styles from './layout.css';
import Aux from '../../hoc/Auxiliary';

const layout = (props) =>(
    <Aux>
        <div>Toolbar, Sidedrawer, Backdrop</div>
        <main className={Styles.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;
