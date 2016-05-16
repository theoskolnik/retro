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