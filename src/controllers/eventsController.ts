import { Request, Response } from "express";
import { logger } from "../logger";
import ContractEventListener from "../../scripts/events";

function handleErrors(error: any, res: Response){
    logger.error(`Error in deployContractController: ${error.message}`)
    if(error.message.startsWith('Invalid Params')){
        return res.status(400).json({ success: false, error: error.message });
    }
    return res.status(500).json({ success: false, error: 'Internal server error' });
}

export async function eventsController(req: Request, res: Response){
    try{
        const {contractAddress, contractName, event} = req.body;
        const eventListener = new ContractEventListener({contractAddress, contractName, event});
        eventListener.startEventListener();
        return res.status(200).json({message: 'Started listening for events'})
    }catch(error: any){
        handleErrors(error, res)
    }
}