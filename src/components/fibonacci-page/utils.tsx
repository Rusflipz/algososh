//Функция Фиббоначи
export const getFibonacciNumbers = (num: number, memo: Record<number, number> = {}): number => {
    if (num in memo) {
        return memo[num];
    }
    if (num <= 2) {
        return 1
    }
    memo[num] = getFibonacciNumbers(num - 1, memo) + getFibonacciNumbers(num - 2, memo);
    return memo[num];
}