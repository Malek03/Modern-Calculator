
import './App.css'
import {useReducer} from "react";
import DigiButton from "./Components/DigitButton.jsx";
import OperationButton from "./Components/OperationButton.jsx";

export const ACTIONS={
    ADD_DIGIT:'add-digit',
    CHOOSE_OPERATION:'choose-operation',
    DELETE_DIGIT:'delete-digit',
    EVALUATE:'evalute',
    CLEAR:'clear',
}
function reducer(state, {type,payload}){
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if(state.overwrite){//if the user want to make opreation after the sum
                return{
                    ...state,
                    currentOperand:payload.digit,
                    overwrite:false,
                }
            }
            if(payload.digit ==="0" && state.currentOperand==="0")return state;
            if(payload.digit ==="." && state.currentOperand.includes("."))return state;
            return {
                ...state,
                currentOperand: `${state.currentOperand || ''}${payload.digit}`
            }
        case ACTIONS.CHOOSE_OPERATION:
            if(state.currentOperand==null && state.previousOperand==null){
                return state;
            }
            if(state.currentOperand==null){// if the User Want To Change The Opreation Before The Enter Onther Number
                return{
                    ...state,
                    operation:payload.operation,
                }
            }
            if(state.previousOperand==null){
                return {
                    ...state,
                    operation:payload.operation,
                    previousOperand:state.currentOperand,
                    currentOperand:null
                }
            }
            return{
                ...state,
                previousOperand:evalute(state),
                operation:payload.operation,
                currentOperand:null
            }
        case ACTIONS.CLEAR:
            return{}
        case ACTIONS.EVALUATE:
            if(state.operation==null||state.currentOperand==null||state.previousOperand==null){
                return state;
            }
            return{
                ...state,
                overwrite:true,
                previousOperand:null,
                operation:null,
                currentOperand:evalute(state)
            }
        case ACTIONS.DELETE_DIGIT:
            if(state.overwrite){
                return {
                    ...state,
                    overwrite:false,
                    currentOperand:null
                }
            }
            if(state.currentOperand==null)return state;
            if(state.currentOperand.length==1){
                return{
                    ...state,
                    currentOperand:null,
                }
            }
            return {
                ...state,
                currentOperand:state.currentOperand.slice(0,-1)
            }

    }
}
const INTGER_FORMATER=new Intl.NumberFormat("en-US",{
    maximumFractionDigits:0,
})
function formatDigit(operand){
    if(operand==null)return
    const [intger,decimal]=operand.split('.');
    if(decimal==null)return INTGER_FORMATER.format(intger)
    return `${INTGER_FORMATER.format(intger)}.${decimal}`
}
function  evalute({currentOperand,previousOperand,operation}){
    const prev=parseFloat(previousOperand)
    const current=parseFloat(currentOperand)
    if(isNaN(current)||isNaN(prev))return ""
    let computation=0
    switch (operation){
        case "+":
            computation=prev +current
            break
        case "-":
            computation=prev -current
            break
        case "*":
            computation=prev *current
            break
        case "/":
            computation=prev/current
            break

    }
    return computation.toString();
}
function App() {
    const [{currentOperand,previousOperand,operation},dispatch]=useReducer(reducer,{})
  return (
    <div className="calculator-grid">
        <div className="output">
            <div className="previous-operand">{formatDigit(previousOperand)}{operation}</div>
            <div className="current-operand">{formatDigit(currentOperand)}</div>
        </div>
        <button className="span-two" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
        <button onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
        <OperationButton operation='/' dispatch={dispatch}/>
        <DigiButton digit="1" dispatch={dispatch}/>
        <DigiButton digit="2" dispatch={dispatch}/>
        <DigiButton digit="3" dispatch={dispatch}/>
        <OperationButton operation='*' dispatch={dispatch}/>
        <DigiButton digit="4" dispatch={dispatch}/>
        <DigiButton digit="5" dispatch={dispatch}/>
        <DigiButton digit="6" dispatch={dispatch}/>
        <OperationButton operation='+' dispatch={dispatch}/>
        <DigiButton digit="7" dispatch={dispatch}/>
        <DigiButton digit="8" dispatch={dispatch}/>
        <DigiButton digit="9" dispatch={dispatch}/>
        <OperationButton operation='-' dispatch={dispatch}/>
        <DigiButton digit="." dispatch={dispatch}/>
        <DigiButton digit="0" dispatch={dispatch}/>
        <button className="span-two" onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>
    </div>
  )
}

export default App
