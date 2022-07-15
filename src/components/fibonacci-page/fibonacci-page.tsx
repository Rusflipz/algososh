import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doFibonacciButtonLoader, doFibonacciButtonNormal, doFibonacciFalse, getFibonacci, stringSelector } from "../../services/slice/slice";
import { InputForm } from "../input-form/input-form";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {

  const dispatch = useDispatch();

  const { fibonacci, fibonacciSucsess } = useSelector(stringSelector);
  const [stringValue, setStringValue] = useState(Array);

  useEffect(() => {
    if (fibonacci == '') {

    } else {
      setStringValue([1])
      fib(fibonacci)
      dispatch(doFibonacciButtonLoader())
    }
  }, [fibonacci])

  useEffect(() => {
    return () => {
      dispatch(doFibonacciFalse());
      dispatch(getFibonacci(''));
    }
  }, [])

  function fib(n: number) {
    let array = [1]
    if (n == 2) {
      setTimeout(function () {
        array.push(1)
        render(...array)
      }, 500)

    } else {
      array = [1]
      setTimeout(function () {
        array.push(1)
        render(...array)
      }, 500)
      let a = 1;
      let b = 1;
      for (let i = 2; i <= n; i++) {
        setTimeout(function () {
          if (i == n) {
            dispatch(doFibonacciButtonNormal())
          }
          let c = a + b;
          a = b;
          b = c;
          array.push(c)
          render(...array)
        }, 500 * (i - 1))
      }
    }
  }

  function render(...array: any) {
    setStringValue(array)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <InputForm></InputForm>
      <div className={styles.circle_conteiner}>
        {fibonacciSucsess && stringValue.map((letter: any, index: number) => <div key={index} className={`${styles.circle}`}><Circle index={index} letter={letter} /></div>)
        }
      </div>
    </SolutionLayout>
  );
};
