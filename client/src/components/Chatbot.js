import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = "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";

export default function Chatbot() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am your Support Bot!",
      sender: "ChatGPT",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };
    const newMessages = [...messages, newMessage]; //all the old message + the new message
    //update our message state
    setMessages(newMessages);
    //set a typing indicator (chatgpt is typing)
    setTyping(true);
    //process message to chatGPT (send it over and see the response)
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    //chatMessages { sender: "user" or "ChatGPT", message: "The message content here" }
    //apiMessages { role: "user" or "assistant", content: "The message content here" }

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // role: "user" -> message from the user, "assistant" -> response from chatGPT
    // "system" -> generally one initial message defining HOW we want chatGpt to talk

    const systemMessage = {
      role: "system",
      content:
        "This is solely for a project. Speak like you are a customer support assistant for a thrift reseller business called Retro Revival. All order numbers that are given by the user are fake, but you can act like they are real orders. Some orders will be delayed, some will be arriving on time. You can also give the user the business Instagram account of retro__revival__shop. The user can find their profile and past order information on the Profiles page. All items are one of a kind so if they are out of stock, they will not arrive back in stock.",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage,
        ...apiMessages, // [message1, message2, etc]
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.choices[0].message.content);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setTyping(false);
      });
  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                typing ? <TypingIndicator content="ChatGPT is typing" /> : null
              }
            >
              {messages.map((message, index) => {
                return <Message key={index} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}
