import Appointment from '../models/Appointment';
import { EntityRepository, Repository } from 'typeorm'


@EntityRepository(Appointment) //DECORATION
class AppointmentsRepository extends Repository<Appointment> {

    public async findByDate(date: Date): Promise<Appointment | null>{

        // const FindAppointment = this.appointments.find(appointment =>

        //     isEqual(date, appointment.date),
        // );

        const FindAppointment = await this.findOne({where:{ date: date }})

        return FindAppointment || null;
    }


    //  public create({provider,date}: CreateAppointmentDTO): Appointment{

    //     const appointment = new Appointment({provider,date});

    //     this.appointments.push(appointment);

    //     return appointment;
    //  }

}

export default AppointmentsRepository;