import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import shortid from "shortid";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ISymbolProps, stringReverseAlgo } from "./utils";
import { pause, swap } from "../../utils/utils";

export const StringComponent: React.FC = () => {

  //Установка state
  const [mainArr, setMainArr] = useState<Array<ISymbolProps>>([]);
  const [inptValue, setInptValue] = useState('');
  const [isStringValueEmpty, setIsStringValueEmpty] = useState(true);
  const [isButtonLoader, setIsButtonLoader] = useState(false);

  // Изменение параметров при размонтировании компонента
  useEffect(() => {
    return () => {
      setMainArr([])
    }
  }, [])


  //Рендер
  const renderInputNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isButtonLoader === true) {
    } else {
      if (e.currentTarget.value == '') {
        setIsStringValueEmpty(true)
      } else {
        setIsStringValueEmpty(false)
      }
      const targetInput = e.currentTarget
      setInptValue(targetInput.value)
      setMainArr(
        targetInput.value.split("").map((symbol: string) => {
          return {
            symbol: symbol,
            state: ElementStates.Default,
          };
        })
      )
    }
  };

  const stringReverse = async () => {
    let count = 0
    setIsButtonLoader(true);
    const temp = [...mainArr]
    const stepCounter = stringReverseAlgo(inptValue)

    if (mainArr.length % 2 === 0) {
      //если четное
      while (count <= stepCounter - 1) {
        temp[count].state = ElementStates.Changing;
        temp[inptValue.length - (count + 1)].state = ElementStates.Changing;
        setMainArr([...temp]);
        await pause(500);
        swap(temp, count, temp.length - (count + 1))

        temp[count].state = ElementStates.Modified;
        temp[inptValue.length - (count + 1)].state = ElementStates.Modified;
        setMainArr([...temp]);
        await pause(500);
        count++
      }
    } else {
      //если нечетное
      while (count <= stepCounter) {
        temp[count].state = ElementStates.Changing;
        temp[inptValue.length - (count + 1)].state = ElementStates.Changing;
        setMainArr([...temp]);
        await pause(500);
        swap(temp, count, temp.length - (count + 1))

        temp[count].state = ElementStates.Modified;
        temp[inptValue.length - (count + 1)].state = ElementStates.Modified;
        setMainArr([...temp]);
        await pause(500);
        count++
      }
    }
    setIsButtonLoader(false);
  };

  //меняет строку изапускает рендер
  const handleClickString = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Вернуть начальное состояние
    if (mainArr[0].state === "modified") {
      setMainArr(
        mainArr.map((symbol: ISymbolProps) => {
          symbol.state = ElementStates.Default;
          return symbol;
        })
      );
    }
    stringReverse();
  };

  function CircleComponents(letter: any, index: number, key: string) {
    return <div key={key} className={`${styles.circle}`}><Circle letter={letter.symbol} state={letter.state} /></div>
  }

  return (<>
    <SolutionLayout title="Строка">
      <div className={styles.main_conteiner}>
        <form className={styles.row_conteiner}
          onSubmit={(e) => handleClickString(e)}>
          <div className={styles.input_conteiner}>
            <Input value={inptValue} placeholder='Введите текст' isLimitText maxLength={11} onChange={renderInputNumbers}></Input>
          </div>
          {isStringValueEmpty ? <Button disabled text='Развернуть' type='submit'></Button> : <Button
            isLoader={isButtonLoader}
            text='Развернуть' type='submit'></Button>}
        </form>
      </div>
      <div className={styles.circle_conteiner}>
        {mainArr && mainArr.map((letter, index: number) => CircleComponents(letter, index, shortid.generate()))}
      </div>
    </SolutionLayout>
  </>
  );
};