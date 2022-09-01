import { Router } from "express";
import { makeBattle } from "../controllers/battleController";

const battleRouter=Router();

battleRouter.post('/test', makeBattle)

export default battleRouter;