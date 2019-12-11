import {REPORTS} from '../../data/dummy-data';

const initialState = {
    email:"default",
    farmId: null,
    password:"",
    reports: [{id:'c1', title:'Italian', color:'#f5428d'}],
    users:[]
}

const userReducer = (state = initialState,action)=>{
    if(action.type == "login"){
        state.email = action.email
        state.farmId=action.farmId

    } 
    if(action.type=="signup"){
        state.email = action.email
        state.password = action.password
    }
    return state;
}

export default userReducer