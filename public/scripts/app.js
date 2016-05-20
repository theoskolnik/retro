let Button = window.Button;
let Card = window.Card;
let CardList = window.CardList;

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
				console.log("Failed to load cards.");
			}
		});
	},

	createCard () {
		var newCard = {description: ''};

    $.ajax({
    	url: this.props.baseUrl + "cards",
    	type: 'POST',
    	data: JSON.stringify(newCard),
    	success: function(response) {
    		var parsedResponse = JSON.parse(response);
    		var savedCard = { 
					description: parsedResponse.description,
					id: parsedResponse.id
				};
				var currentCards = this.state.cards.slice();
    		currentCards.push(savedCard);
    		this.setState({cards: currentCards});
    	}.bind(this),
    	error: function(req, status, err) {
    		console.log("Failed to create card.");
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