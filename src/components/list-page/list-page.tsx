import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListString, stringSelector } from "../../services/slice/slice";
import { ElementStates } from "../../types/element-states";
import { InputForm } from "../input-form/input-form";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";

export const ListPage: any = () => {

  const dispatch = useDispatch();

  const [inProgress, setInProgress] = useState<boolean>(false);
  const [array, setArray] = useState<any>([]);
  const [linkedList, setLinkedList] = useState<any>([]);

  useEffect(() => {
    const randomStringsArray = Array.from(
      { length: 6 },
      () => Math.round(Math.random() * 100)
    );

    const newLinkedList = new LinkedList<any>(randomStringsArray);

    const initRenderCircle: any = randomStringsArray.map((item) => {
      return {
        test: item,
        state: ElementStates.Default,
      };
    });
    setLinkedList(newLinkedList);

    setArray(initRenderCircle.reverse());
  }, []);

  const addRenderPreviewCircleTop = (
    arr: any,
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

  const removeRenderPreviewCircleTop = (arr: any, index: number, listString: any) => {
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
    arr: any,
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

  const copyArr: any = [...array];

  const addToHead = async (listString: any) => {
    setInProgress(true)
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
    dispatch(setListString(""))
    setInProgress(false)
  };

  const removeFromHead = async () => {
    setInProgress(true)
    const deletedElement = linkedList!.deleteHead();

    addRenderPreviewCircleBottom(copyArr, 0, deletedElement);
    setArray([...copyArr]);
    await pause(500);
    copyArr.shift();
    copyArr[0].state = ElementStates.Default;
    setArray([...copyArr]);
    await pause(500);
    setInProgress(false)
  };

  const addToTail = async (listString: any) => {
    setInProgress(true);
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

    copyArr.forEach((el: any) => (el.state = ElementStates.Default));
    setArray([...copyArr]);
    await pause(500);
    dispatch(setListString(""))
  };

  const removeFromTail = async () => {
    setInProgress(true)
    const { length } = copyArr;
    const removeElement = linkedList!.deleteTail();
    addRenderPreviewCircleBottom(copyArr, length - 1, removeElement);
    setArray([...copyArr]);
    await pause(500);
    copyArr.pop();
    copyArr[length - 2].state = ElementStates.Default;
    setArray([...copyArr]);
    await pause(500);
    setInProgress(false)

  };

  const addToIndex = async (idx: number, listString: any) => {
    setInProgress(true)
    const copyArr: any = [...array];
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

    copyArr.forEach((el: any) => (el.state = ElementStates.Default));
    dispatch(setListString(""))
    setInProgress(false)
  };

  const removeToIndex = async (idx: number) => {
    setInProgress(true)
    const deletingValue = copyArr[idx!].test;
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
    copyArr.forEach((el: any) => (el.state = ElementStates.Default));

    setArray([...copyArr]);
    await pause(500);
    setInProgress(false)
  };

  const pause = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  class LinkedList<T> {
    head: Node<T> | null = null;
    tail: Node<T> | null = null;
    size: number;

    constructor(initArr: T[]) {
      this.head = null;
      this.size = 0;
      initArr?.forEach((item) => this.insertFromPosition(item, 0));
    }

    addToHead = (value: T) => {
      let node = new Node<T>(value);
      if (!this.head) {
        this.head = node;
        return this;
      }
      node.next = this.head;
      this.head = node;
      this.size++;
      return this;
    };

    addToTail(value: T) {
      let node = new Node(value);
      if (this.size === 0) {
        console.log(this.head)
        this.head = node;
      }
      let currentNode = this.head;
      while (currentNode && currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      if (currentNode) currentNode.next = node
      this.size++;
    }

    deleteHead() {
      if (!this.head) return null;
      let deletedHead = this.head;

      if (this.head.next) {
        this.head = this.head.next;
      } else {
        this.head = null;
        this.tail = null;
      }
      this.size--;
      return deletedHead ? deletedHead.value : null;
    }

    deleteTail() {
      if (this.size === 0) {
        return null;
      }

      let currentNode = this.head;
      let prev = null;
      let currentIndex = 0;
      while (currentIndex < this.size - 1 && currentNode) {
        prev = currentNode;
        currentNode = currentNode.next;
        currentIndex++;
      }
      if (prev && currentNode) prev.next = currentNode.next;
      this.size--;
      return currentNode ? currentNode.value : null;
    }

    insertFromPosition(value: T, index: number) {
      if (index < 0 || index > this.size) {
        return null;
      }

      let node = new Node<T>(value);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let current = this.head;
        let currentIndex = 0;
        let prev = null;
        while (currentIndex < index && current) {
          prev = current;
          current = current.next;
          currentIndex++;
        }
        if (prev) prev.next = node;
        node.next = current;
      }
      this.size++
    }

    removeFromPosition(index: number) {
      if (index < 0 || index > this.size) {
        return null;
      }

      let curr = this.head;

      if (index === 0 && curr) {
        this.head = curr.next;
      } else {
        let prev = null;
        let currIndex = 0;

        while (currIndex < index && curr) {
          prev = curr;
          curr = curr.next;
          currIndex++;
        }

        if (prev && curr) prev.next = curr.next;
      }

      this.size--;
      return curr ? curr.value : null;
    }

    getNodeToIndex(index: number) {
      let current = this.head;
      let currentIndex = 0;

      while (currentIndex < index && current) {
        current = current.next;
        currentIndex++;
      }
      return current ? current.value : null;
    }

    getSize() {
      return this.size;
    }
  }

  class Node<T> {
    value: T;
    next: Node<T> | null;
    constructor(value: T, next?: Node<T> | null) {
      this.value = value;
      this.next = next === undefined ? null : next;
    }
  }



  return (
    <SolutionLayout title="Связный список" >
      <InputForm addToHead={addToHead} addToTail={addToTail} removeFromHead={removeFromHead} removeFromTail={removeFromTail} addToIndex={addToIndex} removeToIndex={removeToIndex}></InputForm>
      <div className={styles.circle_conteiner}>
        {array.map((letter: any, index: any) => {
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