import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

export const CalendarModal = () => {

    const [ dateStart, setDateStart ] = useState(now.toDate());
    const [ dateEnd, setDateEnd ] = useState(nowPlus1.toDate());
    const [ titleValid, setTitleValid ] = useState(true);

    const modalOpen = useSelector(state => state.ui.modalOpen);
    const activeEvent = useSelector(state => state.calendar.activeEvent);

    const dispatch = useDispatch();


    const [ formValues, setFormValues ] = useState(initEvent);

    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if(activeEvent) {
            setFormValues(activeEvent)  //Esto es para cuando hago doble click en un evento me cargue el modal
        } else {
            setFormValues(initEvent)
        }                              // con los datos de ese mismo evento. 
    }, [activeEvent, setFormValues]);


    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    };
 
    const closeModal = () => {
        dispatch(uiCloseModal());
        setFormValues(initEvent);
        dispatch(eventClearActiveEvent()) // limpio el activeEvent cuando cierro el modal
    };

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    };


    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment(start)
        const momentEnd = moment(end)
        
        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error')
            return
        }

        if(title.trim().length < 2) {
            return setTitleValid(false)
        }

        if (activeEvent) {
            dispatch(eventStartUpdate(formValues))
            
        } else {
            dispatch(eventStartAddNew(formValues))
        };


        setTitleValid(true);
        closeModal();
    }



  return (
    <Modal
    isOpen={modalOpen}
    // onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    style={customStyles}
    closeTimeoutMS={200}
    className='modal'
    overlayClassName='modal-fondo'
  >
    <h1> {(activeEvent) ? 'Editar evento' : 'Nuevo evento'} </h1>
    <hr />
    <form className="container" onSubmit={handleSubmitForm}>

        <div className="form-group mb-2">

            <label>Fecha y hora inicio</label>
            <DateTimePicker onChange={handleStartDateChange} value={dateStart} className='form-control' />

        </div>

        <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            <DateTimePicker 
            onChange={handleEndDateChange} 
            value={dateEnd} 
            className='form-control' 
            minDate={dateStart}
            /> 

        </div>

        <hr />
        <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input 
                className={` form-control ${!titleValid && 'is-invalid'}`}
                type="text" 
                placeholder="Título del evento"
                name="title"
                value={title}
                autoComplete="off"
                onChange={handleInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
            <textarea 
                onChange={handleInputChange}
                className="form-control"
                type="text"
                placeholder="Notas"
                name="notes"
                value={notes}
                rows="5"
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
            type="submit"
            className="btn btn-outline-primary btn-block"
        >
            <i className="far fa-save"></i>
            <span> Guardar</span>
        </button>

    </form>
    </Modal>
  )
};
