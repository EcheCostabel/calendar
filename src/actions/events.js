import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types"



export const eventStartAddNew = (event) => {
    return async(dispatch, getState) => {

        const { uid, name } = getState().auth

        try {
            const resp = await fetchWithToken('events', event, 'POST');
            const body = await resp.json();
           

            if(body.ok) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name
                } 
                
                dispatch(eventAddNew(event))
            }


        } catch (error) {
            console.log(error)
        }
        
        
    }
}

 const eventAddNew = (event) => {
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
};


export const eventStartLoading = () => {
    return async(dispatch) => {
        try {
            const resp = await fetchWithToken('events');
            const body = await resp.json();

            const events = body.events;
            console.log(events)
            // dispatch(eventLoaded(events))
        } catch (error) {
            console.log(error)
        }
    }
};

const eventLoaded = (events) => {
    return {
        type: types.eventLoaded,
        payload: events
    }
}