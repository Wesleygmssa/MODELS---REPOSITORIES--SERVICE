// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';


import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentServices from '../services/CreateAppointmentService'

const appointmentsRouter = Router();

const appointmentRepository = new AppointmentsRepository();




appointmentsRouter.get('/', (request, response) => {

    const appointments = appointmentRepository.all();

    return response.json(appointments);
});



appointmentsRouter.post('/', (request, response) => { //routes.use('/appointments',appointmentsRouter);kk

    try { //TRATATIVA DE ERRO.
        const { provider, date } = request.body; // ok

        const parseDate = parseISO(date);// modificação ok

        const createAppointment = new CreateAppointmentServices(appointmentRepository);

        const appointment = createAppointment.excute({ provider, date: parseDate })

        return response.json(appointment); // ok

    } catch (error) {

        return response.status(400).json({ error: error.message});
    }
});


export default appointmentsRouter