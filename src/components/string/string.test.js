import { stringReverseAlgo } from "./utils";

describe("Проверка строки", () => {

    let testString = "1234"
    const steps = stringReverseAlgo(testString)

    it("Проврка количества шагов четной строки", () => {
        expect(steps).toBe(2)
    });

})

describe("Проверка строки", () => {

    let testString = "1234567"
    const steps = stringReverseAlgo(testString)

    it("Проврка количества шагов нечетной строки", () => {
        expect(steps).toBe(3)
    });

})