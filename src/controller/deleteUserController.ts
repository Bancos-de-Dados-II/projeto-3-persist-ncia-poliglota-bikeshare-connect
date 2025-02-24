import User, { InterfaceUser } from "../models/User";
import mongoose, { Types } from "mongoose";
import { Request, Response } from "express";

async function deleteUserController(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;

        // Converte para o id para o tipo reconhecido no banco de dados
        const objectId: Types.ObjectId = new mongoose.Types.ObjectId(id);
        const usuarioDeletado: InterfaceUser | null = await User.findByIdAndDelete(objectId);
        console.log(objectId);
        console.log(usuarioDeletado);

        if (!usuarioDeletado) {
            res.status(404).json({ message: "Usuario não encontrado." });
            return;
        }

        res.status(200).json({ message: "Usuario deletado com sucesso", usuario: usuarioDeletado });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export default deleteUserController;
