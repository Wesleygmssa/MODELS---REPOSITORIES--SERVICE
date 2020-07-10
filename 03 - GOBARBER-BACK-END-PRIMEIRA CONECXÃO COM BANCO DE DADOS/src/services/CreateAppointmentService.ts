
//RESPONSAVEL PELA CRIAÇÃO DO AGENDAMENTO // REGRA DE NEGOCIO

import Appointment from '../models/Appointment';
import { startOfHour, } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository'; //PARA USAR O REPOSITORIO EXISTENTE
import { getCustomRepository } from 'typeorm';

interface Request{
    provider: string,
    date: Date,
}

class CreateAppointmentService {
   
    public async excute({provider, date}:Request):Promise<Appointment> {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository); //PARA USAR O REPOSITORIO EXISTENTE

        const appointmentDate = startOfHour(date);

        const FindAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate
            );

        if (FindAppointmentInSameDate) { //Verificar trativa de erro na rota

            throw Error('this appointment is already booked');     
        }

        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate
        });

        await appointmentsRepository.save(appointment); //SALVANDO NO BANCO DE DADOS

        return appointment //RETORNADO UM AGENDAMENTO
    }
}
export default CreateAppointmentService;