import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InputForm } from "../input-form/input-form"
import { useDispatch, useSelector } from "react-redux";
import { doStringButtonLoader, doStringButtonNormal, doStringFalse, getString, stringSelector } from "../../services/slice/slice";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import shortid from "shortid";

export const StringComponent: React.FC = () => {

  const dispatch = useDispatch();

  const { string, stringSucsess } = useSelector(stringSelector);

  const [stringValue, setStringValue] = useState(Array);
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

  useEffect(() => {
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
    setStringValue(string);
    let score = Math.floor(string.length / 2)
    if (string.length > 1) {
      dispatch(doStringButtonLoader())
    }
    if (string.length > 0) {
      let arr = string.slice()
      for (let i = 0; i < score; i++) {
        reverse(arr, score, i)
      }
    }
  }, [string])

  useEffect(() => {
    return () => {
      let arr: React.SetStateAction<unknown[]> = [];
      setStringValue(arr)
      dispatch(doStringFalse());
      dispatch(doStringButtonNormal())
      dispatch(getString(arr))
    }
  }, [])

  function reverse(arr: any[], score: number, i: number) {
    setTimeout(function () {
      if (i === (score - 1)) {
        dispatch(doStringButtonNormal())
      }
      arr.splice(i, 1, string[(string.length - 1) - i])
      arr.splice((arr.length - 1) - i, 1, string[i])
      render(i, ...arr)
    }, 1000 * (i + 1));
  }

  function render(i: number, ...arr: any[]) {
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
    setStringValue(arr)
  }

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

  function CircleComponents(letter: string, index: number, key: string) {
    if (string.length === 1) {
      return <div key={key} className={`${styles.circle}`}><Circle letter={letter} state={ElementStates.Modified} /></div>
    }
    else if ((string.length <= 3)) {
      if (index === 0 || index === (string.length - 1)) {
        return renderCouple1(letter, key)
      } else return <div key={key} className={`${styles.circle}`}><Circle letter={letter} state={couple11} /></div>
    } else if (string.length <= 5) {
      if (index === 0 || index === (string.length - 1)) {
        return renderCouple1(letter, key)
      } else if (index === 1 || index === (string.length - 2)) {
        return renderCouple2(letter, key)
      } else return <div key={key} className={`${styles.circle}`}><Circle letter={letter} state={couple22} /></div>
    } else if (string.length <= 7) {
      if (index === 0 || index === (string.length - 1)) {
        return renderCouple1(letter, key)
      } else if (index === 1 || index === (string.length - 2)) {
        return renderCouple2(letter, key)
      } else if (index === 2 || index === (string.length - 3)) {
        return renderCouple3(letter, key)
      } else return <div key={key} className={`${styles.circle}`}><Circle letter={letter} state={couple33} /></div>
    } else if (string.length <= 9) {
      if (index === 0 || index === (string.length - 1)) {
        return renderCouple1(letter, key)
      } else if (index === 1 || index === (string.length - 2)) {
        return renderCouple2(letter, key)
      } else if (index === 2 || index === (string.length - 3)) {
        return renderCouple3(letter, key)
      } else if (index === 3 || index === (string.length - 4)) {
        return renderCouple4(letter, key)
      } else return <div key={key} className={`${styles.circle}`}><Circle letter={letter} state={couple44} /></div>
    } else if (string.length <= 11) {
      if (index === 0 || index === (string.length - 1)) {
        return renderCouple1(letter, key)
      } else if (index === 1 || index === (string.length - 2)) {
        return renderCouple2(letter, key)
      } else if (index === 2 || index === (string.length - 3)) {
        return renderCouple3(letter, key)
      } else if (index === 3 || index === (string.length - 4)) {
        return renderCouple4(letter, key)
      } else if (index === 4 || index === (string.length - 5)) {
        return renderCouple5(letter, key)
      }
      else return <div key={key} className={`${styles.circle}`}><Circle letter={letter} state={couple55} /></div>
    }
  }

  return (<>
    <SolutionLayout title="Строка">
      <InputForm></InputForm>
      <div className={styles.circle_conteiner}>
        {stringSucsess && stringValue.map((letter: any, index: number) => CircleComponents(letter, index, shortid.generate()))}
      </div>
    </SolutionLayout>
  </>
  );
};