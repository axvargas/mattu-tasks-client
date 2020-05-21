//Types imports
import { PROJECT_FORM, GET_PROJECTS, ADD_PROJECT, ACTUAL_PROJECT, DELETE_PROJECT, PROJECT_ERROR } from '../../types';

export default (state, action) => {
    const { payload } = action;
    switch (action.type) {
        case PROJECT_ERROR:
            return {
                ...state,
                error: true,

            }
        case PROJECT_FORM:
            return {
                ...state,
                formAppear: payload,
                msg: null,


            }
        case GET_PROJECTS:
            return {
                ...state,
                projects: payload,
                msg: null,
                error: null,

            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [payload, ...state.projects],
                msg: null,
                error: null,
            }
        case ACTUAL_PROJECT:
            return {
                ...state,
                actualProject: state.projects.filter(project => project._id === payload)[0],
                msg: null,
                error: null,

            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== payload),
                msg: null,
                error: null,
            }
        default:
            return {
                ...state,
            }

    }
}