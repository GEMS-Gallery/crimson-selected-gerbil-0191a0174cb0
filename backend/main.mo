import Func "mo:base/Func";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor {
  // Message type definition
  public type Message = {
    sender: Text;
    content: Text;
    timestamp: Time.Time;
  };

  // Stable variable to store messages
  stable var messages : [Message] = [];

  // Function to send a message
  public func sendMessage(sender: Text, content: Text) : async () {
    let newMessage : Message = {
      sender = sender;
      content = content;
      timestamp = Time.now();
    };
    messages := Array.append(messages, [newMessage]);
  };

  // Query function to get all messages
  public query func getMessages() : async [Message] {
    messages
  };
}
