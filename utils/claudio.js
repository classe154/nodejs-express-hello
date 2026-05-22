import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage } from "langchain";

const model = new ChatAnthropic({
    model: 'claude-sonnet-4-6',
    apiKey: process.env.CLAUDE_API_KEY 
});

const mandaMessaggioAClaudio = (messaggio) => {
    return model.invoke([
        new HumanMessage(messaggio)
    ]);
}

export {
    mandaMessaggioAClaudio
};