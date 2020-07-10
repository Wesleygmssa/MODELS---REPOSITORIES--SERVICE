import { getRepository } from 'typeorm';
import {hash} from 'bcryptjs'
import User from '../models/User';

interface Request {

    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {


        //USANDO REPOSITORIO PRONTO, NÃO FOI NECESSARIO CRIAR PERSONALIZADO
        const usersRepository = getRepository(User); 

        // VERIFICAÇÃO DE EMAIL EXISTENTE
        const checkUserExists = await usersRepository.findOne({ where: { email} }) 

        // TRATATIVA DE ERRO PARA ROTA
        if (checkUserExists) { throw new Error('Email address already used.')}
        
        //CRIPTOGRAFIA DE SENHA
        const hashedPassword = await hash(password,  8)

        // CRIANDO USUARIO COM RETORNO
        const user = usersRepository.create({ name, email, password: hashedPassword});

        // SALVANDO NO BANCO DE DADOS
        await usersRepository.save(user); 
      
        return user;

    }
}

export default CreateUserService;