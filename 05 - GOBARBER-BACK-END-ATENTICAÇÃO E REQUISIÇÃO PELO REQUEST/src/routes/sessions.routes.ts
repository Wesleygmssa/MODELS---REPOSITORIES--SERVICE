// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService'; //REGRA DE NEGOCIO DA APLICAÇÃO

const sessionsRouter = Router(); //ROTA 

sessionsRouter.post('/', async (request, response) => { //routes.use('/appointments',usersRouter);

    try { //TRATATIVA DE ERRO.
        // RECEBDO DADOS DO FRONT END 
        const {email, password} = request.body 

        const AuthenticateUser = new AuthenticateUserService() // EXTANCIANDO A CLASS

        //01 VERIFICAÇÃO EMAIL, SENHA E GERANDO TOKEN PARA VALIDAR O USUÁRIO
      const {user, token} = await AuthenticateUser.execute({ 
            email,
            password,
        })

        // DELETENADO SENHA , NÃO É NECESSARIO REOTRNA
        delete user.password; 

        //RETORNADO DADOS DO USUÁRIO E O TOKEN QUE FOI CRIADO
       return response.json({user, token}) 

    } catch (error) { // throw Error('this appointment is already booked');

        return response.status(400).json({ error: error.message });
    }
});


export default sessionsRouter