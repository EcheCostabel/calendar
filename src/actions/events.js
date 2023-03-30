import { types } from "../types/types"


export const eventAddNew = (event) => {
    return {
        type: types.eventAddNew,
        payload: event
    }
};


export const setActive = (event) => {
    return {
        type: types.eventSetActive,
        payload: event
    }
}