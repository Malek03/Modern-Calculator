import {ACTIONS} from "../App.jsx";
const DigiButton=({dispatch,digit})=>{
    return (
        <button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit}})}>{digit}</button>
    )
}
export default DigiButton;