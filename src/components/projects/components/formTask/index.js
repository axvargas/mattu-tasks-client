import React, { Fragment, useState, useContext } from 'react';

// @Material-UI imports
import {
    Grid,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Container,
    FormHelperText

} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

// Context import
import TaskContext from '../../../../context/tasks/context';
import ProjectContext from '../../../../context/projects/context';


//notistack
import { useSnackbar } from 'notistack';
import useStyles from './style';
const FormTask = () => {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    //State
    const [task, setTask] = useState({
        name: ''
    });
    const [error, setError] = useState(false);
    const [helper, setHelper] = useState('');

    //Context State
    const taskContext = useContext(TaskContext);
    const { formTaskAppear, showTaskForm, addTask } = taskContext;

    const projectContext = useContext(ProjectContext);
    const { actualProject } = projectContext;



    // Functions
    const handleShowForm = () => {
        showTaskForm(true)
    }
    const handleCancel = () => {
        showTaskForm(false)
        setTask({ name: '' })
        setError(false);
        setHelper('');
    }
    const handleChange = (event) => {
        setTask({
            ...task,
            name: event.target.value
        })
        setError(false);
        setHelper('');
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        //Validate
        let isError = false;
        if (task.name.trim() === '') {
            isError = true;
            setError(true);
            setHelper('Type a name');
        }
        if (isError) {
            enqueueSnackbar("The task's name is required",
                { variant: 'error', preventDuplicate: true });
            console.log("Stopped");
            return;
        }
        // Change state
        task.projectId = actualProject._id
        addTask(task);
        showTaskForm(false)
        console.log("Adding a new task..");

        //Get the actual tasks again
        //getActualTasks(actualProject._id);
        // Clear fields
        setTask({ name: '' })


    }
    return (
        <Fragment>
            <Container className={classes.container}>

                {formTaskAppear ?
                    <Grid container justify="center" direction="column" spacing={1} >
                        <Grid item>
                            <form onSubmit={handleSubmit}>
                                <FormControl fullWidth variant="outlined" error={error}>
                                    <InputLabel htmlFor="outlined-adornment-password">Task's name</InputLabel>
                                    <OutlinedInput
                                        size="small"
                                        autoFocus
                                        multiline
                                        rowsMax={4}
                                        id="name-of-the-task"
                                        type='text'
                                        value={task.name}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <Button type="submit">
                                                    Add
                                                    </Button>

                                            </InputAdornment>
                                        }
                                        labelWidth={90}
                                    />
                                    <FormHelperText>{helper}</FormHelperText>
                                </FormControl>
                            </form>
                        </Grid>
                        <Grid item>
                            <Grid container justify="flex-end">

                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<CloseIcon />}
                                    onClick={handleCancel}
                                >
                                    cancel
                          </Button>

                            </Grid>
                        </Grid>
                    </Grid>
                    :
                    <Grid  >
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleShowForm}
                        >
                            New task
                             </Button>

                    </Grid>

                }



            </Container >
        </Fragment >


    );
}

export default FormTask;
