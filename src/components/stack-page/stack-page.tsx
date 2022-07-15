import React, { useEffect, useState } from "react";
import styles from "./stack-page.module.css";
import { InputForm } from "../input-form/input-form";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useDispatch, useSelector } from "react-redux";
import { doStackEmpty, doStackFalse, doStackFull, getStack, stringSelector } from "../../services/slice/slice";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {

  const dispatch = useDispatch();

  const { stack, stackSucsess } = useSelector(stringSelector);

  const [arrayValue, setArrayValue] = useState(Array);
  const [lastCircle, setLastCircle] = useState(ElementStates.Default);

  useEffect(() => {
    if (arrayValue.length > 0) {
      dispatch(doStackFull())
    } else {
      dispatch(doStackEmpty())
    }
  }, [arrayValue])

  useEffect(() => {
    if (stack != '') {
      if (arrayValue.length < 6) {
        let arr = arrayValue.slice()
        arr.push(stack)
        render(...arr)
      } else {
        let arr = arrayValue.slice()
        render(...arr)
      }

    }
  }, [stack])

  useEffect(() => {
    return () => {
      dispatch(doStackFalse());
      dispatch(getStack(''));
      clearStack()
    }
  }, [])

  function render(...arr: any) {
    setLastCircle(ElementStates.Changing)
    setArrayValue(arr)
    setTimeout(function () {
      setLastCircle(ElementStates.Default)
    }, 500)
  }

  function renderCircle(letter: string, index: any) {
    if (index === (arrayValue.length - 1)) {
      return <div key={index} className={`${styles.circle}`}><Circle index={index} letter={letter} head={'top'} state={lastCircle} /></div>
    } else {
      return <div key={index} className={`${styles.circle}`}><Circle index={index} letter={letter} /></div>
    }
  }

  function deleteStack() {
    setLastCircle(ElementStates.Changing)
    setTimeout(function () {
      let arr = arrayValue.slice()
      arr.pop()
      setArrayValue(arr)
      setLastCircle(ElementStates.Default)
    }, 500)
  }

  function clearStack() {
    let arr: never[] = []
    render(...arr)
  }

  return (
    <SolutionLayout title="Стек">
      <InputForm delete={deleteStack} clear={clearStack}></InputForm>
      <div className={styles.circle_conteiner}>
        {stackSucsess && arrayValue.map((letter: any, index: number) => renderCircle(letter, index))
        }
      </div>
    </SolutionLayout>
  );
};
