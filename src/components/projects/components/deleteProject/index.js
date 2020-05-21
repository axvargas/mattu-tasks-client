import React, { useContext, useState } from 'react';
import { Container, Button, Typography, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './style';

//Component imports
import ConfirmationDialog from '../confirmationDialog';
// Context import
import ProjectContext from '../../../../context/projects/context';
const DeleteProject = () => {
    const classes = useStyles();

    //Context State
    const projectContext = useContext(ProjectContext);
    const { deleteProject, actualProject, changeActualProject } = projectContext;

    //State
    const [open, setOpen] = useState(false);
    // Functions


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleDeleteProject = () => {
        setOpen(false)
        changeActualProject(null)
        deleteProject(actualProject._id);

    }
    //
    return (
        <Container className={classes.container}>
            <Grid container direction="column" spacing={2} >
                <Grid item>
                    <Typography className={classes.underline}>Dangerous zone</Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={handleClickOpen}
                    >
                        Delete Project
                    </Button>
                </Grid>
            </Grid>
            {open &&
                <ConfirmationDialog open={open} handleCancel={handleCancel} handleDeleteProject={handleDeleteProject} projectName={actualProject.name} />
            }

        </Container>
    );
}

export default DeleteProject;
