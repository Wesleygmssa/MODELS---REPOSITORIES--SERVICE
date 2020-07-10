import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';


interface Request{
    email: string,
    password: string,
}

interface Response{
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({email, password}:Request): Promise<Response>{

        const userRepository = getRepository(User);

        //FAZENDO A BUSCA NO BANCO DE EMAIL CADASTRADO OU NÃO CADASTRADO // RETORANDO UM USUÁRIO DE CADASTRADO.
        const user = await userRepository.findOne({ where: {email: email}}); 

        if(!user){throw new Error('Incorrect email/password combination.');}
        
       
        const passwordMatched = await compare(password, user.password)  //VERIFICAÇÃO DA SENHA CRYPTOGRAFA E NÃO CRYPTOGRAFADA

        if(!passwordMatched){throw new Error('Incorrect email/password combination.');}

        //CHEGANDO AQUI, USUÁRIDO ATENTICADO NO BANCO DE DADOS
        const token = sign({},'05e2fd9aec3d5774431c9798478fe0c5',{
            subject: user.id,// IDENTIFICAR USUÁRIO Q GEROU O TOKEN
            expiresIn: '1d', // DURABILIDADE 
        });

        return {user, token}
    }
}
export default AuthenticateUserService