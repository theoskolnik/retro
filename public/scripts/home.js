var CardList = React.createClass({
	renderCards() {
		if(this.props.data !== 0) {
			var cards = this.props.data;
			return (
      <ul>
        {cards.map((card, index) => {
        	return <Card key={index} id={card.id} content={card.description}/>
        })}
      </ul>
    	);
		}
	},
	render () {
		return(
			<div>
				{this.renderCards()}
			</div>
		);
	}
});

var Card = React.createClass({
	editDescription () {
		console.log("editing!");
		console.log(this);

		$.ajax({
			url: "/" + "cards/" + this.props.id,
			type: 'PUT',
			data: {data: JSON.stringify({description: "new hard coded"})},
			success: function(response) {
    		console.log("SUCCESS!");
    	}.bind(this),
    	error: function(req, status, err) {
    		console.log("FAILED!!!");
    	}
		})
	},

	render () {
		return(
			<div>
				<li className="card" key={this.props.key} id={this.props.id} onClick={this.editDescription}>{this.props.content}</li>
			</div>
		);
	}
});

var Button = React.createClass({
	handleClick () {
		this.props.handleClickCreateCard();
	},
	render () {
		return (
			<button type="button" onClick={this.handleClick}>Create Card</button>
		)
	}
});

var App = React.createClass({
	getInitialState () {
		return {
      loaded: false,
      cards: null
    };
	},

	componentDidMount () {
		$.ajax({
			url: this.props.baseUrl + "cards",
			dataType: 'json',
			type: 'GET',
			success: function(response) {
				this.setState({
					loaded: true, 
					cards: response.data
				});
			}.bind(this),
			error: function(req, status, err) {
				console.log("FAILED");
			}
		});
	},

	createCard () {
		var currentCards = this.state.cards.slice();
		var newCard = {'description': 'hard coded description'}

    $.ajax({
    	url: this.props.baseUrl + "cards",
    	type: 'POST',
    	data: {data: JSON.stringify(newCard)},
    	success: function(response) {
    		console.log("SUCCESS!");
    		console.log(response);
				var newViewCard =  <Card description={response.description} id={response.id}/>;   
    		currentCards.push(newViewCard);
    		this.setState({cards: currentCards});
    	}.bind(this),
    	error: function(req, status, err) {
    		console.log("FAILED!!!");
    	}
    });
	},

	render () {
		if(this.state.loaded) {
			return (
				<div>
					<CardList data={this.state.cards}/>
					<Button handleClickCreateCard={this.createCard}/>
				</div>
			);
		} else {
			return (
				<div>
					<Button handleClickCreateCard={this.createCard}/>
				</div>
			);
		}
	}
});

ReactDOM.render(
	<App baseUrl="/" />, 
	document.getElementById('main')
);