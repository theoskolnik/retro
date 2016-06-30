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
			url: "/lists/" + this.props.cardList.id + "/cards",
			dataType: 'json',
			type: 'GET',
			success: function(response) {
				this.setState({
					loaded: true, 
					cards: response.data,
					title: "hi"
				});
				console.log("these are the current cards: " + this.state.cards);
			}.bind(this),
			error: function(req, status, err) {
				console.log("Failed to load cards.");
			}
		});
	},

	handleSubmit() {
    $.ajax({
    	url: this.props.baseUrl + "lists/" + this.props.cardList.id + "/cards",
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
			url: "/cards/" + id,
			dataType: 'json',
			type: 'PUT',
			data: JSON.stringify({ description: userInput }),
			success: function(response) {
				this.setState({ content: response.data.content });
    	}.bind(this),
    	error: function(req, status, err) {
    		console.error(this.props.url, status, err.toString());
    	}
		})
	},

	handleDelete(cardId) {
		$.ajax({
			url: "/cards/" + cardId,
			type: 'DELETE',
			success: function(response) {
				var currentCards = this.state.cards;
				for (var i = 0; i < currentCards.length; i++) {
					if(currentCards[i].id == cardId) {
						currentCards.splice(i, 1);
					}
				}
				this.setState({ cards: currentCards })
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
					<Button handleSubmit={this.handleSubmit} />
				</div>
			);
		} else {
			return (
				<div className="cardList">
					<Button handleSubmit={this.handleSubmit} />
				</div>
			);
		}
	}
});

window.CardList = CardList;