class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    greet() {
        const message = this.createChatBotMessage("안녕하세요! 광주관광기업지원센터입니다.");
        this.updateChatbotState(message);
    }

    handleTime() {
        const message = this.createChatBotMessage(
            "광주관광기업지원센터는 휴일, 공휴일을 제외한 모든 요일 09:00~18:00 운영합니다."
        );
        this.updateChatbotState(message);
    }

    handleLocation() {
        const message = this.createChatBotMessage(
            "광주관광기업지원센터는 광주광역시 서구 운천로 247(치평동) 스타타워 4층에 위치하고 있습니다."
        );
        this.updateChatbotState(message);
    }

    handlePhoneNumber() {
        const message = this.createChatBotMessage(
            "광주관광기업지원센터 번호는 000-0000-0000입니다."
        );
        this.updateChatbotState(message);
    }

    handleUnknown() {
        const message = this.createChatBotMessage(
            "키워드를 입력해주세요. 예: 안녕, 시간, 주소, 위치, 번호"
        );
        this.updateChatbotState(message);
    }

    updateChatbotState(message) {
        this.setState((prevState) => {
            const newState = {
                ...prevState,
                messages: [...prevState.messages, message],
            };
            sessionStorage.setItem("chatbotState", JSON.stringify(newState)); // 상태 저장
            return newState;
        });
    }
}

export default ActionProvider;
