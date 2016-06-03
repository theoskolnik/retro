let Button = window.Button;
let Card = window.Card;
let CardList = window.CardList;

var App = React.createClass({
	getInitialState() {
		return {
			cardLists: []
		}
	},


	handleSubmit() {
		$.ajax({
    	url: this.props.baseUrl + "lists",
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
		return (
			<div className="cardListsContainer">
				<button onClick={this.handleSubmit}>Create List</button>
				{this.renderCardLists()}
			</div>
		);
	}
});


ReactDOM.render(
	<App baseUrl="/" />, 
	document.getElementById('main')
);