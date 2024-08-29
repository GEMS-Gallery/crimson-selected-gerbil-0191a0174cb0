export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Message = IDL.Record({
    'content' : IDL.Text,
    'sender' : IDL.Text,
    'timestamp' : Time,
  });
  return IDL.Service({
    'getMessages' : IDL.Func([], [IDL.Vec(Message)], ['query']),
    'sendMessage' : IDL.Func([IDL.Text, IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
