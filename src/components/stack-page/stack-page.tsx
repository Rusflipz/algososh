import React, { useEffect, useState } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { IStackObject, Stack } from "./utils";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { IStack } from "./utils";
import { pause } from "../../utils/utils";

export const StackPage: React.FC = () => {
  const stackInstanse = new Stack<string>();
  const [inputValue, setInputValue] = useState(String);
  const [renderValues, setRenderValues] = useState<Array<IStackObject>>([]);
  const [stackValues, setStackValues] = useState<IStack<string>>(stackInstanse);
  const [isStackFull, setIsStackFull] = useState(false);
  const [isStackEmpty, setIsStackEmpty] = useState(true);
  const [inProgress, setInProgress] = useState(false);

  //проверяем пустой ли стек
  useEffect(() => {
    if (renderValues.length > 0) {
      setIsStackEmpty(false)
    } else {
      setIsStackEmpty(true)
    }
  }, [renderValues])

  //Проверяем не переполнен ли
  useEffect(() => {
    if (renderValues.length >= 10) {
      setIsStackFull(true)
    } else {
      setIsStackFull(false)
    }
  }, [renderValues])

  //очищаем всё при размонтировании
  useEffect(() => {
    return () => {
      resetInput()
      clearStack()
    }
  }, [])

  //Добавляем значение
  const PushStack = async () => {
    setInProgress(true);
    stackValues.push(inputValue);
    const newElement = stackValues.peak();
    renderValues.push({
      letter: newElement,
      state: ElementStates.Changing,
      head: "top",
    });
    setRenderValues([...renderValues]);
    await pause(500);
    renderValues[renderValues.length - 1].state = ElementStates.Default;
    setRenderValues([...renderValues]);
    resetInput();
    setInProgress(false);
  };

  //Удаляем значение из стека
  const PopStack = async () => {
    setInProgress(true);
    stackValues!.pop();
    const size = stackValues.getSize();
    if (size !== 0) {
      renderValues[renderValues.length - 1].state = ElementStates.Changing;
      renderValues[renderValues.length - 1].head = "top";
      setRenderValues([...renderValues]);
      renderValues.pop();
      await pause(500);
      setRenderValues([...renderValues]);
    } else {
      setRenderValues([]);
    }
    setInProgress(false);
  };

  //Сбрасывем инпут
  const resetInput = () => {
    setInputValue("");
  }

  //Очичаем стек
  function clearStack() {
    setRenderValues([])
  }


  //Запуск добавления в стек
  function handleClickStack(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    PushStack()
  }

  //изменения инпута
  function handleChangeStack(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInputValue(e.target.value)
  }

  function renderCircle(elem: IStackObject, index: number) {
    if (index === renderValues.length - 1) {
      return <div key={index} className={`${styles.circleMain}`}>
        <Circle index={index} letter={elem.letter} head={'top'} state={elem.state} />
      </div>
    } else {
      return <div key={index} className={`${styles.circleMain}`}>
        <Circle index={index} letter={elem.letter} state={elem.state} />
      </div>
    }
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.main_conteiner}>
        <form className={styles.row_conteiner}
          onSubmit={(e) => handleClickStack(e)}
        >
          <div className={styles.input_conteiner}>
            <Input
              value={inputValue}
              placeholder='Введите текст' isLimitText maxLength={4}
              onChange={handleChangeStack}
            ></Input>
          </div>
          <div className={styles.addButton}><Button isLoader={inProgress} disabled={!inputValue || isStackFull} text='Добавить' type='submit'></Button></div>
          <div className={styles.deleteButton}><Button isLoader={inProgress} disabled={isStackEmpty} onClick={PopStack} text='Удалить' type='button'></Button></div>
          <div className={styles.clearButton}><Button isLoader={inProgress} disabled={isStackEmpty} onClick={clearStack} text='Очистить' type='button'></Button></div>
        </form>
      </div>
      <div className={styles.circle_conteiner}>
        {renderValues.map((elem, index) => renderCircle(elem, index))
        }
      </div>
    </SolutionLayout>
  );
};
