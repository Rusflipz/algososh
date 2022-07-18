import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import shortid from "shortid";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

export const StringComponent: React.FC = () => {

  //Установка state
  const [couple1, setCouple1] = useState(ElementStates.Changing);
  const [couple11, setCouple11] = useState(ElementStates.Default);
  const [couple2, setCouple2] = useState(ElementStates.Default);
  const [couple22, setCouple22] = useState(ElementStates.Default);
  const [couple3, setCouple3] = useState(ElementStates.Default);
  const [couple33, setCouple33] = useState(ElementStates.Default);
  const [couple4, setCouple4] = useState(ElementStates.Default);
  const [couple44, setCouple44] = useState(ElementStates.Default);
  const [couple5, setCouple5] = useState(ElementStates.Default);
  const [couple55, setCouple55] = useState(ElementStates.Default);

  const [stringValue, setStringValue] = useState(Array<string>);
  const [stringValue1, setStringValue1] = useState(Array<string>);
  const [inptValue, setInptValue] = useState('');
  const [isStringValueEmpty, setIsStringValueEmpty] = useState(true);
  const [isButtonLoader, setIsButtonLoader] = useState(false);


  //При изменении значения строки.
  useEffect(() => {
    //Присваеваем парам значения state
    setCouple1(ElementStates.Changing)
    setCouple11(ElementStates.Default)
    setCouple2(ElementStates.Default)
    setCouple22(ElementStates.Default)
    setCouple3(ElementStates.Default)
    setCouple33(ElementStates.Default)
    setCouple4(ElementStates.Default)
    setCouple44(ElementStates.Default)
    setCouple5(ElementStates.Default)
    setCouple55(ElementStates.Default)

    //Проверка, сколько пар нужно развернуть
    const score = Math.floor(stringValue.length / 2)

    //Если длина больше одного вешаем загрузку
    if (stringValue.length > 1) {
      //Вешаем загрузку на кнопку
      setIsButtonLoader(true)
    }

    //Если длина больше одного, копируес массив и заходми в цикл
    if (stringValue.length > 0) {
      const arr: Array<string> = stringValue.slice()
      setStringValue1(arr)
      for (let i = 0; i < score; i++) {
        reverse(arr, score, i)
      }
    }
  }, [stringValue])


  //Изменение параметров при размонтировании компонента
  useEffect(() => {
    return () => {
      const arr: Array<string> = [];
      //Очищаем массив
      setStringValue(arr)
      //Делаем кнопку активной
      setIsButtonLoader(false)
    }
  }, [])

  //Функция, меняющая местами пары 
  function reverse(arr: Array<string>, score: number, i: number) {
    setTimeout(function () {
      if (i === (score - 1)) {
        //Делаем кнопку активной если закончили
        setIsButtonLoader(false)
      }
      arr.splice(i, 1, stringValue[(stringValue.length - 1) - i])
      arr.splice((arr.length - 1) - i, 1, stringValue[i])
      render(i)
      setStringValue1(arr)
    }, 1000 * (i + 1));
  }

  // присвает state в зависимости от расположения
  function render(i: number) {
    if (i === 0) {
      setCouple1(ElementStates.Modified)
      setCouple11(ElementStates.Modified)
      setCouple2(ElementStates.Changing)
    }
    if (i === 1) {
      setCouple2(ElementStates.Modified)
      setCouple22(ElementStates.Modified)
      setCouple3(ElementStates.Changing)
    }
    if (i === 2) {
      setCouple3(ElementStates.Modified)
      setCouple33(ElementStates.Modified)
      setCouple4(ElementStates.Changing)
    }
    if (i === 3) {
      setCouple4(ElementStates.Modified)
      setCouple44(ElementStates.Modified)
      setCouple5(ElementStates.Changing)
    }
    if (i === 4) {
      setCouple5(ElementStates.Modified)
      setCouple55(ElementStates.Modified)
    }
  }

  // отрисовывает кружки с нужным state
  function renderCouple1(letter: string, key: string) {
    return (<div key={key} className={`${styles.circle}`}><Circle letter={letter} state={couple1} /></div>)
  }

  function renderCouple2(letter: string, key: string) {
    return (<div key={key} className={`${styles.circle}`}><Circle letter={letter} state={couple2} /></div>)
  }

  function renderCouple3(letter: string, key: string) {
    return (<div key={key} className={`${styles.circle}`}><Circle letter={letter} state={couple3} /></div>)
  }

  function renderCouple4(letter: string, key: string) {
    return (<div key={key} className={`${styles.circle}`}><Circle letter={letter} state={couple4} /></div>)
  }

  function renderCouple5(letter: string, key: string) {
    return (<div key={key} className={`${styles.circle}`}><Circle letter={letter} state={couple5} /></div>)
  }

  // Набор условий для присвоения state
  function CircleComponents(letter: string, index: number, key: string) {
    if (stringValue.length === 1) {
      return <div key={key} className={`${styles.circle}`}><Circle letter={letter} state={ElementStates.Modified} /></div>
    }
    else if ((stringValue.length <= 3)) {
      if (index === 0 || index === (stringValue.length - 1)) {
        return renderCouple1(letter, key)
      } else return <div key={key} className={`${styles.circle}`}><Circle letter={letter} state={couple11} /></div>
    } else if (stringValue.length <= 5) {
      if (index === 0 || index === (stringValue.length - 1)) {
        return renderCouple1(letter, key)
      } else if (index === 1 || index === (stringValue.length - 2)) {
        return renderCouple2(letter, key)
      } else return <div key={key} className={`${styles.circle}`}><Circle letter={letter} state={couple22} /></div>
    } else if (stringValue.length <= 7) {
      if (index === 0 || index === (stringValue.length - 1)) {
        return renderCouple1(letter, key)
      } else if (index === 1 || index === (stringValue.length - 2)) {
        return renderCouple2(letter, key)
      } else if (index === 2 || index === (stringValue.length - 3)) {
        return renderCouple3(letter, key)
      } else return <div key={key} className={`${styles.circle}`}><Circle letter={letter} state={couple33} /></div>
    } else if (stringValue.length <= 9) {
      if (index === 0 || index === (stringValue.length - 1)) {
        return renderCouple1(letter, key)
      } else if (index === 1 || index === (stringValue.length - 2)) {
        return renderCouple2(letter, key)
      } else if (index === 2 || index === (stringValue.length - 3)) {
        return renderCouple3(letter, key)
      } else if (index === 3 || index === (stringValue.length - 4)) {
        return renderCouple4(letter, key)
      } else return <div key={key} className={`${styles.circle}`}><Circle letter={letter} state={couple44} /></div>
    } else if (stringValue.length <= 11) {
      if (index === 0 || index === (stringValue.length - 1)) {
        return renderCouple1(letter, key)
      } else if (index === 1 || index === (stringValue.length - 2)) {
        return renderCouple2(letter, key)
      } else if (index === 2 || index === (stringValue.length - 3)) {
        return renderCouple3(letter, key)
      } else if (index === 3 || index === (stringValue.length - 4)) {
        return renderCouple4(letter, key)
      } else if (index === 4 || index === (stringValue.length - 5)) {
        return renderCouple5(letter, key)
      }
      else return <div key={key} className={`${styles.circle}`}><Circle letter={letter} state={couple55} /></div>
    }
  }

  //меняет value у input
  function handleChangeString(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.value == "") {
      setInptValue(e.target.value)
      setIsStringValueEmpty(true)
    } else {
      setIsStringValueEmpty(false)
      setInptValue(e.target.value)
    }
  }

  //меняет строку изапускает рендер
  function handleClickString(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStringValue(Array.from(inptValue))
  }

  return (<>
    <SolutionLayout title="Строка">
      <div className={styles.main_conteiner}>
        <form className={styles.row_conteiner}
          onSubmit={(e) => handleClickString(e)}>
          <div className={styles.input_conteiner}>
            <Input value={inptValue} placeholder='Введите текст' isLimitText maxLength={11} onChange={handleChangeString}></Input>
          </div>
          {isStringValueEmpty ? <Button disabled text='Развернуть' type='submit'></Button> : <Button
            isLoader={isButtonLoader}
            text='Развернуть' type='submit'></Button>}
        </form>
      </div>
      <div className={styles.circle_conteiner}>
        {stringValue1 && stringValue1.map((letter, index: number) => CircleComponents(letter, index, shortid.generate()))}
      </div>
    </SolutionLayout>
  </>
  );
};