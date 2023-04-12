import moment from "moment/moment"

export const prepareEvents = (events) => {

    return events.map(event => ({
        ...event,
        end: moment(event.end).toDate(),   // tengo que convertir esto a toDate() para que lo agarre el calendario
        start: moment(event.start).toDate(),
    }))

}