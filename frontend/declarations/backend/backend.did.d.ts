import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Message {
  'content' : string,
  'sender' : string,
  'timestamp' : Time,
}
export type Time = bigint;
export interface _SERVICE {
  'getMessages' : ActorMethod<[], Array<Message>>,
  'sendMessage' : ActorMethod<[string, string], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
