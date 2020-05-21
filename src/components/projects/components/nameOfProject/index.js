import React, { useContext, Fragment } from 'react';

// Context import
import ProjectContext from '../../../../context/projects/context';

import { Typography } from '@material-ui/core';
import useStyles from './style';
const NameOfProject = () => {
    const classes = useStyles();
    //Context State
    const projectContext = useContext(ProjectContext);
    const { actualProject } = projectContext;

    return (
        <Fragment>
            {actualProject &&
                <Typography variant="h6" className={classes.typo}>{actualProject.name}</Typography>

            }
        </Fragment>
    );
}

export default NameOfProject;
