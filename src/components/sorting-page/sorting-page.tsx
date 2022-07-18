import React, { useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { pause, swap } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { ISortingObject } from "./utils";

export const SortingPage: React.FC = () => {

  const [arrayValue, setArrayValue] = useState(Array<ISortingObject>);
  const [typeSort, setTypeSort] = useState<string>('choice');
  const [isLoader, setIsLoader] = useState(false);

  function randomArray() {
    let array = []
    const index = (Math.floor(Math.random() * 15) + 3);
    for (let i = 0; i < index; i++) {
      array.push({
        num: (Math.round(Math.random() * 100)),
        state: ElementStates.Default
      })
    }
    setArrayValue(array)
  }

  useEffect(() => {
    randomArray()
  }, [])

  const startSort = async (direction: Direction, sortType: string) => {
    let stepCounter = 1

    if (arrayValue[0].state === 'modified') {
      setArrayValue(arrayValue.map((item: ISortingObject) => {
        item.state = ElementStates.Default;
        return item
      }))
      stepCounter = 1
    }

    setIsLoader(true)
    const tempArr = [...arrayValue]

    if (sortType === "choice") {
      while (stepCounter !== selectionSortAlgo(direction, tempArr).countSteps) {
        setArrayValue(selectionSortAlgo(direction, tempArr, stepCounter).resultArray)
        await pause(500)
        stepCounter++;
      }
    }

    else {
      while (stepCounter <= bubbleSortAlgo(direction, tempArr).countSteps) {
        setArrayValue(bubbleSortAlgo(direction, tempArr, stepCounter).resultArray)
        await pause(500)
        stepCounter++;
      }
    }

    setIsLoader(false)
  }

  const selectionSortAlgo = (
    option: Direction,
    initialArr: Array<ISortingObject>,
    step?: number
  ): { resultArray: Array<ISortingObject>; countSteps: number } => {
    const arrTemp = [...initialArr];

    arrTemp.forEach((item) => (item.state = ElementStates.Default));

    const { length } = arrTemp;

    let currentStep = 0;
    for (let i = 0; i < length; i++) {
      let swapInd = i;
      arrTemp[i].state = ElementStates.Chosen;

      currentStep++;
      if (step && step === currentStep)
        return { resultArray: arrTemp, countSteps: currentStep };

      for (let j = i + 1; j < length; j++) {
        arrTemp[j].state = ElementStates.Changing;


        currentStep++;
        if (step && step === currentStep)
          return { resultArray: arrTemp, countSteps: currentStep };
        if (
          (option === Direction.Ascending ? arrTemp[swapInd].num : arrTemp[j].num) >
          (option === Direction.Ascending ? arrTemp[j].num : arrTemp[swapInd].num)
        ) {
          arrTemp[j].state = ElementStates.Chosen;
          arrTemp[swapInd].state =
            i === swapInd ? ElementStates.Chosen : ElementStates.Default;
          swapInd = j;

          currentStep++;
          if (step && step === currentStep)
            return { resultArray: arrTemp, countSteps: currentStep };
        }
        if (j !== swapInd) arrTemp[j].state = ElementStates.Default;
      }

      if (i === swapInd) {
        arrTemp[i].state = ElementStates.Modified;

        currentStep++;
        if (step && step === currentStep)
          return { resultArray: arrTemp, countSteps: currentStep };
      }

      else {
        swap(arrTemp, i, swapInd);
        arrTemp[i].state = ElementStates.Modified;

        currentStep++;
        if (step && step === currentStep)
          return { resultArray: arrTemp, countSteps: currentStep };

        arrTemp[swapInd].state = ElementStates.Default;


        currentStep++;
        if (step && step === currentStep)
          return { resultArray: arrTemp, countSteps: currentStep };
      }
    }
    return { resultArray: arrTemp, countSteps: currentStep };
  };

  const bubbleSortAlgo = (
    option: Direction,
    initialArr: Array<ISortingObject>,
    step?: number
  ): { resultArray: Array<ISortingObject>; countSteps: number } => {

    const arr = [...initialArr];
    arr.forEach(item => (item.state = ElementStates.Default));
    const { length } = arr;

    let currentStep = 0;

    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - 1 - i; j++) {

        focusingCurrentElements(arr, j, ElementStates.Changing);
        currentStep++;
        if (step === currentStep)
          return { resultArray: arr, countSteps: currentStep };

        if (
          (option === Direction.Ascending ? arr[j].num : arr[j + 1].num) >
          (option === Direction.Ascending ? arr[j + 1].num : arr[j].num)
        ) {

          focusingCurrentElements(arr, j, ElementStates.Chosen)

          currentStep++
          if (step === currentStep)
            return { resultArray: arr, countSteps: currentStep };

          swap(arr, j, j + 1);
          arr[j].state = ElementStates.Chosen;
          arr[j + 1].state = ElementStates.Chosen;

          currentStep++;
          if (step === currentStep)
            return { resultArray: arr, countSteps: currentStep };
        }

        focusingCurrentElements(arr, j, ElementStates.Default)

      }
      arr[arr.length - 1 - i].state = ElementStates.Modified;
    }
    arr.forEach(item => (item.state = ElementStates.Modified));
    return { resultArray: arr, countSteps: currentStep };
  };

  function clickSortingAscending() {
    startSort(Direction.Ascending, typeSort)
  }

  function clickSortingDescending() {
    startSort(Direction.Descending, typeSort)
  }

  const focusingCurrentElements = (arr: Array<ISortingObject>, currentIndex: number, status: ElementStates) => {
    arr[currentIndex].state = status;
    arr[currentIndex + 1].state = status;
    if (arr[currentIndex - 1]) arr[currentIndex - 1].state = ElementStates.Default;
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.main_conteiner}>
        <form className={styles.row_conteiner}>
          <div className={styles.radio_conteiner}>
            <div className={styles.radio}><RadioInput
              checked={typeSort === "choice"}
              onChange={() => setTypeSort("choice")}
              label={"Выбор"}></RadioInput></div>
            <div className={styles.radio}><RadioInput
              checked={typeSort === "bubble"}
              onChange={() => setTypeSort("bubble")}
              label={"Пузырёк"}></RadioInput></div>
          </div>
          <div className={styles.upButton}><Button
            isLoader={isLoader}
            sorting={Direction.Ascending}
            onClick={clickSortingAscending}
            text='По возрастанию' type='button'></Button></div>
          <div className={styles.downButton}><Button
            isLoader={isLoader}
            sorting={Direction.Descending}
            onClick={clickSortingDescending}
            text='По убыванию' type='button'></Button></div>
          <div className={styles.newButton}><Button
            isLoader={isLoader}
            onClick={randomArray}
            text='Новый массив' type='button'></Button></div>
        </form>
      </div>
      <div className={styles.circle_conteiner}>
        {arrayValue && arrayValue.map((letter: ISortingObject, index) =>
          <div key={index} className={styles.column}>
            <Column index={letter.num} state={letter.state} />
          </div>
        )}
      </div>
    </SolutionLayout>
  );

}