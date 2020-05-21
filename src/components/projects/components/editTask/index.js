import React, { Fragment, useState, useContext } from 'react';

// @Material-UI imports
import {
    Grid,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    FormHelperText

} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

// Context import
import TaskContext from '../../../../context/tasks/context';
import ProjectContext from '../../../../context/projects/context';


//notistack
import { useSnackbar } from 'notistack';
const EditTask = ({ taskToEdit, setEdit }) => {
    const { enqueueSnackbar } = useSnackbar();
    //State
    const [task, setTask] = useState(taskToEdit);
    const [error, setError] = useState(false);
    const [helper, setHelper] = useState('');

    //Context State
    const taskContext = useContext(TaskContext);
    const { editTask, getActualTasks } = taskContext;

    const projectContext = useContext(ProjectContext);
    const { actualProject } = projectContext;



    // Functions

    const handleCancel = () => {

        setError(false);
        setHelper('');
        setEdit(false);
        setTask(null);
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
        editTask(task, true);
        setEdit(false);
        console.log("Editing task...");

        //Get the actual tasks again
        getActualTasks(actualProject._id);
        // Clear fields
        setTask(null);

    }
    return (
        <Fragment>
            <Grid container justify="center" direction="column" spacing={1} >
                <Grid item>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth variant="outlined" error={error}>
                            <InputLabel htmlFor="outlined-adornment-password">Taks' name</InputLabel>
                            <OutlinedInput
                                autoFocus
                                id="name-of-the-task"
                                type='text'
                                value={task.name}
                                onChange={handleChange}
                                autoComplete="off"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Button type="submit">
                                            Edit
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





        </Fragment >


    );
}

export default EditTask;
