import { createChatBotMessage } from "react-chatbot-kit";
import CustomMessage from "./CustomMessage";

const CustomHeader = () => (
    <div style={{ backgroundColor: "#376B7E", padding: "10px", color: "#fff", textAlign: "center" }}>
        광주관광기업지원센터
    </div>
);

const config = {
    botName: "ReactBot",
    initialMessages: [createChatBotMessage("안녕하세요! 무엇을 도와드릴까요?")],
    customComponents: {
        header: () => <CustomHeader />,
        botMessage: (props) => <CustomMessage {...props} />,
    },
    customStyles: {
        botMessageBox: {
            backgroundColor: "#376B7E",
        },
        chatButton: {
            backgroundColor: "#5ccc9d",
        },
    },
};

export default config;
