class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        const lowerCaseMessage = message.toLowerCase();
        let handled = false;

        if (lowerCaseMessage.includes("안녕")) {
            this.actionProvider.greet();
            handled = true;
        }

        if (lowerCaseMessage.includes("시간")) {
            this.actionProvider.handleTime();
            handled = true;
        }

        if (lowerCaseMessage.includes("위치") || lowerCaseMessage.includes("주소")) {
            this.actionProvider.handleLocation();
            handled = true;
        }

        if (lowerCaseMessage.includes("번호")) {
            this.actionProvider.handlePhoneNumber();
            handled = true;
        }

        if (!handled) {
            this.actionProvider.handleUnknown();
        }
    }
}

export default MessageParser;
