import React, { useEffect, useState } from "react";
import { pause } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { getFibonacciNumbers } from "./utils";

export const FibonacciPage: React.FC = () => {

  const [stringValue, setStringValue] = useState(Array<number>);
  const [fibonacci, setFibonacci] = useState<number | null>(null);
  const [fibonacciValue, setFibonacciValue] = useState(String);
  const [isButtonLoader, setIsButtonLoader] = useState(false);

  // Начала рендера при изменении значения
  // useEffect(() => {
  //   if (fibonacci == null) {
  //   } else {
  //     setStringValue([1])
  //     getFibonacciNumbers(fibonacci, setStringValue, setIsButtonLoader)
  //     // Ставит загрузку с кнопки
  //     setIsButtonLoader(true)
  //   }
  // }, [fibonacci])

  // Сброс данных при выходе
  useEffect(() => {
    return () => {
      setFibonacci(null)
      setStringValue([])
      setFibonacciValue('')
    }
  }, [])

  // Изменение инпута
  function handleChangeFibonacci(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    // Добавил проврку чтобы даже ввести число больше 18 было нельзя
    const num: number = Number(e.target.value)
    if (num <= 19) {
      setFibonacciValue(e.target.value)
    }
  }

  // Изменение значения fibanacci
  async function handleClickFibonacci(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsButtonLoader(true)
    let nums = [];
    const num: number = Number(fibonacciValue)
    for (let i = 1; i <= num + 1; i++) {
      await pause(500)
      nums.push(getFibonacciNumbers(i))
      setStringValue([...nums]);
    }
    setFibonacci(num)
    setIsButtonLoader(false)
  }

  function renderCircle(letter: string | number | null | undefined, index: number) {
    return <div key={index} className={`${styles.circle}`}><Circle index={index} letter={letter} /></div>
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

        {stringValue.map((letter, index) => renderCircle(letter, index))
        }
      </div>
    </SolutionLayout>
  );
};
