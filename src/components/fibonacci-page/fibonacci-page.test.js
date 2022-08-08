import { getFibonacciNumbers } from "./utils";

describe("Проверка числа фибоначчи", () => {

    it("Должно вернуться число 1", () => {
        expect(getFibonacciNumbers(1)).toBe(1)
    });

    it("Должно вернуться число 1", () => {
        expect(getFibonacciNumbers(2)).toBe(1)
    });

    it("Должно вернуться число 2", () => {
        expect(getFibonacciNumbers(3)).toBe(2)
    });

    it("Должно вернуться число 3", () => {
        expect(getFibonacciNumbers(4)).toBe(3)
    });

    it("Должно вернуться число 5", () => {
        expect(getFibonacciNumbers(5)).toBe(5)
    });

    it("Должно вернуться число 8", () => {
        expect(getFibonacciNumbers(6)).toBe(8)
    });

    it("Должно вернуться число 13", () => {
        expect(getFibonacciNumbers(7)).toBe(13)
    });

})

