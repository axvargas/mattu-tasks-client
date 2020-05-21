import React, { useReducer } from 'react';

// Context and Reducer import
import TaskContext from './context';
import TaskReducer from './reducer';
//types imports
import { GET_ACTUAL_TASKS, ADD_TASK, TASK_FORM, DELETE_TASK, EDIT_TASK } from '../../types'

//notistack
import { useSnackbar } from 'notistack';

//AxiosClient
import axiosClient from '../../config/axios';
const TaskState = (props) => {
    const { enqueueSnackbar } = useSnackbar();

    //Initial state definition
    const initialState = {

        formTaskAppear: false,
        taskOfActualProject: [],
        msg: null
    }

    //useReducer

    const [state, dispatch] = useReducer(TaskReducer, initialState)
    //Dispatch actions and state
    //Functions CRUD
    const getActualTasks = async (projectId) => {

        try {
            const response = await axiosClient.get('/api/tasks', { params: { projectId } });        //Se extrae como req.query del server

            dispatch({
                type: GET_ACTUAL_TASKS,
                payload: response.data.tasks
            })

        } catch (error) {
            console.log(error.response);
            if (error.response.data.errors) {
                state.msg = error.response.data.errors[0].msg;
            } else {
                state.msg = error.response.data.msg
            }
            enqueueSnackbar(state.msg,
                { variant: 'error', preventDuplicate: true });
        }
    }

    const showTaskForm = (payload) => {
        dispatch({
            type: TASK_FORM,
            payload
        })
    }

    const addTask = async (task) => {
        try {
            const response = await axiosClient.post('/api/tasks/', task);

            dispatch({
                type: ADD_TASK,
                payload: response.data.task
            })
            enqueueSnackbar("Task successfully created",
                { variant: 'success', preventDuplicate: true });
        } catch (error) {
            console.log(error.response);
            if (error.response.data.errors) {
                state.msg = error.response.data.errors[0].msg;
            } else {
                state.msg = error.response.data.msg
            }
            enqueueSnackbar(state.msg,
                { variant: 'error', preventDuplicate: true });
        }

    }

    const deleteTask = async (id, projectId) => {
        try {
            const response = await axiosClient.delete(`api/tasks/${id}`, { params: { projectId } });
            dispatch({
                type: DELETE_TASK,
                payload: response.data.task._id
            })
            enqueueSnackbar("Task successfully deleted",
                { variant: 'success', preventDuplicate: true });
        } catch (error) {
            console.log(error.response);
            if (error.response.data.errors) {
                state.msg = error.response.data.errors[0].msg;
            } else {
                state.msg = error.response.data.msg
            }
            enqueueSnackbar(state.msg,
                { variant: 'error', preventDuplicate: true });
        }

    }
    const editTask = async (task, edited) => {
        const { _id } = task;
        try {
            const response = await axiosClient.put(`/api/tasks/${_id}`, task);

            dispatch({
                type: EDIT_TASK,
                payload: response.data.task
            })
            if (edited) {
                enqueueSnackbar("Task successfully edited",
                    { variant: 'success', preventDuplicate: true });
            }

        } catch (error) {
            console.log(error.response);
            if (error.response.data.errors) {
                state.msg = error.response.data.errors[0].msg;
            } else {
                state.msg = error.response.data.msg
            }
            enqueueSnackbar(state.msg,
                { variant: 'error', preventDuplicate: true });
        }
    }


    //
    return (
        <TaskContext.Provider
            value={{
                //tasks: state.tasks,
                formTaskAppear: state.formTaskAppear,
                taskOfActualProject: state.taskOfActualProject,
                showTaskForm,
                getActualTasks,
                addTask,
                deleteTask,
                editTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    );
}

export default TaskState;
