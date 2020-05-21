import React from "react";

import {
    List,
    Divider,
    ListSubheader,


} from '@material-ui/core';



import FormProject from '../formProject';
import ListOfProjects from '../ListOfProjects';

import useStyles from './style';



const SelectedListItem = ({ handleDrawerToggle }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List
                component="nav"
                aria-label="main mailbox folders"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Projects
                     </ListSubheader>
                }
            >
                <FormProject />
                <ListOfProjects handleDrawerToggle={handleDrawerToggle} />

            </List >
            <Divider />
        </div >
    );
}

export default SelectedListItem;
