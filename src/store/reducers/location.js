import * as actionTypes from '../actions/actionTypes';
const initialState = {
    location:''
}




const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.CHANGE_URL:return{location:action.location};
        default: return state;
    }
}


export default reducer;