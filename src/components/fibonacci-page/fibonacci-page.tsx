import React, { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {

  const [stringValue, setStringValue] = useState(Array);
  const [fibonacci, setFibonacci] = useState<number | null>(null);
  const [fibonacciValue, setFibonacciValue] = useState(String);
  const [isButtonLoader, setIsButtonLoader] = useState(false);

  // Начала рендера при изменении знаачения
  useEffect(() => {
    if (fibonacci == null) {
    } else {
      setStringValue([1])
      getFibonacciNumbers(fibonacci)
      // Ставит загрузку с кнопки
      setIsButtonLoader(true)
    }
  }, [fibonacci])

  // Сброс данных при выходе
  useEffect(() => {
    return () => {
      setFibonacci(null)
      setStringValue([])
      setFibonacciValue('')
    }
  }, [])

  // Функция считающая число фибаначи
  function getFibonacciNumbers(n: number) {
    let array = [1]
    if (n == 1) {
      setTimeout(function () {
        array.push(1)
        render(...array)
        // Убирает загрузку с кнопки
        setIsButtonLoader(false)
      }, 500)
    } else {
      array = [1]
      setTimeout(function () {
        array.push(1)
        render(...array)
      }, 500)
      let a = 1;
      let b = 1;
      for (let i = 2; i <= n; i++) {
        setTimeout(function () {
          if (i == n) {
            // Убирает загрузку с кнопки
            setIsButtonLoader(false)
          }
          let c = a + b;
          a = b;
          b = c;
          array.push(c)
          render(...array)
        }, 500 * (i - 1))
      }
    }
  }

  // Отрисовка массива
  function render(...array: any) {
    setStringValue(array)
  }

  // Изменение инпута
  function handleChangeFibonacci(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setFibonacciValue(e.target.value)
  }

  // Изменение значения fibanacci
  function handleClickFibonacci(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const num: number = Number(fibonacciValue)
    setFibonacci(num)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.main_conteiner}>
        <form className={styles.row_conteiner}
          onSubmit={(e) => handleClickFibonacci(e)}>
          <div className={styles.input_conteiner}>
            <Input value={fibonacciValue} placeholder='Введите текст' type="number" isLimitText max={19} onChange={handleChangeFibonacci}></Input>
          </div>
          {!fibonacciValue ? <Button disabled text='Рассчитать' type='submit'></Button> : <Button
            isLoader={isButtonLoader}
            text='Рассчитать' type='submit'></Button>}
        </form>
      </div>
      <div className={styles.circle_conteiner}>
        {stringValue.map((letter: any, index: number) => <div key={index} className={`${styles.circle}`}><Circle index={index} letter={letter} /></div>)
        }
      </div>
    </SolutionLayout>
  );
};
