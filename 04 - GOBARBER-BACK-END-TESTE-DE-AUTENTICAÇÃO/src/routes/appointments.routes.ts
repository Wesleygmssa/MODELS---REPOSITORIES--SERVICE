// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';


import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentServices from '../services/CreateAppointmentService';
import {getCustomRepository} from 'typeorm';

import ensureAthenticade from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAthenticade);

appointmentsRouter.get('/', async (request, response) => {

    const appointmentRepository = getCustomRepository(AppointmentsRepository); //UTILIZANDO METODOS REPOSITORIO

    const appointments = await appointmentRepository.find(); //PEGANDO TODOS OS AGENDAMENTOS

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => { //routes.use('/appointments',appointmentsRouter);kk

    try { //TRATATIVA DE ERRO.
        const { provider_id, date } = request.body; // ok

        const parseDate = parseISO(date);// MODIFICAÇÃO ok

        const createAppointment = new CreateAppointmentServices(); //OK 

        const appointment = await createAppointment.excute({ provider_id, date: parseDate })

        return response.json(appointment); // ok

    } catch (error) { // throw Error('this appointment is already booked');

        return response.status(400).json({ error: error.message});
    }
});


export default appointmentsRouter