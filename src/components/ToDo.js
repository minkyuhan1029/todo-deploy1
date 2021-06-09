import React from 'react';
import SingleToDo from './SingleToDo'
import FilterButton from './FilterButton'
import {connect} from 'react-redux'
import {fetchErrands, addErrandDB, updateErrandDB, deleteErrandDB} from '../store/errand'

const filterOpt = {
  All: () => true,
  Active: errand => !errand.isDone,
  Completed: errand => errand.isDone
}

class ToDo extends React.Component{
  constructor(){
    super()
    this.state = {
      content: '',
      isDone: false,
      filter: 'All',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.setFilter=this.setFilter.bind(this)
  }
  componentDidMount(){
    this.props.fetchErrands();
  }

  handleChange(event){
    this.setState({
      content: event.target.value
    })
  }
  handleEnter(event){
    if(event.key === 'Enter'){
      this.props.addErrand(this.state)
      this.setState({
        content: ''
      })
    }
  }
  handleDone(id, update){
    this.props.updateErrand(id,update)
  }
  handleDelete(id){
    this.props.deleteErrand(id)
  }
  numOfTasks(){
    return this.props.errand.all.filter((errand)=>!errand.isDone).length
  }
  setFilter(string){
    this.setState({
        filter: string
      })
  }
  handleAllDone(){
    this.props.errand.all.map((errand)=>this.handleDone(errand.id, {'isDone' : !this.state.isDone}))
    this.setState({
      isDone: !this.state.isDone
    })
  }


  render(){
    const filterButtons = Object.keys(filterOpt).map(filter => (<FilterButton key={filter} name={filter} setFilter={this.setFilter} pressed={filter===this.state.filter}/>))
    return(
      <div className='container'>
        <div className = 'chevron-container'>
        <button type='button' className='button-chevron' onClick= {()=>this.handleAllDone()}></button>
        <input
        className = "input-add"
        type='text' value = {this.state.content} onChange = {this.handleChange} onKeyDown = {this.handleEnter}/>
        </div>
        <div className='todo-list'>
          {this.props.errand.all.filter(filterOpt[this.state.filter]).map((errand) => <SingleToDo key = {errand.id} err={errand} handleDone = {this.handleDone} handleDelete = {this.handleDelete} updateErrand={this.props.updateErrand}/> )}
        </div>
        <div className="bottom-container">
        <div id = 'counter'>{this.numOfTasks()} {this.numOfTasks() > 1 ? 'items' : 'item'} left</div>
        <div className ='filters'>
          {filterButtons}
        </div>
        <div className='button-clear-completed'>
          {this.props.errand.all.filter((errand)=> errand.isDone).length > 0 ? <button type="button" onClick={()=>this.props.errand.all.filter((errand)=>errand.isDone).map((errand)=>this.handleDelete(errand.id))}>Clear Completed</button> : <button className ="button-invisible"> </button>}
        </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    errand: state.errand,
    count: state.count
  }
}
const mapDispatch = dispatch => ({
  fetchErrands: () => dispatch(fetchErrands()),
  addErrand: (errand) => dispatch(addErrandDB(errand)),
  updateErrand: (id, update) => dispatch(updateErrandDB(id, update)),
  deleteErrand: (id) => dispatch(deleteErrandDB(id)),
})
export default connect(mapState,mapDispatch)(ToDo)
