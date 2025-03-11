import {ACTIONS} from "../App.jsx";

const OperationButton=({operation,dispatch})=>{
    return(
        <button onClick={()=>dispatch({type:ACTIONS.CHOOSE_OPERATION,payload:{operation}})}>{operation}</button>
    );
}
export default  OperationButton;