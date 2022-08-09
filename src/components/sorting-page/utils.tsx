import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils/utils";

export interface ISortingObject {
    num: number;
    state: ElementStates;
}

export const selectionSortAlgo = (
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


export const bubbleSortAlgo = (
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

  const focusingCurrentElements = (arr: Array<ISortingObject>, currentIndex: number, status: ElementStates) => {
    arr[currentIndex].state = status;
    arr[currentIndex + 1].state = status;
    if (arr[currentIndex - 1]) arr[currentIndex - 1].state = ElementStates.Default;
  }