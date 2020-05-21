import React, { useState, useContext, Fragment } from 'react';

import {
    Grid,
    Typography,
    Paper,
    Button,
    IconButton,
    Grow,
    

} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


// Context import
import TaskContext from '../../../../context/tasks/context';
import ProjectContext from '../../../../context/projects/context';

//Component imports
import EditTask from '../editTask';
import useStyles from './style';
const Task = ({ task }) => {
    const classes = useStyles();
    // State
    const [elevation, setElevation] = useState(1);
    const [animation, setAnimation] = useState(true);
    const [edit, setEdit] = useState(false);
    //Context State
    const taskContext = useContext(TaskContext);
    const { deleteTask, editTask } = taskContext;
    const projectContext = useContext(ProjectContext);
    const { actualProject } = projectContext;


    // Funtions
    const handleMouseEnter = () => {
        setElevation(4);
    }
    const handleMouseLeave = () => {
        setElevation(1);
    }

    const handleEdit = () => {
        setEdit(true);
    }
    const handleDelete = () => {
        setTimeout(() => {
            deleteTask(task._id, actualProject._id);
            //getActualTasks(actualProject._id);

        }, 200);

        setAnimation(false);

    }
    const handleChangeState = () => {

        task.state = !task.state;
        
        editTask(task);
       
    }
    return (
        <Fragment>
            {edit ?
                <EditTask taskToEdit={task} setEdit={setEdit} />
                :

                <Grid item >
                    <Grow in={animation} timeout={{ enter: 1000, exit: 200 }} unmountOnExit>
                        <Paper className={classes.paper} elevation={elevation} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
                                <Grid item xl={10} lg={9} md={8} sm={12} xs={12}>
                                    <Typography variant="subtitle1" className='textIn'>{task.name}</Typography>
                                </Grid>

                                <Grid item xl={2} lg={3} md={4} sm={12} xs={12}>
                                    <Grid container direction="row" justify="flex-end" alignItems="center" spacing={1}>
                                        {task.state ?
                                            <Button color="primary" className={classes.btn} onClick={handleChangeState}>Completed</Button>
                                            :
                                            <Button color="secondary" className={classes.btn} onClick={handleChangeState}>Incomplete</Button>
                                        }
                                        <IconButton aria-label="delete" size="small" className={classes.btn} onClick={handleEdit}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton aria-label="delete" size="small" className={classes.btn} onClick={handleDelete}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grow>

                </Grid>


            }
        </Fragment >


    );
}

export default Task;
