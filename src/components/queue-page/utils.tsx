import { ElementStates } from "../../types/element-states";

export const MAX_SIZE = 7

export interface QueueObject {
    letter?: string | null;
    state: ElementStates;
    tail?: string;
    head?: string;
}

export interface IQueue<T> {
    enqueue: (value: T) => void;
    dequeue: () => void;
    getHead: () => number
    getTail: () => number
    getValue: (ind: number) => any
    isEmpty: () => boolean
    clear: () => void
}

export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = []
    head: number = 0
    tail: number = 0
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size
    }

    enqueue(value: T) {
        //Добавить первое значение.

        if (this.isEmpty()) {
            this.container.push(value)
            this.length++;
        }

        else {
            this.container.push(value)
            this.tail++;
            this.length++;
        }

    }
    dequeue = () => {
        if (this.getHead() === this.getTail()) {
            this.container.length = 0;
            this.tail = 0
            this.head = 0;
        }
        this.container[this.head] = null
        this.head++;
        this.length--;
    }

    getHead = () => {
        return this.head
    }

    getTail = () => {
        return this.tail
    }


    getValue = (ind: number) => {
        return this.container[ind]
    }

    isEmpty = () => this.container.length === 0;


    getSize = () => this.size;

    clear = () => {
        this.container.length = 0
        this.head = 0
        this.tail = 0
    }
}