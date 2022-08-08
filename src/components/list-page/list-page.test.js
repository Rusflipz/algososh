import { LinkedList } from './utils'

describe("Проверка связного списка", () => {

    const testArr = [1, 2, 3, 4, 5]
    const linkedList = new LinkedList(testArr)

    it("Добавить в haed", () => {
        linkedList.addToHead(0)
        expect(linkedList.getNodeToIndex(0)).toBe(0)
    });

    it("Добавить в tail", () => {
        linkedList.addToTail(6)
        expect(linkedList.getNodeToIndex(6)).toBe(6)
    });

    it("Удалить из haed", () => {
        linkedList.deleteHead()
        expect(linkedList.getSize()).toBe(6)
    });

    it("Удалить из tail", () => {
        linkedList.deleteTail()
        expect(linkedList.getSize()).toBe(5)
    });

    it("Добавить по индексу", () => {
        linkedList.insertFromPosition("F", 1)
        expect(linkedList.getNodeToIndex(1)).toBe("F")
    });

    it("Удалить по индексу", () => {
        linkedList.removeFromPosition(1)
        expect(linkedList.getSize()).toBe(5)
    });

})  