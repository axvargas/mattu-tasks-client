import { GET_ACTUAL_TASKS, ADD_TASK, TASK_FORM, DELETE_TASK, EDIT_TASK } from '../../types'
export default (state, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_ACTUAL_TASKS:
         
            return {

                ...state,
                taskOfActualProject: payload
            }
        case TASK_FORM:
            return {
                ...state,
                formTaskAppear: payload
            }
        case ADD_TASK:
            return {
                ...state,
                taskOfActualProject: [payload, ...state.taskOfActualProject]
            }
        case DELETE_TASK:
            return {
                ...state,
                taskOfActualProject: state.taskOfActualProject.filter(task => task._id !== payload)
            }
        case EDIT_TASK:
            return {
                ...state,
                taskOfActualProject: state.taskOfActualProject.map(task => task._id === payload._id ? payload : task)
            }
        // case EDIT_TASK:
        //     const index = state.taskOfActualProject.findIndex(task => task.id === payload.id);
        //     state.taskOfActualProject.splice(index, 1, payload);
        //     return {
        //         ...state,
        //         taskOfActualProject: state.taskOfActualProject
        //     }
        default:
            return {
                ...state,
            }
    }
}