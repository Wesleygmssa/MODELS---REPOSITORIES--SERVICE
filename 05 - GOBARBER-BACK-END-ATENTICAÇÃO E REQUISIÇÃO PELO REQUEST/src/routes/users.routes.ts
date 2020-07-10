// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => { //routes.use('/appointments',usersRouter);

    try { //TRATATIVA DE ERRO.

        const { name, email, password } = request.body;

        //REGRA DE NEGOCIO , EXTANCIA
        const createUser = new CreateUserService(); 

        //EXECUTANDO A REGRA DE NEGOCIO RETORNANDO USUARIO PARA FRONT END
        const user = await createUser.execute({ name, email, password })

        delete user.password
        
        return response.json(user);

    } catch (error) { // throw Error('this appointment is already booked');

        return response.status(400).json({ error: error.message });
    }
});


export default usersRouter