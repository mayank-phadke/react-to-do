import React from 'react';
import { Button, Card, Col, Container, Form, FormControl, InputGroup, Jumbotron } from 'react-bootstrap';
import TodoCard from './TodoCard'

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

	uniqueId = 0;

	constructor(props) {
		super(props);
		this.state = {
			newTodo: "",
			todoList: [],
			selectedFlag: false,
			completedFlag: false
		}

		// create a reference for the input so we can focus on it later
		this.newTodoRef = React.createRef();

		this.checkSelectedCompleted.bind(this);
	}

	componentDidMount() {
		// focus on the input when the page loads
		this.newTodoRef.current.focus();
	}

	addTodo(e) {

		// check for empty input
		if(this.state.newTodo.trim() === "") {
			return;
		}

		// create new card with given label
		let card = {
			title: this.state.newTodo,
			checked: false,
			edit: false,
			complete: false,
			id: this.uniqueId++
		}

		// add card to the list
		this.state.todoList.push(card);

		// update state and set input as empty
		this.setState({todoList: this.state.todoList, newTodo: ""});

		// focus on the input
		this.newTodoRef.current.focus();
	}

	newTodoTextChange(e) {
		this.setState({newTodo: e.target.value});
	}

	toggleSelectAll(e) {
		let newList = []
		this.state.todoList.forEach((todoObj) => {
			todoObj.checked = e.target.checked;
			newList.push(todoObj);
		});
		this.setState({todoList: newList});
		this.checkSelectedCompleted();
	}

	onSelectChange(id, value) {
		let newObj = this.state.todoList.find((todo) => {
			return todo.id === id
		});

		if(newObj === undefined) {
			console.log("obj is undefined");
			return;
		}

		let index = this.state.todoList.indexOf(newObj);
		if(index === -1) {
			console.log("index in -1: Object not found in array");
			return;
		}

		newObj.checked = value;
		this.state.todoList.splice(index, 1, newObj);
		this.setState({todoList: this.state.todoList});
		this.checkSelectedCompleted();
	}

	onDelete(id) {
		// find the object in array
		let delObj = this.state.todoList.find((todo) => {
			return todo.id === id
		});

		if(delObj === undefined) {
			console.log("obj is undefined");
			return;
		}

		// find and check the index of the object
		let index = this.state.todoList.indexOf(delObj);
		if(index === -1) {
			console.log("index in -1: Object not found in array");
			return;
		}

		// delete 1 object at 'index'
		this.state.todoList.splice(index, 1);
		this.setState({todoList: this.state.todoList});
		this.checkSelectedCompleted();
	}

	onEdit(id) {
		let newObj = this.state.todoList.find((todo) => {
			return todo.id === id
		});

		if(newObj === undefined) {
			console.log("obj is undefined");
			return;
		}

		let index = this.state.todoList.indexOf(newObj);
		if(index === -1) {
			console.log("index in -1: Object not found in array");
			return;
		}

		newObj.edit = true;
		this.state.todoList.splice(index, 1, newObj);
		this.setState({todoList: this.state.todoList});
	}

	saveEdit(id, value) {
		let newObj = this.state.todoList.find((todo) => {
			return todo.id === id;
		});

		if(newObj === undefined) {
			console.log("obj is undefined");
			return;
		}

		let index = this.state.todoList.indexOf(newObj);
		if(index === -1) {
			console.log("index in -1: Object not found in array");
			return;
		}

		newObj.title = value;
		newObj.edit = false;
		this.state.todoList.splice(index, 1, newObj);
		this.setState({todoList: this.state.todoList});
	}

	cancelEdit(id) {
		let newObj = this.state.todoList.find((todo) => {
			return todo.id === id
		});

		if(newObj === undefined) {
			console.log("obj is undefined");
			return;
		}

		let index = this.state.todoList.indexOf(newObj);
		if(index === -1) {
			console.log("index in -1: Object not found in array");
			return;
		}

		newObj.edit = false;
		this.state.todoList.splice(index, 1, newObj);
		this.setState({todoList: this.state.todoList});
	}

	checkSelectedCompleted() {
		let selectedFlag = this.state.todoList.some((todo) => {
			return todo.checked === true;
		})

		let completedFlag = this.state.todoList.some((todo) => {
			return todo.complete === true;
		})

		this.setState({
			selectedFlag: selectedFlag,
			completedFlag: completedFlag
		});
	}

	deleteSelected() {
		let indexList = [];
		this.state.todoList.forEach((todo, index) => {
			if(todo.checked === true) {
				indexList.push(index)
			}
		})

		indexList.sort((a, b) => b-a).forEach((index) => {
			this.state.todoList.splice(index, 1);
		})

		this.setState(this.state.todoList);
		this.checkSelectedCompleted();
	}

	completeToggle(id, value) {
		let newObj = this.state.todoList.find((todo) => {
			return todo.id === id;
		});

		if(newObj === undefined) {
			console.log("obj is undefined");
			return;
		}

		let index = this.state.todoList.indexOf(newObj);
		if(index === -1) {
			console.log("index in -1: Object not found in array");
			return;
		}

		newObj.complete = value;
		this.state.todoList.splice(index, 1, newObj);
		this.setState({todoList: this.state.todoList});
		this.checkSelectedCompleted();
	}

	completeSelected() {
		let indexList = [];
		this.state.todoList.forEach((todo, index) => {
			if(todo.checked === true) {
				indexList.push(index)
			}
		})

		indexList.forEach((index) => {
			let newObj = this.state.todoList[index];
			newObj.complete = true;
			this.state.todoList.splice(index, 1, newObj);
		})

		this.setState(this.state.todoList);
		this.checkSelectedCompleted();
	}

	incompleteSelected() {
		let indexList = [];
		this.state.todoList.forEach((todo, index) => {
			if(todo.checked === true) {
				indexList.push(index)
			}
		})

		indexList.forEach((index) => {
			let newObj = this.state.todoList[index];
			newObj.complete = false;
			this.state.todoList.splice(index, 1, newObj);
		})

		this.setState(this.state.todoList);
		this.checkSelectedCompleted();
	}

	deleteCompleted() {
		let indexList = [];
		this.state.todoList.forEach((todo, index) => {
			if(todo.complete === true) {
				indexList.push(index)
			}
		})

		indexList.sort((a, b) => b-a).forEach((index) => {
			this.state.todoList.splice(index, 1);
		})

		this.setState(this.state.todoList);
		this.checkSelectedCompleted();
	}

	handleKeyPress(e) {
		// check if enter pressed
		if(e.charCode !== 13) {
			return;
		}

		this.addTodo(e);
	}

	render() {
		return (
			<div className="App pb-5">
				<div className="text-center mb-2 bg-dark text-light py-4 mb-4">
					<h1>To-Do List</h1>
					Developed By: <a className="text-light" href="https://mayank-phadke.github.io/"><u>Mayank Phadke</u></a>
				</div>
				<Container fluid>
					<InputGroup>
						<FormControl
							ref={this.newTodoRef}
							type="text"
							placeholder="Add New Task"
							className="p-2"
							value={this.state.newTodo}
							onChange={this.newTodoTextChange.bind(this)}
							onKeyPress={this.handleKeyPress.bind(this)} />
						<InputGroup.Append>
							<Button variant="success" onClick={this.addTodo.bind(this)}>Add</Button>
						</InputGroup.Append>
					</InputGroup>
				</Container>
				<Container fluid className="mt-3">
					{
						this.state.todoList.length > 0 ?
							<Card className="mb-2">
								<Card.Body className="py-1">
									<Form inline>
										<Col xs={1}>
											<Form.Check
												className="mr-4"
												onChange={this.toggleSelectAll.bind(this)} />
										</Col>
										<Button
											variant="success"
											size="sm"
											className="text-light mr-2 ml-4 ml-sm-0"
											disabled={!this.state.selectedFlag}
											onClick={this.completeSelected.bind(this)}
										>
											<i className="fa fa-check-circle"/> <span className="d-none d-sm-inline">Complete</span>
										</Button>
										<Button
											variant="warning"
											size="sm"
											className="text-light mr-2"
											disabled={!this.state.selectedFlag}
											onClick={this.incompleteSelected.bind(this)}
										>
											<i className="fa fa-times-circle"/> <span className="d-none d-sm-inline">Incomplete</span>
										</Button>
										<Button
											variant="danger"
											size="sm"
											className="text-light"
											disabled={!this.state.selectedFlag}
											onClick={this.deleteSelected.bind(this)}
										>
											<i className="fa fa-trash-alt"/> <span className="d-none d-sm-inline">Delete</span>
										</Button>
										<Button
											variant="info"
											size="sm"
											className="text-light ml-auto d-none d-sm-inline"
											disabled={!this.state.completedFlag}
											onClick={this.deleteCompleted.bind(this)}
										>
											<i className="fa fa-eye-slash"/> <span className="d-none d-sm-inline">Delete Completed</span>
										</Button>
									</Form>
								</Card.Body>
							</Card>
							:
							<Card className="py-5">
								<div className="d-flex justify-content-center">
									<em>Add a TODO item to start</em>
								</div>
							</Card>
					}
					{
						this.state.todoList.map((obj) =>
							<TodoCard
								title={obj.title}
								checked={obj.checked}
								key={obj.id}
								id={obj.id}
								edit={obj.edit}
								complete={obj.complete}
								onSelectChange={this.onSelectChange.bind(this)}
								onDelete={this.onDelete.bind(this)}
								onEdit={this.onEdit.bind(this)}
								onSave={this.saveEdit.bind(this)}
								onCancel={this.cancelEdit.bind(this)}
								onComplete={this.completeToggle.bind(this)} />
						)
					}
				</Container>
			</div>
		);
	}
}

export default App;
