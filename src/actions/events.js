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
};

export const eventUpdated = (event) => {
    return {
        type: types.eventUpdate,
        payload: event
    }
};

export const eventDeleted = () => {
    return {
        type: types.eventDeleted
    }
}