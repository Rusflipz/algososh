// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import styles from "./input-form.module.css";
// import { Button } from "../ui/button/button";
// import { Input } from "../ui/input/input";
// import { RadioInput } from "../ui/radio-input/radio-input";
// import { Direction } from "../../types/direction";
import React, { useState } from "react";
const a = []
// export const InputForm: any = (props: { delete: () => void; clear: () => void; random: () => void; clickSortingAscending: () => void; clickSortingDescending: () => void; addToIndex: (indexValue: any, listValue: any) => void; removeToIndex: (indexValue: any, listValue: any) => void; addToHead: (listValue: any) => void; addToTail: (listString: any) => void; removeFromHead: () => void; removeFromTail: () => void; }) => {

//     const [queueValue, setQueueValue] = useState('');
//     const [isQueueValueEmpty, setIsQueueValueEmpty] = useState(true);
//     const [indexValue, setIndexValue] = useState('');
//     const [listValue, setListValue] = useState('');
//     const location = useLocation();

//     //Ругается если тип FormEvent<HTMLInputElement> и все равно ругается, если тип React.ChangeEvent<HTMLInputElement>, поэтому тут any

//     function handleChangeQueue(e: any) {
//         e.preventDefault();
//         // dispatch(getQueue(''))
//         if (e.target.value == "") {
//             setQueueValue(e.target.value)
//             setIsQueueValueEmpty(true)
//         } else {
//             setIsQueueValueEmpty(false)
//             setQueueValue(e.target.value)
//         }
//     }

//     function handleClickQueue(e: any) {
//         e.preventDefault();
//         setQueueValue('')
//         setIsQueueValueEmpty(true)
//         // dispatch(getQueue(queueValue))
//     }

//     // if (location.pathname === '/queue') {
//     //     return (<>
//     //         <div className={styles.main_conteiner}>
//     //             <form className={styles.row_conteiner}
//     //                 onSubmit={(e) => handleClickQueue(e)}>
//     //                 <div className={styles.input_conteiner}>
//     //                     <Input value={queueValue} placeholder='Введите текст' isLimitText maxLength={4} onChange={e => handleChangeQueue(e)}></Input>
//     //                 </div>
//     //                 <div className={styles.addButton}>{isQueueValueEmpty ? <Button disabled text='Добавить' type='submit'></Button> : <Button text='Добавить' type='submit'></Button>} </div>
//     //                 <div className={styles.deleteButton}>{!deleteQueueButton ? <Button disabled text='Удалить' type='button'></Button> : <Button onClick={props.delete} text='Удалить' type='button'></Button>} </div>
//     //                 <div className={styles.clearButton}>{!clearQueueButton ? <Button disabled text='Очистить' type='button'></Button> : <Button onClick={props.clear} text='Очистить' type='button'></Button>}</div>
//     //             </form>
//     //         </div>
//     //     </>)
//     // } else
//     if (location.pathname === '/sorting') {
//         return (<>
//             <div className={styles.main_conteiner}>
//                 <form className={styles.row_conteiner}
//                 // onSubmit={(e) => handleClickQueue(e)}
//                 >
//                     <div className={styles.radio_conteiner}>
//                         <div className={styles.radio}><RadioInput checked={typeSort === "choice"} onChange={() => dispatch(setTypeSort("choice"))} label={"Выбор"}></RadioInput></div>
//                         <div className={styles.radio}><RadioInput checked={typeSort === "bubble"} onChange={() => dispatch(setTypeSort("bubble"))} label={"Пузырёк"}></RadioInput></div>
//                     </div>
//                     <div className={styles.upButton}><Button isLoader={isLoader} sorting={Direction.Ascending} onClick={props.clickSortingAscending} text='По возрастанию' type='button'></Button></div>
//                     <div className={styles.downButton}><Button isLoader={isLoader} sorting={Direction.Descending} onClick={props.clickSortingDescending} text='По убыванию' type='button'></Button></div>
//                     <div className={styles.newButton}><Button isLoader={isLoader} onClick={props.random} text='Новый массив' type='button'></Button></div>
//                 </form>
//             </div>
//         </>)
//     } else if (location.pathname === '/list') {
//         return (<>
//             <div className={styles.main_conteiner}>
//                 <form className={styles.row_conteiner1}
//                 // onSubmit={(e) => handleClickQueue(e)}
//                 >
//                     <div className={styles.up_conteiner}>
//                         <div className={styles.input1}>
//                             <Input value={listValue} onChange={(e: any) => {
//                                 setListValue(e.target.value)
//                             }} placeholder='Введите значение' isLimitText maxLength={4}></Input>
//                         </div>
//                         <Button onClick={() => {
//                             // dispatch(setListString(listValue));
//                             props.addToHead(listValue)
//                         }} extraClass={styles.addButton1} text='Добавить в head' type='button'></Button>
//                         <Button onClick={() => {
//                             // dispatch(setListString(listValue))
//                             props.addToTail(listValue)
//                         }} extraClass={styles.addButton1} text='Добавить в tail' type='button'></Button>
//                         <Button onClick={() => {
//                             props.removeFromHead()
//                         }} extraClass={styles.addButton1} text='Удалить из head' type='button'></Button>
//                         <Button onClick={() => {
//                             props.removeFromTail()
//                         }} extraClass={styles.addButton1} text='Удалить из tail' type='button'></Button>
//                     </div>
//                     <div className={styles.down_conteiner}>
//                         <div><Input value={index} onChange={(e: any) => {
//                             setIndexValue(e.target.value)
//                         }} placeholder='Введите индекс' maxLength={1}></Input></div>
//                         <Button extraClass={styles.addButton2} onClick={() => {
//                             props.addToIndex(indexValue, listValue);

//                         }} text='Добавить по индексу' type='button'></Button>
//                         <Button extraClass={styles.addButton2}
//                             onClick={() => {
//                                 props.removeToIndex(indexValue, listString);
//                             }} text='Удалить по индексу' type='button'></Button>
//                     </div>
//                 </form>
//             </div>
//         </>)
//     } else return <></>
// };
