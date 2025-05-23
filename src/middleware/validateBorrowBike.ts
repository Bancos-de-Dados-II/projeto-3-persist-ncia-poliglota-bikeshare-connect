import { Request, Response, NextFunction } from "express";
import CountBorrowBikeByBikeID from "../service/CountBorrowBikeByBikeID";
import CountReturnBikeByBikeID from "../service/CountReturnBikeByBikeID";
import CountBorrowBikeByUserID from "../service/CountBorrowBikeByUserID";
import CountReturnBikeByUserID from "../service/CountReturnBikeByUserID";

async function validateBorrowBike(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { ID_Bicicleta, ID_Usuario } = req.body;
        const retiradasBicicleta: number = await CountBorrowBikeByBikeID(ID_Bicicleta);
        const devolucoesBicicleta: number = await CountReturnBikeByBikeID(ID_Bicicleta);        

        if(retiradasBicicleta-devolucoesBicicleta!=0){
            res.status(403).json({error: "Essa bicicleta já foi retirada"});
            return;
        }

        const retiradasUsuario: number = await CountBorrowBikeByUserID(ID_Usuario);
        const devolucoesUsuario: number = await CountReturnBikeByUserID(ID_Usuario);

        if(retiradasUsuario-devolucoesUsuario!=0){
            res.status(403).json({error: "Esse usuario ainda não devolveu a última bicicleta"});
            return;
        }

        next();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export default validateBorrowBike;