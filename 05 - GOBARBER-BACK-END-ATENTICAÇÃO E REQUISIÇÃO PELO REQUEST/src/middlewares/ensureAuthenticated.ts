import {Response, Request, NextFunction} from 'express';
import {verify} from 'jsonwebtoken'; // VERIFICA SE TOKEN E VALIDO OU NÃO
import authConfig from '../config/auth'; // ARQUIVO DE AUTORIZAÇÃO 

interface tokenPayload{
    iat: number;
    exp: number;
    sub: string;
}

//validação do token JWT
export default  function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void{
    

    //PEGANDO A REQUISIÇÃO PELO CABEÇALHO
    const authHeader = request.headers.authorization; 

    // NÃO ENCONTRADO NADA NO CABEÇALHO RETORNA UM ERRO
    if(!authHeader){throw new Error('JWT token is missing')} 

    //SERAPANDO NO ESPAÇO EM ARRAY // Bearer , token:sdkskdfjls
    const [ type, token] = authHeader.split(' '); 

    //TRATATIVA DE ERRO
    try{ 
        
        //VERIFICAR SE É VALIDO O TOKEN E DESCODIFICANDO O TOKEN COM AS INFORMAÇÕES DO USUARIO COMO ID
        const decoded = verify(token, authConfig.jwt.secret); 

        const {sub} = decoded as tokenPayload; //FORÇANDO AS OS TIPOS DE VARIAVEIS

        request.user = { //ADICIONANDO O ID DO USUÁRIO NAS REQUISIÇÕES NAS ROTAS Q SÃO AUTENTICADAS
            id: sub,   
        }
        
            return next();//PERMITIR QUE USUÁRIO CONTINUE UTILIZANDO APLICAÇÃO.

    }catch (err){throw new Error('Invalid JWT token')} // CATPAR ERRO DP VERIFY  DE TOKEN INVALIDO

}