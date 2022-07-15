import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearQueueButtonActive, clearQueueButtonDisable, deleteQueueButtonActive, deleteQueueButtonDisable, stringSelector } from "../../services/slice/slice";
import { ElementStates } from "../../types/element-states";
import { InputForm } from "../input-form/input-form";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";

export const QueuePage: React.FC = () => {

  const dispatch = useDispatch();

  const { queue, queueSucsess } = useSelector(stringSelector);

  const [arrayValue, setArrayValue] = useState(['', '', '', '', '', '', '']);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [deleteIndex, setDeleteIndex] = useState(0);

  const [currentCircle, setCurrentCircle] = useState(ElementStates.Default);
  const [deleteCircle, setDeleteCircle] = useState(ElementStates.Default);

  useEffect(() => {
    setCurrentIndex(0)
  }, [])

  useEffect(() => {
    if (deleteIndex >= currentIndex) {
      dispatch(deleteQueueButtonDisable())
    }
  }, [deleteIndex])

  useEffect(() => {
    return () => {
      let arr = ['', '', '', '', '', '', ''];
      setArrayValue(arr)
      setDeleteIndex(0)
      setCurrentIndex(0)
      dispatch(deleteQueueButtonDisable())
      dispatch(clearQueueButtonDisable())
    }
  }, [])

  useEffect(() => {
    if (currentIndex < 7 && queue != '') {
      dispatch(deleteQueueButtonActive())
      dispatch(clearQueueButtonActive())
      setCurrentCircle(ElementStates.Changing)
      let arr = arrayValue.slice()
      arr.splice(currentIndex, 1, queue);
      setTimeout(function () {
        setCurrentCircle(ElementStates.Default)
        setArrayValue(arr)
        setCurrentIndex(currentIndex + 1)
      }, 500)
    } else {

    }
  }, [queue])

  function renderCircle(letter: string, index: any) {
    // console.log(deleteIndex)
    // console.log(currentIndex)
    if (index == (currentIndex - 1) && index == deleteIndex) {
      return <div key={index} className={`${styles.circle}`}><Circle index={index} letter={letter} head={'head'} tail={'tail'} state={deleteCircle} /></div>
    } else if (index == currentIndex) {
      return <div key={index} className={`${styles.circle}`}><Circle index={index} letter={letter} state={currentCircle} /></div>
    } else if (index == currentIndex && index == deleteIndex) {
      return <div key={index} className={`${styles.circle}`}><Circle index={index} letter={letter} head={'head'} tail={'tail'} state={deleteCircle} /></div>
    } else if (index == deleteIndex) {
      return <div key={index} className={`${styles.circle}`}><Circle index={index} letter={letter} head={'head'} state={deleteCircle} /></div>
    } else if (index == (currentIndex - 1)) {
      if (letter != "") {
        return <div key={index} className={`${styles.circle}`}><Circle index={index} letter={letter} tail={'tail'} /></div>
      } else {
        return <div key={index} className={`${styles.circle}`}><Circle index={index} letter={letter} head={'head'} /></div>
      }
    } else {
      return <div key={index} className={`${styles.circle}`}><Circle index={index} letter={letter} /></div>
    }
  }

  function deleteQueue() {
    setDeleteCircle(ElementStates.Changing)
    setTimeout(function () {
      let arr = arrayValue.slice()
      arr.splice(deleteIndex, 1, '');
      setArrayValue(arr)
      setDeleteCircle(ElementStates.Default)
      setDeleteIndex(deleteIndex + 1)
    }, 500)
  }

  function clearQueue() {
    let arr = ['', '', '', '', '', '', ''];
    setArrayValue(arr)
    setDeleteIndex(0)
    setCurrentIndex(0)
    dispatch(deleteQueueButtonDisable())
    dispatch(clearQueueButtonDisable())
  }

  return (
    <SolutionLayout title="Очередь">
      <InputForm delete={deleteQueue} clear={clearQueue}></InputForm>
      <div className={styles.circle_conteiner}>
        {arrayValue.map((letter: any, index: number) => renderCircle(letter, index))
        }
      </div>
    </SolutionLayout>
  );
};
