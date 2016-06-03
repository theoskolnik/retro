var CardList = React.createClass({
	getInitialState() {
		return {
			loaded: false,
			cards: [], 
			title: this.props.cardList.title
		}
	},

	componentDidMount() {
		this.getCards();
	},

	getCards() {
		$.ajax({
			url: this.props.baseUrl + "cards",
			dataType: 'json',
			type: 'GET',
			success: function(response) {
				this.setState({
					loaded: true, 
					cards: response.data,
					title: "hi"
				});
			}.bind(this),
			error: function(req, status, err) {
				console.log("Failed to load cards.");
			}
		});
	},

	handleSubmit() {
    $.ajax({
    	url: this.props.baseUrl + "cards",
    	type: 'POST',
    	dataType: 'json',
    	data: JSON.stringify({description: ''}),
    	success: function(response) {
    		var newCard = { 
					description: response.data.description,
					id: response.data.id
				};
				var currentCards = this.state.cards.slice();
    		currentCards.push(newCard);
    		this.setState({cards: currentCards});
    	}.bind(this),
    	error: function(req, status, err) {
    		console.error(this.props.url, status, err.toString());
    	}
    });
	},

	handleEdit(id) {
		var userInput = document.getElementById(id).value;
		
		$.ajax({
			url: "/" + "cards/" + id,
			type: 'PUT',
			data: JSON.stringify({ description: userInput }),
			success: function(response) {
				this.setState({ content: response.data });
    	}.bind(this),
    	error: function(req, status, err) {
    		console.error(this.props.url, status, err.toString());
    	}
		})
	},

	handleDelete(id) {
		$.ajax({
			url: "/cards/" + id,
			dataType: 'json',
			type: 'DELETE',
			success: function(response) {
				this.setState({ cards: response.data });
			}.bind(this),
			error: function(req, status, err) {
				console.error(this.props.url, status, err.toString());
			}
		});
	},

	renderCards() {
		if(this.state.cards.size !== 0) {
			return (
	      <ul>
	      	{this.state.cards.map(card => {
	      		return <Card key={card.id} 
	      			card={card} 
	      			handleEdit={this.handleEdit} 
	      			handleDelete={this.handleDelete} />
	      	})}
	      </ul>
    	)
		}
	},

	render() {
		if (this.state.loaded) {
			return (
				<div className="cardList">
					{this.props.cardList.title}
					{this.renderCards()}
					<Button handleSubmit={this.handleSubmit}/>
				</div>
			);
		} else {
			return (
				<div className="cardList">
					<Button handleSubmit={this.handleSubmit}/>
				</div>
			);
		}
	}
});

window.CardList = CardList;