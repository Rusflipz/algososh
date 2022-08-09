import { bubbleSortAlgo } from "./utils";
import { selectionSortAlgo } from "./utils";
import { ElementStates } from "../../types/element-states";

let arrDescending = [
    {
        num: 9,
        state: ElementStates.Modified,
    },
    {
        num: 5,
        state: ElementStates.Modified,
    },
    {
        num: 4,
        state: ElementStates.Modified,
    },
    {
        num: 1,
        state: ElementStates.Modified,
    },
]

let arrAscending = [
    {
        num: 1,
        state: ElementStates.Modified,
    },
    {
        num: 4,
        state: ElementStates.Modified,
    },
    {
        num: 5,
        state: ElementStates.Modified,
    },
    {
        num: 9,
        state: ElementStates.Modified,
    },
]

let testObj = {
    arrDescending: arrDescending,
    arrAscending: arrAscending,
    resEmpty: [],
    arrOneElement: [
        {
            num: 3,
            state: ElementStates.Default,
        },
    ]
}


describe("Проверка сортировки выбором", () => {
    let arr;
    beforeEach(() => {
        arr = [
            {
                num: 4,
                state: ElementStates.Default,
            },
            {
                num: 9,
                state: ElementStates.Default,
            },
            {
                num: 5,
                state: ElementStates.Default,
            },
            {
                num: 1,
                state: ElementStates.Default,
            },
        ]
    })

    it("Проверка сортировки выбором по убыванию", () => {
        expect(selectionSortAlgo("descending", arr).resultArray)
            .toStrictEqual(testObj.arrDescending)
    });

    it("Проверка сортировки выбором по возростанию", () => {
        expect(selectionSortAlgo("ascending", arr).resultArray)
            .toStrictEqual(testObj.arrAscending)
    });

})

describe("Проверка сортировки пузырьком", () => {
    let arr;
    beforeEach(() => {
        arr = [
            {
                num: 4,
                state: ElementStates.Default,
            },
            {
                num: 9,
                state: ElementStates.Default,
            },
            {
                num: 5,
                state: ElementStates.Default,
            },
            {
                num: 1,
                state: ElementStates.Default,
            },
        ]
    })

    it("Проверка сортировки пузырьком по убыванию", () => {
        expect(bubbleSortAlgo("descending", arr).resultArray)
            .toStrictEqual(testObj.arrDescending)
    });

    it("Проверка сортировки пузырьком по возрастанию", () => {
        expect(bubbleSortAlgo("ascending", arr).resultArray)
            .toStrictEqual(testObj.arrAscending)
    });

})