import {Router} from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointment'; //interface 


const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response)=>{ //routes.use('/appointments',appointmentsRouter);

const { provider, date } = request.body; 

const parsedDate = startOfHour(parseISO(date));

const FindAppointmentInSameDate = appointments.find(appointment => 

    isEqual(parsedDate, appointment.date 
));

if(FindAppointmentInSameDate) {

    return response.status(400).json({message: 'this appointment is already booked'});
}

const appointment = new Appointment(provider, parsedDate);

appointments.push(appointment)

   return response.json(appointment);
}); 

export default appointmentsRouter