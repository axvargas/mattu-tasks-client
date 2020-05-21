import React, { Fragment, useState, useContext } from 'react';

// @Material-UI imports
import {
    ListItem,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Container,
    FormHelperText,
    Grid

} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

// Context import
import ProjectContext from '../../../../context/projects/context';

//notistack
import { useSnackbar } from 'notistack';

const FormProject = () => {
    const { enqueueSnackbar } = useSnackbar();
    //Context State
    const projectContext = useContext(ProjectContext);
    const { formAppear, showForm, addProject } = projectContext;

    //State
    const [project, setProject] = useState({
        name: ''
    });
    const [error, setError] = useState(false);
    const [helper, setHelper] = useState('');


    // Functions
    const handleClick = () => {
        showForm(true)
    }
    const handleCancel = () => {
        showForm(false)
        setProject({ name: '' })
        setError(false);
        setHelper('');
    }
    const handleChange = (event) => {
        setProject({
            ...project,
            name: event.target.value
        })
        setError(false);
        setHelper('');
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate
        let isError = false;
        if (project.name.trim() === '') {
            isError = true;
            setError(true);
            setHelper('Type a name');
        }
        if (isError) {
            enqueueSnackbar("The project's name is required",
                { variant: 'error', preventDuplicate: true });
            console.log("Stopped");
            return;
        }
        // Change state
        addProject(project);
        showForm(false)
        console.log("Adding a new project..");
        // Clear fields
        setProject({ name: '' })
        
    }
    return (
        <Fragment>
            {formAppear ?
                <ListItem>
                    <Grid container direction="column" justify="center" spacing={1}>
                        <Grid item>
                            <form onSubmit={handleSubmit}>
                                <FormControl fullWidth variant="outlined" error={error} size="small">
                                    <InputLabel htmlFor="outlined-adornment-password">Project's name</InputLabel>
                                    <OutlinedInput
                                        autoFocus
                                        multiline
                                        rowsMax={4}
                                        id="name-of-the-project"
                                        type='text'
                                        value={project.name}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <Button type="submit">
                                                    Add
                                        </Button>

                                            </InputAdornment>
                                        }
                                        labelWidth={110}
                                    />
                                    <FormHelperText>{helper}</FormHelperText>
                                </FormControl>
                            </form>
                        </Grid>
                        <Grid item>
                            <Grid container justify="flex-end">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    color="secondary"
                                    startIcon={<CloseIcon />}
                                    onClick={handleCancel}
                                >
                                    cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </ListItem>
                :
                <ListItem>
                    <Container>

                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleClick}
                        >
                            New project
                </Button>
                    </Container>
                </ListItem>
            }


        </Fragment>


    );
}

export default FormProject;
