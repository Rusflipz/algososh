import { ElementStates } from "../../types/element-states";

export interface listItemProps {
    adding?: boolean;
    deleting?: boolean;
    noArrow?: boolean;
    tail?: string;
    head?: string;
    test?: number;
    state?: ElementStates;
    extraCircle?: {
        test: string;
    }
}

export class Node<T> {
    value: T;
    next: Node<T> | null;
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = next === undefined ? null : next;
    }
}

export interface ILinkedList<T> {
    addToHead: (value: T) => void;
    addToTail: (value: T) => void;
    deleteHead: () => T | null;
    deleteTail: () => T | null;
    getNodeToIndex: (index: number) => T | null;
    insertFromPosition: (value: T, index: number) => void;
    removeFromPosition: (index: number) => T | null;
    getSize: () => number;

}

export class LinkedList<T> implements ILinkedList<T> {
    head: Node<T> | null = null;
    tail: Node<T> | null = null;
    size: number;

    constructor(initArr: T[]) {
        this.head = null;
        this.size = 0;
        initArr?.forEach((item) => this.insertFromPosition(item, 0));
    }

    // Добавить в начало
    addToHead = (value: T) => {
        const node = new Node<T>(value);
        if (!this.head) {
            this.head = node;
            return this;
        }
        node.next = this.head;
        this.head = node;
        this.size++;
        return this;
    };

    // Добавить в конец
    addToTail(value: T) {
        const node = new Node(value);
        if (this.size === 0) {
            this.head = node;
        }
        let currentNode = this.head;
        while (currentNode && currentNode.next !== null) {
            currentNode = currentNode.next;
        }
        if (currentNode) currentNode.next = node
        this.size++;
    }

    // Удалить из начала

    deleteHead() {
        // Пустой список
        if (!this.head) return null;
        const deletedHead = this.head;

        // Делаем новый head

        if (this.head.next) {
            this.head = this.head.next;
        } else {
            //Уаляем все узлы
            this.head = null;
            this.tail = null;
        }
        this.size--;
        return deletedHead ? deletedHead.value : null;
    }

    // Удалить из конца

    deleteTail() {
        if (this.size === 0) {
            return null;
        }

        let currentNode = this.head;
        let prev = null;
        let currentIndex = 0;
        while (currentIndex < this.size - 1 && currentNode) {
            prev = currentNode;
            currentNode = currentNode.next;
            currentIndex++;
        }
        if (prev && currentNode) prev.next = currentNode.next;
        this.size--;
        return currentNode ? currentNode.value : null;
    }

    //Добавить по индексу
    insertFromPosition(value: T, index: number) {
        if (index < 0 || index > this.size) {
            return null;
        }

        const node = new Node<T>(value);
        if (index === 0) {
            node.next = this.head;
            this.head = node;
        } else {
            let current = this.head;
            let currentIndex = 0;
            let prev = null;
            while (currentIndex < index && current) {
                prev = current;
                current = current.next;
                currentIndex++;
            }
            if (prev) prev.next = node;
            node.next = current;
        }
        this.size++
    }

    //Удалить по индексу
    removeFromPosition(index: number) {
        if (index < 0 || index > this.size) {
            return null;
        }

        let curr = this.head;

        if (index === 0 && curr) {
            this.head = curr.next;
        } else {
            let prev = null;
            let currIndex = 0;

            while (currIndex < index && curr) {
                prev = curr;
                curr = curr.next;
                currIndex++;
            }

            if (prev && curr) prev.next = curr.next;
        }

        this.size--;
        return curr ? curr.value : null;
    }

    //Получить элемент по индексу
    getNodeToIndex(index: number) {
        let current = this.head;
        let currentIndex = 0;

        while (currentIndex < index && current) {
            current = current.next;
            currentIndex++;
        }
        return current ? current.value : null;
    }


    //Получить размер списка
    getSize() {
        return this.size;
    }
}
