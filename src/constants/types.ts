export interface NotifyConfig {
    telegramConfig: {
      token: string;
      options: { polling?: boolean };
      telegramChannelId: string;
    };
    discordConfig?: {
      webhookUrl: string;
    };
  }

export const CONTRACT_NAMES = ['Ecommerce', 'Escrow', 'Gift', 'Lock', 'ManageGroups', 'MultiSigWallet', 'NFTAuth'] as const;
export const EVENT_NAMES = ['Paid', 'Claimed', 'InEscrow', 'Cancelled', 'Withdrawal', 'NewMember', 'MemberRemoved', 'ConfirmTransaction', 'RevokeConfirmation', 'ExecuteTransaction', 'MintAuth'] as const;
  
export type EventName = typeof EVENT_NAMES[number];

export type ContractName = typeof CONTRACT_NAMES[number]; 

export interface EventListenerParams {
  contractAddress: string;
  contractName: ContractName;
  event: EventName;
}