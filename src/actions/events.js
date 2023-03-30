import { types } from "../types/types"


export const eventAddNew = (event) => {
    return {
        type: types.eventAddNew,
        payload: event
    }
};


export const eventsetActive = (event) => {
    return {
        type: types.eventSetActive,
        payload: event
    }
};

export const eventClearActiveEvent = () => {
    return {
        type: types.eventClearActveEvent
    }
}