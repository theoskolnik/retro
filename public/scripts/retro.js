var Retro = React.createClass({
	getInitialState() {
		return {
			loaded: false,
			cardLists: []
		}
	},

	componentDidMount() {
		if(this.state.cardLists.size !== 0) {
			this.getCardLists();
		}
	},

	getCardLists() {
		$.ajax({
			url: this.props.baseUrl + "/lists",
			dataType: 'json',
			type: 'GET',
			success: function(response) {
				this.setState({
					loaded: true, 
					cardLists: response.data,
				});
			}.bind(this),
			error: function(req, status, err) {
				console.log("Failed to load cards.");
			}
		});
	},

	handleSubmit() {
		$.ajax({
    	url: this.props.baseUrl + "/lists",
    	type: 'POST',
    	dataType: 'json',
    	data: JSON.stringify({title: 'CardList title'}),
    	success: function(response) {
    		var newCardList = { 
					title: response.data.title,
					id: response.data.id
				};
				var currentCardLists = this.state.cardLists.slice();
    		currentCardLists.push(newCardList);
    		this.setState({cardLists: currentCardLists});
    	}.bind(this),
    	error: function(req, status, err) {
    		console.error(this.props.url, status, err.toString());
    	}
    });
	},

	renderCardLists() {
		if(this.state.cardLists.size !== 0) {
			return (
				<ul>
					{this.state.cardLists.map(cardList => {
						return <CardList key={cardList.id}
							cardList={cardList}
							baseUrl="/" />

					})}
				</ul>
			);
		}
	},

	render() {
		if(this.state.loaded) {
			return (
				<div className="cardListsContainer">
					<button onClick={this.handleSubmit}>Create List</button>
					{this.renderCardLists()}
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