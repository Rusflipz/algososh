import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./input-form.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { useDispatch, useSelector } from "react-redux";
import { getFibonacci, getQueue, getStack, getString, stringSelector } from "../../services/slice/slice"
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";

export const InputForm: any = (props: { delete: () => void; clear: () => void; random: () => void; startSortingUp: () => void; }) => {

    const dispatch = useDispatch();
    const { fibonacciButtonLoader, stringButtonLoader, isStackEmpty, queueSucsess, deleteQueueButton, clearQueueButton, resetArray } = useSelector(stringSelector);
    const [stringValue, setStringValue] = useState(Array);
    const [stringValue1, setStringValue1] = useState('');
    const [isStringValueEmpty, setIsStringValueEmpty] = useState(true);
    const [fibonacciValue, setFibonacciValue] = useState(Number);
    const [fibonacciValue1, setFibonacciValue1] = useState('');
    const [isFibonacciValueEmpty, setIsFibonacciValueEmpty] = useState(true);
    const [stackValue, setStackValue] = useState('');
    const [isStackValueEmpty, setIsStackValueEmpty] = useState(true);
    const [queueValue, setQueueValue] = useState('');
    const [isQueueValueEmpty, setIsQueueValueEmpty] = useState(true);
    const location = useLocation();
    console.log(location.pathname)


    //Ругается если тип FormEvent<HTMLInputElement> и все равно ругается, если тип React.ChangeEvent<HTMLInputElement>, поэтому тут any
    function handleChangeString(e: any) {
        e.preventDefault();
        if (e.target.value == "") {
            setStringValue1(e.target.value)
            setIsStringValueEmpty(true)
        } else {
            setIsStringValueEmpty(false)
            setStringValue1(e.target.value)
            setStringValue(Array.from(e.target.value))
        }
    }

    function handleChangeFibonacci(e: any) {
        e.preventDefault();
        dispatch(getFibonacci(''))
        if (e.target.value == "") {
            setIsFibonacciValueEmpty(true)
            setFibonacciValue1(e.target.value)
        } else {
            setIsFibonacciValueEmpty(false)
            setFibonacciValue(e.target.value)
            setFibonacciValue1(e.target.value)
        }
    }

    function handleChangeStack(e: any) {
        e.preventDefault();
        dispatch(getStack(''))
        if (e.target.value == "") {
            setStackValue(e.target.value)
            setIsStackValueEmpty(true)
        } else {
            setIsStackValueEmpty(false)
            setStackValue(e.target.value)
        }
    }

    function handleChangeQueue(e: any) {
        e.preventDefault();
        dispatch(getQueue(''))
        if (e.target.value == "") {
            setQueueValue(e.target.value)
            setIsQueueValueEmpty(true)
        } else {
            setIsQueueValueEmpty(false)
            setQueueValue(e.target.value)
        }
    }

    function handleClickString(e: any) {
        e.preventDefault();
        // setStringValue1('')
        // setIsStringValueEmpty(true)
        dispatch(getString(stringValue))
    }

    function handleClickFibonacci(e: any) {
        e.preventDefault();
        dispatch(getFibonacci(fibonacciValue))
    }

    function handleClickStack(e: any) {
        e.preventDefault();
        setStackValue('')
        setIsStackValueEmpty(true)
        dispatch(getStack(stackValue))
    }

    function handleClickQueue(e: any) {
        e.preventDefault();
        setQueueValue('')
        setIsQueueValueEmpty(true)
        dispatch(getQueue(queueValue))
    }

    function resetSortingArray() {
        dispatch(resetArray(resetArray + 1))
    }

    if (location.pathname === '/recursion') {
        return (<>
            <div className={styles.main_conteiner}>
                <form className={styles.row_conteiner}
                    onSubmit={(e) => handleClickString(e)}>
                    <div className={styles.input_conteiner}>
                        <Input value={stringValue1} placeholder='Введите текст' isLimitText maxLength={11} onChange={e => handleChangeString(e)}></Input>
                    </div>
                    {isStringValueEmpty ? <Button disabled text='Развернуть' type='submit'></Button> : <Button isLoader={stringButtonLoader} text='Развернуть' type='submit'></Button>}
                </form>
            </div>
        </>
        );
    } else if (location.pathname === '/fibonacci') {
        return (<>
            <div className={styles.main_conteiner}>
                <form className={styles.row_conteiner}
                    onSubmit={(e) => handleClickFibonacci(e)}>
                    <div className={styles.input_conteiner}>
                        <Input value={fibonacciValue1} placeholder='Введите текст' type="number" isLimitText max={19} onChange={e => handleChangeFibonacci(e)}></Input>
                    </div>
                    {isFibonacciValueEmpty ? <Button disabled text='Рассчитать' type='submit'></Button> : <Button isLoader={fibonacciButtonLoader} text='Рассчитать' type='submit'></Button>}
                </form>
            </div>
        </>
        );
    } else if ((location.pathname === '/stack')) {
        return (<>
            <div className={styles.main_conteiner}>
                <form className={styles.row_conteiner}
                    onSubmit={(e) => handleClickStack(e)}>
                    <div className={styles.input_conteiner}>
                        <Input value={stackValue} placeholder='Введите текст' isLimitText maxLength={4} onChange={e => handleChangeStack(e)}></Input>
                    </div>
                    <div className={styles.addButton}>{isStackValueEmpty ? <Button disabled text='Добавить' type='submit'></Button> : <Button text='Добавить' type='submit'></Button>} </div>
                    <div className={styles.deleteButton}>{isStackEmpty ? <Button disabled text='Удалить' type='button'></Button> : <Button onClick={props.delete} text='Удалить' type='button'></Button>} </div>
                    <div className={styles.clearButton}>{isStackEmpty ? <Button disabled text='Очистить' type='button'></Button> : <Button onClick={props.clear} text='Очистить' type='button'></Button>}</div>
                </form>
            </div>
        </>)
    } else if (location.pathname === '/queue') {
        return (<>
            <div className={styles.main_conteiner}>
                <form className={styles.row_conteiner}
                    onSubmit={(e) => handleClickQueue(e)}>
                    <div className={styles.input_conteiner}>
                        <Input value={queueValue} placeholder='Введите текст' isLimitText maxLength={4} onChange={e => handleChangeQueue(e)}></Input>
                    </div>
                    <div className={styles.addButton}>{isQueueValueEmpty ? <Button disabled text='Добавить' type='submit'></Button> : <Button text='Добавить' type='submit'></Button>} </div>
                    <div className={styles.deleteButton}>{!deleteQueueButton ? <Button disabled text='Удалить' type='button'></Button> : <Button onClick={props.delete} text='Удалить' type='button'></Button>} </div>
                    <div className={styles.clearButton}>{!clearQueueButton ? <Button disabled text='Очистить' type='button'></Button> : <Button onClick={props.clear} text='Очистить' type='button'></Button>}</div>
                </form>
            </div>
        </>)
    } else if (location.pathname === '/sorting') {
        return (<>
            <div className={styles.main_conteiner}>
                <form className={styles.row_conteiner}
                // onSubmit={(e) => handleClickQueue(e)}
                >
                    <div className={styles.radio_conteiner}>
                        <div className={styles.radio}><RadioInput label={"Выбор"}></RadioInput></div>
                        <div className={styles.radio}><RadioInput label={"Пузырёк"}></RadioInput></div>
                    </div>
                    <div className={styles.upButton}><Button sorting={Direction.Ascending} onClick={props.startSortingUp} text='По возрастанию' type='button'></Button></div>
                    <div className={styles.downButton}><Button sorting={Direction.Descending} text='По убыванию' type='button'></Button></div>
                    <div className={styles.newButton}><Button onClick={props.random} text='Новый массив' type='button'></Button></div>
                </form>
            </div>
        </>)
    } else if (location.pathname === '/list') {
        return (<>
            <div className={styles.main_conteiner}>
                <form className={styles.row_conteiner1}
                // onSubmit={(e) => handleClickQueue(e)}
                >
                    <div className={styles.up_conteiner}>
                        <div className={styles.input1}>
                            <Input placeholder='Введите значение' isLimitText maxLength={4}></Input>
                        </div>
                        <Button extraClass={styles.addButton1} text='Добавить в head' type='button'></Button>
                        <Button extraClass={styles.addButton1} text='Добавить в tail' type='button'></Button>
                        <Button extraClass={styles.addButton1} text='Удалить из head' type='button'></Button>
                        <Button extraClass={styles.addButton1} text='Удалить из tail' type='button'></Button>
                    </div>
                    <div className={styles.down_conteiner}>
                        <div><Input placeholder='Введите индекс'></Input></div>
                        <Button extraClass={styles.addButton2} text='Добавить по индексу' type='button'></Button>
                        <Button extraClass={styles.addButton2} text='Удалить по индексу' type='button'></Button>
                    </div>
                </form>
            </div>
        </>)
    } else return <></>
};
