// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';


import AppointmentsRepository from '../repositories/AppointmentsRepository'; // OPERAÇÕES COM BANCO DADOS
import CreateAppointmentServices from '../services/CreateAppointmentService'; //REGRA DE NEGOCIO
import { getCustomRepository } from 'typeorm'; //USANDO REPOSITORIO CRIADO POR MIM

// AUTENTICAÇÃO SO USUÁRIO
import ensureAthenticade from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

//APLICANTO ENTRE AS ROTAS QUE PRECISA DE AUTENTICAÇÃO DE AGENDAMENTO
appointmentsRouter.use(ensureAthenticade);

appointmentsRouter.get('/', async (request, response) => {

    console.log(request.user)

    //UTILIZANDO METODOS REPOSITORIO
    const appointmentRepository = getCustomRepository(AppointmentsRepository);

    //PEGANDO TODOS OS AGENDAMENTOS
    const appointments = await appointmentRepository.find();
    //RETORNANDO PARA FRONT END
    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => { //routes.use('/appointments',appointmentsRouter);

    try { //TRATATIVA DE ERRO.
        const { provider_id, date } = request.body;

        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentServices(); //ok CHACMANDO ARQUIVO EXTERNO

        const appointment = await createAppointment.excute({ provider_id, date: parseDate })

        return response.json(appointment); // ok

    } catch (error) { // throw Error('this appointment is already booked');

        return response.status(400).json({ error: error.message });
    }
});


export default appointmentsRouter