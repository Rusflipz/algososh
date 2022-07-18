import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { pause } from "../../utils/utils";
import { IStackObject } from "../stack-page/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Queue, QueueObject } from "./utils";
import { IQueue } from "./utils";

export const QueuePage: React.FC = () => {

  //Создаем инстанс
  const queueInstanse = new Queue<string>(7);

  //Создаем стартовый рендер
  const renderDefault: IStackObject[] = Array.from({ length: 7 }, () => ({
    letter: "",
    state: ElementStates.Default,
  }));

  // Стейты
  const [inputValue, setInputValue] = useState<string>("");
  const [renderValues, setRenderValues] = useState<QueueObject[]>(renderDefault);
  const [queue, setQueue] = useState<IQueue<string>>(queueInstanse); //стейт инстанса класса
  const [inProgress, setInProgress] = useState<boolean>(false);

  const tempArr = [...renderValues];

  //Добавить в очередь
  const enqueue = async () => {
    setInProgress(true);
    queue.enqueue(inputValue);
    if (queue.isEmpty()) {
    }

    //Получаем индексы
    const currentHead = queue.getHead();
    const currentTail = queue.getTail();

    //Получаем значения
    const valueHead = queue.getValue(currentHead);
    const valueTail = queue.getValue(currentTail);
    tempArr[currentTail].state = ElementStates.Changing;
    tempArr[currentTail].letter = inputValue;
    setRenderValues([...tempArr]);
    await pause(500);

    //Заполняем массив объектами
    tempArr[currentHead].letter = valueHead;
    tempArr[currentHead].head = "head";
    if (currentTail > 0) {
      tempArr[currentTail - 1].tail = "";
      tempArr[currentTail].letter = valueTail;
    }
    tempArr[currentTail].letter = valueTail;
    tempArr[currentTail].tail = "tail";
    tempArr[currentTail].state = ElementStates.Default;
    setRenderValues([...tempArr]);
    resetInput(); setInProgress(false);
    await pause(500);
  };

  //Удалить из очереди
  const dequeue = async () => {
    setInProgress(true);
    // Проверяем схлопнулся ли массив
    const head = queue.getHead();
    const tail = queue.getTail();
    if (head === tail) clearQueue();
    else {
      let currentHead = queue.getHead();
      tempArr[currentHead].state = ElementStates.Changing;
      await pause(500);
      queue.dequeue()
      let currentHead1 = queue.getHead();
      if (currentHead1 > 0) {
        tempArr[currentHead1 - 1].head = "";
        tempArr[currentHead1 - 1].letter = "";
      }
      setRenderValues([...tempArr]);
      tempArr[currentHead1].letter = queue.getValue(currentHead1);
      tempArr[currentHead1].head = "head";
      setRenderValues([...tempArr]);
      tempArr[currentHead].state = ElementStates.Default;
    }

    setInProgress(false);
  };

  //Очистить очередь
  const clearQueue = () => {
    queue.clear()
    setRenderValues([...renderDefault]);
  };

  //Сброс инпута
  const resetInput = () => {
    setInputValue("");
  };

  function renderCircle(element: any, index: any) {
    console.log()
    return <div key={index} className={`${styles.circle}`}>
      <Circle index={index} letter={element.letter} head={element.head} tail={element.tail} state={element.state} />
    </div>
  }

  function handleChangeQueue(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInputValue(e.target.value)
  }

  function handleClickQueue(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    enqueue()
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.main_conteiner}>
        <form className={styles.row_conteiner}
          onSubmit={(e) => handleClickQueue(e)}>
          <div className={styles.input_conteiner}>
            <Input value={inputValue} placeholder='Введите текст' isLimitText maxLength={4} onChange={handleChangeQueue}></Input>
          </div>
          <div className={styles.addButton}>
            <Button isLoader={inProgress} disabled={!inputValue} text='Добавить' type='submit'></Button>
          </div>
          <div className={styles.deleteButton}><Button
            isLoader={inProgress}
            onClick={dequeue}
            disabled={queue.isEmpty()}
            text='Удалить' type='button'></Button></div>
          <div className={styles.clearButton}><Button
            onClick={clearQueue}
            isLoader={inProgress}
            disabled={queue.isEmpty()}
            text='Очистить' type='button'></Button></div>
        </form>
      </div>
      <div className={styles.circle_conteiner}>
        {renderValues.map((letter: any, index: number) => renderCircle(letter, index))
        }
      </div>
    </SolutionLayout>
  );
};
