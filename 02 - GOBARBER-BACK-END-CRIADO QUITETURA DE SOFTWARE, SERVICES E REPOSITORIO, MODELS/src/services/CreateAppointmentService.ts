
//RESPONSAVEL PELA CRIAÇÃO DO AGENDAMENTO

import Appointment from '../models/Appointment';
import { startOfHour, } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request{
    provider: string,
    date: Date,
}

// const appointmentRepository = new AppointmentRepository(); // NÃO PODE ??
// O CORRETO ESTA LOGO ABAIXO.
class CreateAppointmentService {
    private appointmentsRepository:AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository){
        this.appointmentsRepository = appointmentsRepository;
    }

    public excute({provider, date}:Request):Appointment {

        const appointmentDate = startOfHour(date);

        const FindAppointmentInSameDate = this.appointmentsRepository.findByDate(
            appointmentDate
            );

        if (FindAppointmentInSameDate) { //Verificar trativa de erro na rota

            throw Error('this appointment is already booked');
           
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate
        });

        return appointment
    }
}
export default CreateAppointmentService;