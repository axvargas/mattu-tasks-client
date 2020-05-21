import React, { useReducer } from 'react';

import ProjectContext from './context';
import ProjectReducer from './reducer';

//client axios
import axiosClient from '../../config/axios';

//Types imports
import { PROJECT_FORM, GET_PROJECTS, ADD_PROJECT, ACTUAL_PROJECT, DELETE_PROJECT, PROJECT_ERROR } from '../../types';

//notistack
import { useSnackbar } from 'notistack';

const ProjectState = (props) => {
    const { enqueueSnackbar } = useSnackbar();

    const initialState = {
        formAppear: false,
        projects: [],
        actualProject: null,
        error: null,
        msg: null,
    }

    //useReducer
    const [state, dispatch] = useReducer(ProjectReducer, initialState);

    // Dispatch actions

    //Functions for CRUD
    const showForm = (payload) => {
        dispatch({
            type: PROJECT_FORM,
            payload
        })
    }

    const getProjects = async () => {
        try {
            const response = await axiosClient.get('/api/projects');

            dispatch({
                type: GET_PROJECTS,
                payload: response.data.projects
            })
        } catch (error) {
            if (error.response.data.errors) {
                dispatch({
                    type: PROJECT_ERROR,
                })
                state.msg = error.response.data.errors[0].msg;
            } else {
                dispatch({
                    type: PROJECT_ERROR,
                })
                state.msg = error.response.data.msg
            }
            enqueueSnackbar(state.msg,
                { variant: 'error', preventDuplicate: true });

        }
    }

    const addProject = async (project) => {
        try {
            const response = await axiosClient.post('/api/projects', project);
            dispatch({
                type: ADD_PROJECT,
                payload: response.data
            })
            enqueueSnackbar("Project successfully created",
                { variant: 'success', preventDuplicate: true });
        } catch (error) {

            if (error.response.data.errors) {
                dispatch({
                    type: PROJECT_ERROR,
                })
                state.msg = error.response.data.errors[0].msg;
            } else {
                dispatch({
                    type: PROJECT_ERROR,
                })
                state.msg = error.response.data.msg
            }
            enqueueSnackbar(state.msg,
                { variant: 'error', preventDuplicate: true });


        }


    }

    const changeActualProject = (projectId) => {
        try {
            dispatch({
                type: ACTUAL_PROJECT,
                payload: projectId
            })
        } catch (error) {
            if (error.response.data.errors) {
                dispatch({
                    type: PROJECT_ERROR,
                })
                state.msg = error.response.data.errors[0].msg;

            } else {
                dispatch({
                    type: PROJECT_ERROR,
                })
                state.msg = error.response.data.msg

            }
            enqueueSnackbar(state.msg,
                { variant: 'error', preventDuplicate: true });


        }

    }

    const deleteProject = async (projectId) => {
        try {
            await axiosClient.delete(`/api/projects/${projectId}`);

            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })
            enqueueSnackbar("Project successfully deleted",
                { variant: 'success', preventDuplicate: true });
        } catch (error) {
            if (error.response.data.errors) {
                dispatch({
                    type: PROJECT_ERROR,
                })
                state.msg = error.response.data.errors[0].msg;

            } else {
                dispatch({
                    type: PROJECT_ERROR,
                })
                state.msg = error.response.data.msg

            }
            enqueueSnackbar(state.msg,
                { variant: 'error', preventDuplicate: true });


        }

    }

    //
    return (
        <ProjectContext.Provider
            value={{
                projects: state.projects,
                formAppear: state.formAppear,
                actualProject: state.actualProject,
                error: state.error,
                msg: state.msg,
                showForm,
                getProjects,
                addProject,
                changeActualProject,
                deleteProject
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    )
}
export default ProjectState;
