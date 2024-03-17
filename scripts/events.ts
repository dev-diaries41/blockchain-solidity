import { artifacts, ethers } from "hardhat";
import { Notify } from "../src/utils/notify";
import { NOTIFICATIONS_CONFIG } from "../src/constants/notifications";
import { eventLogger, logger } from "../src/logger";
import { EventListenerParams, EventName } from "../src/constants/types";
import { EVENT_LISTENER_SCHEMA } from "../src/constants/schemas";


class ContractEventListener {
    private contractAddress: string;
    private abi: any;
    private notify: Notify;
    private event: EventName;

    constructor(config: EventListenerParams) {
        const {contractAddress, contractName, event} = config;
        const validConfig = EVENT_LISTENER_SCHEMA.safeParse(config);
        if (!validConfig.success) {
          throw new Error('Invalid Params: ' + JSON.stringify(validConfig.error.errors));
        }
        this.contractAddress = contractAddress;
        this.abi = artifacts.readArtifactSync(contractName).abi;
        this.notify = new Notify(NOTIFICATIONS_CONFIG);
        this.event = event;
    }

    private async _handleEvent(...eventPayload: any[]) {
        try {
            const payload = eventPayload[eventPayload.length - 1]; 
            const eventParams = payload.fragment.inputs.map((paramType: any) => paramType.name)
            const eventArgs = payload.args
            const eventData: Record<string, string> = {};
            eventParams.forEach((param:string, index: number) => eventData[param] = eventArgs[index].toString())
            eventData['transactionHash'] = payload.log.transactionHash;
            eventLogger.info(JSON.stringify(eventData));
            await this.notify.all(JSON.stringify(eventData));
        } catch (error: any) {
            logger.error(`Error handling event: ${error.message}`);
        }
    }

    public startEventListener() {
        const provider = ethers.provider;
        const contract = new ethers.Contract(this.contractAddress, this.abi, provider);
        logger.info(`Listening for ${this.event} events for ${this.contractAddress}...`);
        contract.on(this.event, this._handleEvent.bind(this));
    }
}

export default ContractEventListener;