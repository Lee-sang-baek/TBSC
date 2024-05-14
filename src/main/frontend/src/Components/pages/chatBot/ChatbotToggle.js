import React, { useState, useEffect } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import "./ChatbotToggle.css";

const ChatbotToggle = () => {
    const [showChatbot, setShowChatbot] = useState(false);
    const [botState, setBotState] = useState(() => {
        const savedState = sessionStorage.getItem("chatbotState");
        return savedState ? JSON.parse(savedState) : { messages: config.initialMessages };
    });

    useEffect(() => {
        if (showChatbot && botState.messages.length === 0) {
            const actionProvider = new ActionProvider(
                (message) => {
                    setBotState((prevState) => {
                        const newState = {
                            ...prevState,
                            messages: [...prevState.messages, message],
                        };
                        sessionStorage.setItem("chatbotState", JSON.stringify(newState));
                        return newState;
                    });
                },
                () => {}
            );
            actionProvider.greet();
        }
    }, [showChatbot, botState]);

    const handleToggle = () => {
        setShowChatbot((prev) => !prev);
    };

    return (
        <div className="chatbot-container">
            {showChatbot && (
                <div className="chatbot-popup">
                    <Chatbot
                        config={config}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                        saveMessages={botState}
                        messageHistory={botState.messages}
                    />
                </div>
            )}
            <button className="chatbot-button" onClick={handleToggle}>
                <img src="chatbot-icon.png" alt="Chatbot Icon" />
            </button>
        </div>
    );
};

export default ChatbotToggle;
