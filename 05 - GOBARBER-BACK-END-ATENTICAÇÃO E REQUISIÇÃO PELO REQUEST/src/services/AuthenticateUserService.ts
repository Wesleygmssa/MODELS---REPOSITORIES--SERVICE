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

        const userRepository = getRepository(User); //UTILIZANDO O REPOSITORIO

        //FAZENDO A BUSCA NO BANCO DE EMAIL CADASTRADO OU NÃO CADASTRADO // RETORANDO UM USUÁRIO DE CADASTRADO.
        const user = await userRepository.findOne({ where: {email: email}}); 

        //VERIFICAÇÃO EMAIL CASO USUARIO NÃO SEJA ENCONTRADO
        if(!user){throw new Error('Incorrect email/password combination.');}
        
        //VERIFICAÇÃO DA SENHA CRYPTOGRAFA E NÃO CRYPTOGRAFADA
        const passwordMatched = await compare(password, user.password)  

        //SENHA NÃO ENCONTRADA RETORNA UM ERRO
        if(!passwordMatched){throw new Error('Incorrect email/password combination.');}

        // 01 - CHEGANDO AQUI, USUÁRIDO ATENTICADO NO BANCO DE DADOS - 
        // 02 - CRIANDO O TOKEN CRIPTOGRAFADO
        const token = sign({},'05e2fd9aec3d5774431c9798478fe0c5',{
            subject: user.id,// IDENTIFICAR USUÁRIO QUE GEROU O TOKEN ID DO USUÁRIO.
            expiresIn: '1d', // DURABILIDADE 24H.
        });

        return {user, token} // RETORANDO O TOKEN E USUARIO.
    }
}
export default AuthenticateUserService // EXPORTAÇÃO DA CLASSA