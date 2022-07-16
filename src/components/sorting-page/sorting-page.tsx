import { AnyCnameRecord } from "dns";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stringSelector } from "../../services/slice/slice";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { InputForm } from "../input-form/input-form";
import { Column } from "../ui/column/column";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { setInProgress } from "../../services/slice/slice";

export const SortingPage: any = () => {

  const dispatch = useDispatch()

  const { typeSort } = useSelector(stringSelector);

  const [arrayValue, setArrayValue] = useState(Array<any>);

  function randomArray() {
    let array = []
    let index = (Math.floor(Math.random() * 15) + 3);
    for (let i = 0; i < index; i++) {
      array.push({
        num: (Math.round(Math.random() * 100)),
        state: ElementStates.Default
      })
    }
    setArrayValue(array)
    let copyArray = array.slice();
  }

  useEffect(() => {
    randomArray()
  }, [])

  const startSort = async (direction: any, sortType: string) => {
    let stepCounter = 1

    if (arrayValue[0].state === 'modified') {
      setArrayValue(arrayValue.map((item: any) => {
        item.state = ElementStates.Default;
        return item
      }))
      stepCounter = 1
    }

    dispatch(setInProgress(true));
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

    dispatch(setInProgress(false));
  }

  const selectionSortAlgo = (
    option: Direction,
    initialArr: any[],
    step?: number
  ): { resultArray: any[]; countSteps: number } => {
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
    initialArr: any,
    step?: number
  ): { resultArray: any; countSteps: number } => {

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

  const swap = (arr: Array<any>, left: number, right: number) => {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp
  }

  const pause = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  function clickSortingAscending() {
    startSort('ascending', typeSort)
  }

  function clickSortingDescending() {
    startSort('descending', typeSort)
  }

  const focusingCurrentElements = (arr: any, currentIndex: number, status: ElementStates) => {
    arr[currentIndex].state = status;
    arr[currentIndex + 1].state = status;
    if (arr[currentIndex - 1]) arr[currentIndex - 1].state = ElementStates.Default;
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <InputForm random={randomArray} clickSortingAscending={clickSortingAscending} clickSortingDescending={clickSortingDescending}></InputForm>
      <div className={styles.circle_conteiner}>
        {arrayValue && arrayValue.map((letter: any, index: number) =>
          <div key={index} className={styles.column}>
            <Column index={letter.num} state={letter.state} />
          </div>
        )}
      </div>
    </SolutionLayout>
  );

}