import React, { useState } from 'react';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {messages} from '../../helpers/calentar-messages-es'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventsetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment); // or globalizeLocalizer




export const CalendarScreen = () => {
  
  const dispatch = useDispatch();
  const events = useSelector(state => state.calendar.events);
  const activeEvent = useSelector(state => state.calendar.activeEvent);

  const [lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'month');


  const onDoubleClick = () => {
    dispatch(uiOpenModal());
  };
  
  const onSelectEvent = (e) => {
    dispatch(eventsetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  };

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent())
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }
    return {
      style
    }
  };

  return (
    <div className='calendar-screen'>
        <Navbar />


        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            messages={messages}
            eventPropGetter={eventStyleGetter}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelectEvent}
            onView={onViewChange}
            onSelectSlot={onSelectSlot}
            selectable={true}
            view={lastView}
            components={{
              event: CalendarEvent
            }}
         />

        <AddNewFab />
        {
          (activeEvent) &&
          <DeleteEventFab />

        }

        <CalendarModal 
         
        /> 
    </div>
  )
}
