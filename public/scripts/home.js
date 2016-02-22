var CardList = React.createClass({
	renderCards() {
		if(this.props.data !== 0) {
			var cards = this.props.data;
			return (
      <ul>
        {cards.map((card, index) => {
        	return <Card key={index} content={card.description}/>
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
	render () {
		return(
			<div>
				<li className="card" key={this.props.key}>{this.props.content}</li>
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
		var newCard =  <Card key={currentCards.length + 1} 
												 description="hard coded description"/>;   
    currentCards.push(newCard);


    $.ajax({
    	url: this.props.baseUrl + "cards",
    	type: 'POST',
    	data: {data: JSON.stringify(newCard)},
    	success: function(response) {
    		console.log("SUCCESS!");
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