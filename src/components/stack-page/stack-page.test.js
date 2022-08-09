import { Stack } from './utils'

describe("Проверка стека", () => {

    const stack = new Stack()

    it("Добавить элемени в стек", () => {
        stack.push(1)
        expect(stack.peak()).toBe(1)
        stack.push('hello')
        expect(stack.peak()).toBe("hello")
    });

    it("Добавить элемент в стек", () => {
        stack.pop()
        expect(stack.peak()).toBe(1)

    });

    it("Удалить элемент из стека", () => {
        stack.clear()
        expect(stack.getSize()).toBeNull

    });

})