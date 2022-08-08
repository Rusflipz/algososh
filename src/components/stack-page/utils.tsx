import { ElementStates } from "../../types/element-states";

export interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    getSize: () => number;
    clear: () => void
    peak: () => T | null
}

export interface IStackObject {
    letter?: string | null;
    state: ElementStates;
    head?: "top";
}

export class Stack<T> implements IStack<T> {
    private container: T[] = []

    push = async (item: T) => {
        this.container.push(item);
    };

    pop = async () => {
        this.container.pop();
    };

    peak = () => {
        const size = this.getSize()
        if (size != 0) {
            return this.container[this.getSize() - 1]
        }
        else return null
    }

    getSize = () => this.container.length;
    clear = () => this.container.length = 0
}
