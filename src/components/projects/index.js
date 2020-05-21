import React, { useContext, Fragment } from 'react';

import {
    Divider, Grid, Typography, Grow
} from '@material-ui/core';
import ResponsiveDrawer from './layout';

import FormTask from './components/formTask';
import ListOfTasks from './components/listOfTasks';
import DeleteProject from './components/deleteProject';
import NameOfProject from './components/nameOfProject';


import choose from '../../images/choose.svg'
// Context import
import ProjectContext from '../../context/projects/context';

import useStyles from './style';
const Projects = () => {
    const classes = useStyles();
    //Context State
    const projectContext = useContext(ProjectContext);
    const { actualProject } = projectContext;

    return (

        <ResponsiveDrawer>
            {actualProject ?
                <Fragment>
                    <NameOfProject />
                    <Divider />
                    <FormTask />
                    <ListOfTasks />
                    <Divider />
                    <DeleteProject />
                </Fragment>
                :
                <Grow in={true} timeout={1000}>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                        <Grid item >
                            <Typography variant="overline">Let's be productive, select a project to start working on</Typography>
                        </Grid>
                        <Grid item >
                            <img src={choose} alt="chooseIMG" className={classes.img} />
                        </Grid>


                    </Grid>
                </Grow>

            }

        </ResponsiveDrawer>

    );
}

export default Projects;
