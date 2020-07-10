// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';


import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentServices from '../services/CreateAppointmentService';
import {getCustomRepository} from 'typeorm';

const appointmentsRouter = Router();



appointmentsRouter.get('/', async (request, response) => {

    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentRepository.find();

    return response.json(appointments);
});



appointmentsRouter.post('/', async (request, response) => { //routes.use('/appointments',appointmentsRouter);kk

    try { //TRATATIVA DE ERRO.
        const { provider, date } = request.body; // ok

        const parseDate = parseISO(date);// modificação ok

        const createAppointment = new CreateAppointmentServices(); //OK 

        const appointment = await createAppointment.excute({ provider, date: parseDate })

        return response.json(appointment); // ok

    } catch (error) { // throw Error('this appointment is already booked');

        return response.status(400).json({ error: error.message});
    }
});


export default appointmentsRouter