import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { pause } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { LinkedList, listItemProps } from "./utils";

export const ListPage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [indexValue, setIndexValue] = useState<string>('');
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [array, setArray] = useState(Array<listItemProps>);
  const [linkedList, setLinkedList] = useState(Object);
  const [isMaxLength, setIsMaxLength] = useState(false);
  const [isMinLength, setIsMinLength] = useState(false);

  useEffect(() => {
    if (array.length === 7) {
      setIsMaxLength(true)
    } else {
      setIsMaxLength(false)
    }
  }, [array])

  useEffect(() => {
    if (array.length === 1) {
      setIsMinLength(true)
    } else {
      setIsMinLength(false)
    }
  }, [array])

  useEffect(() => {
    //Создаем массив
    const randomStringsArray = Array.from(
      { length: 6 },
      () => Math.round(Math.random() * 100)
    );

    //Создаем инстанс класса
    const newLinkedList = new LinkedList(randomStringsArray);

    const initRenderCircle = randomStringsArray.map((item) => {
      return {
        test: item,
        state: ElementStates.Default,
      };
    });
    setLinkedList(newLinkedList);

    setArray(initRenderCircle.reverse());
  }, []);

  const addRenderPreviewCircleTop = (
    arr: Array<listItemProps>,
    index: number,
    value: string | null
  ) => {
    const firstElement = arr[index];
    arr[index] = {
      ...firstElement,
      adding: true,
      extraCircle: {
        test: value ? value : "",
      },
    };
  };

  const removeRenderPreviewCircleTop = (arr: Array<listItemProps>, index: number, listString: string) => {
    const firstElement = arr[index];
    arr[index] = {
      ...firstElement,
      adding: false,
      extraCircle: {
        test: listString ? listString : "",
      },
    };
  };

  const addRenderPreviewCircleBottom = (
    arr: Array<listItemProps>,
    index: number,
    value?: string | null
  ) => {
    const firstElement = arr[index];
    arr[index] = {
      ...firstElement,
      deleting: true,
      extraCircle: {
        test: value ? value : "",
      },
    };
  };

  const copyArr: Array<listItemProps> = [...array];

  const addToHead = async (listString: string) => {
    setIsLoader(true)
    linkedList!.addToHead(listString);
    const currentHeadValue = linkedList!.getNodeToIndex(0);

    addRenderPreviewCircleTop(copyArr, 0, currentHeadValue);

    setArray([...copyArr]);
    await pause(500);

    removeRenderPreviewCircleTop(copyArr, 0, listString);
    copyArr.unshift({
      test: currentHeadValue ? currentHeadValue : "",
      state: ElementStates.Modified,
    });

    setArray([...copyArr]);
    await pause(500);

    copyArr[0].state = ElementStates.Default;
    setArray([...copyArr]);
    await pause(500);
    setInputValue('')
    setIsLoader(false)
  };

  const removeFromHead = async () => {
    setIsLoader(true)
    const deletedElement = linkedList!.deleteHead();

    addRenderPreviewCircleBottom(copyArr, 0, deletedElement);
    setArray([...copyArr]);
    await pause(500);
    copyArr.shift();
    copyArr[0].state = ElementStates.Default;
    setArray([...copyArr]);
    await pause(500);
    setIsLoader(false)
  };

  const addToTail = async (listString: string) => {
    setIsLoader(true);
    linkedList!.addToTail(listString);
    const tailIdx = linkedList!.getSize() - 1;
    const TailValue = linkedList!.getNodeToIndex(tailIdx);

    addRenderPreviewCircleTop(copyArr, tailIdx - 1, TailValue);
    setArray([...copyArr]);
    await pause(500);
    removeRenderPreviewCircleTop(copyArr, tailIdx - 1, listString)

    copyArr[copyArr.length] = {
      ...copyArr[copyArr.length],
      test: TailValue ? TailValue : "",
      state: ElementStates.Modified,
      adding: false,
      extraCircle: undefined,
    };
    setArray([...copyArr]);
    await pause(500);

    copyArr.forEach((el: listItemProps) => (el.state = ElementStates.Default));
    setArray([...copyArr]);
    setInputValue('')
    setIsLoader(false)
    await pause(500);
  };

  const removeFromTail = async () => {
    setIsLoader(true)
    const { length } = copyArr;
    const removeElement = linkedList!.deleteTail();
    addRenderPreviewCircleBottom(copyArr, length - 1, removeElement);
    setArray([...copyArr]);
    await pause(500);
    copyArr.pop();
    copyArr[length - 2].state = ElementStates.Default;
    setArray([...copyArr]);
    setIsLoader(false)
    await pause(500);
  };

  const addToIndex = async (idx: number, listString: string) => {
    if (idx > 6) {
      return null
    }
    setIsLoader(true)
    const copyArr: Array<listItemProps> = [...array];
    linkedList!.insertFromPosition(listString, idx);
    const newValue = linkedList!.getNodeToIndex(idx);
    for (let i = 0; i <= idx!; i++) {
      copyArr[i] = {
        ...copyArr[i],
        adding: true,
        extraCircle: {
          test: newValue ? newValue : "",
        },
      };
      if (i > 0)
        copyArr[i - 1] = {
          ...copyArr[i - 1],
          adding: false,
          extraCircle: undefined,
          state: ElementStates.Changing,
        };
      setArray([...copyArr]);
      await pause(500);
    }
    copyArr[idx!] = {
      ...copyArr[idx!],
      adding: false,
      extraCircle: undefined,
    };
    copyArr.splice(idx!, 0, {
      test: newValue ? newValue : "",
      state: ElementStates.Modified,
    });
    setArray([...copyArr]);
    await pause(500);
    copyArr.forEach((el: listItemProps) => (el.state = ElementStates.Default));
    setIndexValue('')
    setIsLoader(false)
  };

  const removeToIndex = async (idx: number) => {
    setIsLoader(true)
    // const deletingValue = copyArr[idx!].test;
    const deletedElement = linkedList!.removeFromPosition(idx);
    for (let i = 0; i <= idx!; i++) {
      copyArr[i].state = ElementStates.Changing;
      if (i === idx) copyArr[i].noArrow = true;
      setArray([...copyArr]);
      await pause(500);
    }

    addRenderPreviewCircleBottom(copyArr, idx!, deletedElement)
    setArray([...copyArr]);
    await pause(500);
    copyArr.splice(idx!, 1);
    copyArr.forEach((el: listItemProps) => (el.state = ElementStates.Default));
    await pause(500);
    setArray([...copyArr]);
    setIndexValue('')
    setIsLoader(false)
  };



  return (
    <SolutionLayout title="Связный список" >
      <div className={styles.main_conteiner}>
        <form className={styles.row_conteiner1}>
          <div className={styles.up_conteiner}>
            <div className={styles.input1}>
              <Input
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setInputValue(e.target.value)
                }}
                placeholder='Введите значение' isLimitText maxLength={4}></Input>
            </div>
            <Button
              disabled={!inputValue || isMaxLength}
              onClick={() => {
                addToHead(inputValue)
              }}
              isLoader={isLoader}
              extraClass={styles.addButton1} text='Добавить в head' type='button'></Button>
            <Button
              disabled={!inputValue || isMaxLength}
              onClick={() => {
                addToTail(inputValue)
              }}
              isLoader={isLoader}
              extraClass={styles.addButton1} text='Добавить в tail' type='button'></Button>
            <Button
              disabled={isMinLength}
              onClick={() => {
                removeFromHead()
              }}
              isLoader={isLoader}
              extraClass={styles.addButton1} text='Удалить из head' type='button'></Button>
            <Button
              disabled={isMinLength}
              onClick={() => {
                removeFromTail()
              }}
              isLoader={isLoader}
              extraClass={styles.addButton1} text='Удалить из tail' type='button'></Button>
          </div>
          <div className={styles.down_conteiner}>
            <div><Input
              value={indexValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setIndexValue(e.target.value)
              }} placeholder='Введите индекс' maxLength={1}></Input></div>
            <Button
              disabled={!inputValue || !indexValue || isMaxLength}
              extraClass={styles.addButton2} onClick={() => {
                const index = Number(indexValue)
                addToIndex(index, inputValue);
              }}
              isLoader={isLoader}
              text='Добавить по индексу' type='button'></Button>
            <Button extraClass={styles.addButton2}
              disabled={!indexValue || isMinLength}
              onClick={() => {
                const index = Number(indexValue)
                removeToIndex(index);
              }}
              isLoader={isLoader}
              text='Удалить по индексу' type='button'></Button>
          </div>
        </form>
      </div>
      <div className={styles.circle_conteiner}>
        {array.map((letter: listItemProps, index: number) => {
          return (
            <div className={styles.block} key={index}>
              <Circle
                state={letter.state}
                letter={letter.test}
                index={index}
                head={index === 0 && !letter.adding && !letter.deleting ? "head" : ""}
                tail={
                  index === array.length - 1 &&
                    !letter.adding &&
                    !letter.deleting
                    ? "tail"
                    : ""
                }
              />
              {index !== array.length - 1 && (
                <ArrowIcon
                  fill={
                    letter.state === ElementStates.Changing && !letter.noArrow
                      ? "#d252e1"
                      : "#0032FF"
                  }
                />
              )}
              {letter.adding && (
                <Circle
                  extraClass={styles.upperCircle}
                  state={ElementStates.Changing}
                  letter={letter.extraCircle?.test}
                  isSmall={true}
                />
              )}
              {letter.deleting && (
                <Circle
                  extraClass={styles.lowerCircle}
                  state={ElementStates.Changing}
                  letter={letter.extraCircle?.test}
                  isSmall={true}
                />
              )}
            </div>
          );
        })}
      </div>
    </SolutionLayout >
  );
};