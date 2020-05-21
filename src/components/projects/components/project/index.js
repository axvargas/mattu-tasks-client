import React, { useContext } from 'react';

import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Grow
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';

// Context import
import ProjectContext from '../../../../context/projects/context';
import TaskContext from '../../../../context/tasks/context';


const Project = ({ project, handleDrawerToggle }) => {


    //Context State
    const taskContext = useContext(TaskContext);
    const { getActualTasks } = taskContext;


    const projectContext = useContext(ProjectContext);
    const { actualProject, changeActualProject } = projectContext;

    // Functions
    const handleListItemClick = (id) => {
        changeActualProject(id); //Change the actual project
        getActualTasks(id)//Get the tasks of that project
    };


    return (
        <Grow in={true} timeout={{ enter: 1000, exit: 200 }} >

            <ListItem
                button
                selected={actualProject ? actualProject._id === project._id : false}
                onClick={event => {
                    handleListItemClick(project._id)
                    if (handleDrawerToggle) {
                        console.log("hide toggle");
                        handleDrawerToggle()
                    }

                }}
            >

                <ListItemIcon>
                    <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={project.name} />

            </ListItem>

        </Grow>
    );
}



export default Project;
