import axios from 'axios'
const link = 'https://todo-dbbe.herokuapp.com/todos'

/* Action Types */
const GET_ERRANDS = 'GET_ERRANDS'
const ADD_ERRAND = 'ADD_ERRAND'
const UPDATE_ERRAND = 'UPDATE_ERRAND'
const DELETE_ERRAND = 'DELETE_ERRAND'

/* Initial State */
const INITIAL_STATE = {all:[]}

/* Action Creators */
const getErrands = errands => ({type:GET_ERRANDS, errands})
const addErrand = errand => ({type:ADD_ERRAND, errand})
const updateErrand = errand => ({type:UPDATE_ERRAND, errand})
const deleteErrand = errand => ({type:DELETE_ERRAND, errand})

export const fetchErrands = () => {
  return async dispatch => {
    try{
      const {data} = await axios.get(link)
      dispatch(getErrands(data))
    }
    catch(err){
      console.log(err)
    }
  }
}

export const addErrandDB = (errand) => {
  return async dispatch => {
    try{
      const {data} = await axios.post(link, errand)
      dispatch(addErrand(data))
    }
    catch(err){
      console.log(err)
    }
  }
}

export const updateErrandDB = (errandID, update) => {
  return async dispatch => {
    try{
      const {data} = await axios.put(link+`/${errandID}`, update)
      dispatch(updateErrand(data))
    }
    catch(err){
      console.log(err)
    }
  }
}

export const deleteErrandDB = (errandID) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(link+`/${errandID}`)
      dispatch(deleteErrand(data))
    }
    catch(err){
      console.log(err)
    }
  }
}

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case GET_ERRANDS:
      return {
        all: action.errands
      }
    case ADD_ERRAND:
      return {
        all: [...state.all, action.errand]
      }
    case UPDATE_ERRAND:
      return {
        all: state.all.map((element)=> {
          if(element.id === action.errand.id) return action.errand
          return element
        })
      }
    case DELETE_ERRAND:
      console.log('action', action)
      return {
        all: state.all.filter((element) => element.id !== action.errand.id)
      }
    default:
      return state
  }
}
