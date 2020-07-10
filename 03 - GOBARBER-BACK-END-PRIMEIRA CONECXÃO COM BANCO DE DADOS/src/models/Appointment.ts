//MODELS ESTÁ RELACIONADO COM UMA TABELA NO BANCO DE DADOS

import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


@Entity('appointments') //ENVIA A CLASS COMO PARAMNETRO PARA ENTIDADE.
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    provider: string;

    @Column('timestamp with time zone')
    date: Date;

    
}

export default Appointment;