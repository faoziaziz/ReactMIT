/*
	Latihan menggunakan React
*/

import React, { Component } from 'react';
import './App.css';


const list = [
{
	title: 'CBGL',
	url: 'https://foziaziz.herokuapp.com',
	author: 'Aziz Faozi',
	num_comments: 3,
	points: 4,
	objectID: 0,
},
{
	title: 'facebook',
	url: 'https://facebook.com/phaoziaziz',
	author: 'Aziz Amerul Faozi',
	num_comments: 2,
	points: 5,
	objectID: 1,
},
];

function isSearched(searchTerm){
	return function(item){
		// some condition which returns true or false
		return item.title.toLowerCase().includes(searchTerm.toLowerCase());
	}
}
// App class 

class App extends Component {

	constructor(props){
		super(props);
		this.state={
			list: list,
			searchTerm:'',
		};
		this.onSearchChange=this.onSearchChange.bind(this);
		this.onDismiss=this.onDismiss.bind(this);

	}
	onSearchChange(event)
	{
		this.setState({searchTerm: event.target.value});
	}

/*percoban 1

	onDismiss(id){
		function isNotId(item){
		return item.objectID !==id;
		}
		const updatedList =this.state.list.filter(isNotId);
	}
	*/
	/*
	onDismiss(id){
		const isNotId=item=>item.objectID!==id;
		const updatedList= this.staete.list.filter(isNotId);
	}
	*/
	/*
	onDismiss(id){
		const updatedList=this.state.list.filter(item=>item.objectID!==id);
	}*/
	onDismiss(id){
		const isNotId=item=> item.objectID!==id;
		const updatedList=this.state.list.filter(isNotId);
		this.setState({list: updatedList});
	}
	render() {
		const{searchTerm, list}=this.state;
		return (
			<div className="App">
				<Search 
					value={searchTerm}
					onChange={this.onSearchChange}>
					Search
				</Search>
				<Table 
					list={list}
					pattern={searchTerm}
					onDismiss={this.onDismiss}
				/>

				
				

      </div>
    );
  }
}

class Search extends Component{
	//const{value, onChange, children}=this.props;
	render(){
		const{value, onChange, children}=this.props;
		return (
			<form>
			{children}<input 
					type="text"
					value={value}
					onChange={onChange}
				/>
			</form>
		);
	}
}

class Table extends Component{
	render(){
		const{list, pattern, onDismiss}=this.props;
		return(
			<div>
				{list.filter(isSearched(pattern)).map(item=>
					<div key={item.objectID}>
						<span>
							<a href={item.url}>{item.title}</a>
						</span>
						<span>{item.author}</span>
						<span>{item.num_comments}</span>
						<span>{item.points}</span>
						<span>
							<button 
							onClick={()=>onDismiss(item.objectID)}
							type="button"
							>
							Dismiss
							</button>
						</span>
					</div>
					)}
			</div>
		);
	}
}
export default App;
