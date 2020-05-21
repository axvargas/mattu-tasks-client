import React, { useContext } from 'react';

//Material UI imports
import {
    Container,
    Typography,
} from '@material-ui/core';


// Component imports
import Task from '../task';
// Syle import
import useStyles from './style';

// Context import
import TaskContext from '../../../../context/tasks/context';
const ListOfTasks = ({ handleDrawerToggle }) => {
    const classes = useStyles();

    //Context State
    const taskContext = useContext(TaskContext);
    const { taskOfActualProject } = taskContext;


    return (
        <Container className={classes.container}>

            <Typography className={classes.underline}>Tasks</Typography>

            <br />


            {taskOfActualProject &&
                taskOfActualProject.map((task, i) => (

                    <Task key={task._id} task={task} handleDrawerToggle={handleDrawerToggle}/>

                ))

            }


        </Container>
    );
}

export default ListOfTasks;
