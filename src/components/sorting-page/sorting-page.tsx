import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stringSelector } from "../../services/slice/slice";
import { ElementStates } from "../../types/element-states";
import { InputForm } from "../input-form/input-form";
import { Column } from "../ui/column/column";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";

export const SortingPage: any = () => {

  const [arrayValue, setArrayValue] = useState(Array);

  const [test, setTest] = useState(Array);

  const [currentCircle, setCurrentCircle] = useState(ElementStates.Changing);

  const [doneCircle, setDoneCircle] = useState(ElementStates.Modified);

  const [currentIndex, setCurrentIndex] = useState(-1);

  const [searchIndex, setSearchIndex] = useState(0);

  function randomArray() {
    setCurrentIndex(-1)
    let array = []
    let index = (Math.floor(Math.random() * 15) + 3);
    for (let i = 0; i < index; i++) {
      array.push(Math.round(Math.random() * 100))

    }
    setArrayValue(array)
    let copyArray = array.slice();
    setTest(copyArray)
  }

  useEffect(() => {
    randomArray()
  }, [])

  // useEffect(() => {
  //   setCurrentIndex(currentIndex + 1)
  // }, [arrayValue])

  async function sortingUp(arr: any, currentIndex: any) {

    let n = arr.length;


    for (const item of arr) {
      for (let i = 0; i < n; i++) {
        let min = i;
        await research(i, arr, min, n)
          .then(
            result => {
              if (min != i) {
                let tmp = arr[i];
                arr[i] = arr[min];
                arr[min] = tmp;
                setArrayValue([...arr])
                a(i)
                console.log('1')
              }
            }
          )

      }
      //   .then(
      //   result => {

      //   },
      //   error => {

      //   }
      // );
    }
  }
  // async function delay() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve("result")
  //     }, 1000)
  //   })
  // }


  // async function Search() {
  //   await delay()
  //   for (let i = 0; i < n; i++) {
  //     let min = i;

  //     for (let j = i; j < n; j++) {
  //       if (arr[j] < arr[min]) {
  //         min = j;
  //       }
  //     }

  //     if (min != i) {
  //       let tmp = arr[i];
  //       arr[i] = arr[min];
  //       arr[min] = tmp;
  //       setArrayValue([...arr])
  //       a(i)
  //     }

  //   }
  // }
  // for (let i = 0; i < n; i++) {
  //   setTimeout(() => {
  //     let min = i;

  //     for (let j = i; j < n; j++) {
  //       setTimeout(() => {
  //         if (arr[j] < arr[min]) {
  //           min = j;
  //         }
  //       }, j * 1000)
  //     }

  //     if (min != i) {
  //       let tmp = arr[i];
  //       arr[i] = arr[min];
  //       arr[min] = tmp;
  //       setArrayValue([...arr])
  //       a(i)
  //     }

  //   }, (searchIndex + ((n - i) * 1000)))
  // }
  // }

  async function research(i: number, arr: { [x: string]: number; }, min: number, n: number) {
    for (let j = i; j < n; j++) {
      return new Promise((resolve, reject) => {
        setInterval(() => {
          if (j == (n - 1)) {
            resolve("result")
          }
          
          if (arr[j] < arr[min]) {
            min = j;
          }
        }, i * 1000)

      })
    }
  }

  function a(i: number) {
    setCurrentIndex(i)
  }


  function startSortingUp() {
    sortingUp(test, currentIndex)
  }


  function render(number: number, index: any) {
    // console.log(searchIndex)
    // console.log(currentIndex)
    if (currentIndex === index) {
      return (<Column key={index} extraClass={styles.colummn} index={number} state={currentCircle}></Column>)
    } else if (currentIndex > index) {
      return (<Column key={index} extraClass={styles.colummn} index={number} state={doneCircle}></Column>)
    } else {
      return (<Column key={index} extraClass={styles.colummn} index={number}></Column>)
    }
  }


  return (
    <SolutionLayout title="Сортировка массива">
      <InputForm random={randomArray} startSortingUp={startSortingUp}></InputForm>
      <div className={styles.circle_conteiner}>
        {arrayValue.map((number: any, index: number) => render(number, index))}
      </div>
    </SolutionLayout>
  );
};

