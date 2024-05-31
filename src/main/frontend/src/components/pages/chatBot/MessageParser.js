class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        const lowerCaseMessage = message.toLowerCase();
        let handled = false;

        if (lowerCaseMessage.includes("안녕") || lowerCaseMessage.includes("ㅎㅇ") || lowerCaseMessage.includes("하이")) {
            this.actionProvider.greet();
            handled = true;
        }

        if (lowerCaseMessage.includes("시간") || lowerCaseMessage.includes("몇 시") || lowerCaseMessage.includes("몇시")) {
            this.actionProvider.handleTime();
            handled = true;
        }

        if (lowerCaseMessage.includes("위치") || lowerCaseMessage.includes("주소") || lowerCaseMessage.includes("장소")) {
            this.actionProvider.handleLocation();
            handled = true;
        }

        if (lowerCaseMessage.includes("번호") || lowerCaseMessage.includes("전화")) {
            this.actionProvider.handlePhoneNumber();
            handled = true;
        }

        if (!handled) {
            this.actionProvider.handleUnknown();
        }
    }
}

export default MessageParser;
