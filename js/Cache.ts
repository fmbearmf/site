export class InputFieldCache {
    private typingTimer: ReturnType<typeof setTimeout>;
    private doneTypingInterval: number = 1000;

    constructor() {
        this.cacheInputFields();
    }

    private async cacheInputFields(): Promise<void> {
        const inputFields = document.querySelectorAll('input');
        console.debug(inputFields);
        inputFields.forEach((input: HTMLInputElement) => {
            input.addEventListener('input', () => {
                clearTimeout(this.typingTimer);
                this.typingTimer = setTimeout(() => {
                    console.debug(`${input.id}: ${input.value}`);
                    localStorage.setItem(input.id, input.value);
                }, this.doneTypingInterval);
            });

            const cachedValue = localStorage.getItem(input.id);
            if (cachedValue !== null) {
                input.value = cachedValue;
            }
        });
    }

    async clearCache() {
        const inputFields = document.querySelectorAll('input');
        inputFields.forEach((input: HTMLInputElement) => {
            localStorage.removeItem(input.id);
        });
    }
}