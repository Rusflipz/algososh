import { Queue } from './utils'

describe("Проверка очереди", () => {

    const queue = new Queue(3)

    it("Добавить элемент в пустую очередь", () => {
        queue.enqueue(1)
        expect(queue.getHead()).toBe(0)
        expect(queue.getTail()).toBe(0)

    });

    it("Добавить элемент в очередь", () => {
        queue.enqueue(2)
        expect(queue.getHead()).toBe(0)
        expect(queue.getTail()).toBe(1)

    });

    it("Добавить элемент в очередь", () => {
        queue.enqueue(3)
        expect(queue.getHead()).toBe(0)
        expect(queue.getTail()).toBe(2)

    });

    it("Удалить элемент из очереди", () => {
        queue.dequeue()
        expect(queue.getHead()).toBe(1)

    });

    it("Удалить элемент из очереди", () => {
        queue.dequeue()
        expect(queue.getHead()).toBe(2)

    });

    it("Проверка очистки", () => {
        queue.clear()
        expect(queue.isEmpty).toBeTruthy
        expect(queue.getHead()).toBe(0)
        expect(queue.getHead()).toBe(0)

    });

})