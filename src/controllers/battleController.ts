import { Request, Response } from "express";
import * as battleServices from "../services/battleServices";


export async function makeBattle(req:Request,res:Response){
    const {firstUser,secondUser}=req.body;
    const result= await battleServices.doBattle(firstUser,secondUser);
    return result;
}