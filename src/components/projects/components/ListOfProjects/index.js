import React, { Fragment, useContext, useEffect } from 'react';

//Material UI imports
import {
    ListItem,
    Grid,
    Typography,
    Grow
} from '@material-ui/core';



// images import
import addnew from '../../../../images/addnew.svg';
// Context import
import ProjectContext from '../../../../context/projects/context';

// Component imports
import Project from '../project';
//Style import
import useStyles from './style'
const ListOfProjects = ({ handleDrawerToggle }) => {
    
    const classes = useStyles();
    //Context State
    const projectContext = useContext(ProjectContext);
    const { projects, getProjects} = projectContext;


    // Effect
    useEffect(() => {

        getProjects()
        // eslint-disable-next-line
    }, []);


    return (

        <Fragment>

            {projects.length > 0 ?


                projects.map((project, i) => (
                    <Project key={project._id} project={project} handleDrawerToggle={handleDrawerToggle}/>

                ))


                :
                <Grow in={true} timeout={1000} mountOnEnter unmountOnExit>
                    <ListItem>
                        <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                            <Grid item >
                                <Typography variant="overline">Let's start by creating a new project</Typography>
                            </Grid>
                            <Grid item >
                                <img src={addnew} alt="addnewIMG" className={classes.img} />
                            </Grid>


                        </Grid>
                    </ListItem>
                </Grow>

            }
        </Fragment>
    );
}

export default ListOfProjects;
