var Retro = React.createClass({
	getInitialState() {
		return {
			loaded: false,
			lists: []
		}
	},

	componentDidMount() {
		if(this.state.lists.size !== 0) {
			this.getLists();
		}
	},

	getLists() {
		$.ajax({
			url: this.props.baseUrl + "/lists",
			dataType: 'json',
			type: 'GET',
			success: function(response) {
				this.setState({
					loaded: true, 
					lists: response.data,
				});
			}.bind(this),
			error: function(req, status, err) {
				console.log("Failed to load lists.");
			}
		});
	},

	handleEdit(id) {
		var userInput = document.getElementById(id).value;
		
		$.ajax({
			url: "/lists/" + id,
			dataType: 'json',
			type: 'PUT',
			data: JSON.stringify({ title: userInput }),
			success: function(response) {
				this.setState({ title: response.data.title });
    	}.bind(this),
    	error: function(req, status, err) {
    		console.error(this.props.url, status, err.toString());
    	}
		})
	},

	handleSubmit() {
		$.ajax({
    	url: this.props.baseUrl + "/lists",
    	type: 'POST',
    	dataType: 'json',
    	data: JSON.stringify({title: 'Click to set title'}),
    	success: function(response) {
    		var newList = { 
					title: response.data.title,
					id: response.data.id
				};
				var currentLists = this.state.lists.slice();
    		currentLists.push(newList);
    		this.setState({lists: currentLists});
    	}.bind(this),
    	error: function(req, status, err) {
    		console.error(this.props.url, status, err.toString());
    	}
    });
	},

	renderLists() {
		if(this.state.lists.size !== 0) {
			return (
				<ul>
					{this.state.lists.map(list => {
						return <List key={list.id}
							list={list}
							handleEdit={this.handleEdit}
							baseUrl="/" />

					})}
				</ul>
			);
		}
	},

	render() {
		if(this.state.loaded) {
			return (
				<div className="listsContainer">
					<button onClick={this.handleSubmit}>Create List</button>
					{this.renderLists()}
				</div>
			);
		} else {
			return (
				<div className="cardListsContainer">
					<button onClick={this.handleSubmit}>Create List</button>
				</div>
			);
		}
	}
});

window.Retro = Retro;