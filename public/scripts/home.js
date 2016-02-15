
var Card = React.createClass({
	render: function() {
		return(
			<div>
				This is a card.
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
      cards: []
    };
	},

	renderCards() {
		if(this.state.cards) {
			return this.state.cards.map((card) => {
				return (
					<ul>
						<li>
							This is the card: {card}
						</li>
					</ul>)
			});
		}
	},

	createCard () {
		var newArray = this.state.cards.slice();    
    newArray.push(new Card());   
    this.setState({cards:newArray})
	},

	render: function() {
		return (
			<div>
				<Button handleClickCreateCard={this.createCard}/>
			</div>
		);
	}
});

ReactDOM.render(
	<App url="/" />, 
	document.getElementById('main')
);

