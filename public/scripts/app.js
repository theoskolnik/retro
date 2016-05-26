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
		this.getCards();
	},

	getCards () {
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

	render () {
		if (this.state.loaded) {
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