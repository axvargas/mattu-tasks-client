import React from 'react';
// @Material UI imports
import {
    Divider,
    Hidden,
} from '@material-ui/core';

// Component imports
import SelectedListItem from '../selectedListItem';
// Style imports
import useStyles from './style';
const DrawerContent = ({ handleDrawerToggle }) => {
    const classes = useStyles();
    return (
        <div>

            <div className={classes.toolbar} />

            <Divider />
            {/* WITH LIST */}
            <Hidden smUp>
                <SelectedListItem

                    handleDrawerToggle={handleDrawerToggle}
                />
            </Hidden>
            <Hidden xsDown>
                <SelectedListItem

                />

                <Divider />
            </Hidden>


        </div>
    );
}


export default DrawerContent;