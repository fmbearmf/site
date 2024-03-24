import { InputFieldCache } from "../Cache";

export class App {
    private state: Node;
    private inputFieldCache: InputFieldCache;

    constructor(state: Node) {
        this.state = state;
    }

    async cache(): Promise<InputFieldCache> {
        return new InputFieldCache();
    }

    async run() {
        this.inputFieldCache = await this.cache();
    }
}