import {Response, Request, NextFunction} from 'express';
import {verify} from 'jsonwebtoken';


export default  function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void{
    //validação do token JWT

    const authHeader = request.headers.authorization;

    if(!authHeader){throw new Error('JWT token is missing')}

    // Bearer token:sdkskdfjls
    const[ type, token]= authHeader.split(' ');

    try{
            const decoded = verify(token, '05e2fd9aec3d5774431c9798478fe0c5');
            console.log(decoded)
            return next();
    }catch (err){

        throw new Error('Invalid JWT token');
    }

}