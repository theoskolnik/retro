var CardList = React.createClass({
	getInitialState () {
		return {
			cards: this.props.data
		}
	},

	componentWillReceiveProps (newProps) {
		if (this.props.data !== newProps.data) {
			this.setState({cards: newProps.data});
		}
	},

	renderCards() {
		if(this.state.cards !== 0) {
			var cards = this.state.cards;
			return (
      <ul>
        {cards.map((card, index) => {
        	return <Card key={index} 
        							 id={card.id} 
        							 content={card.description} 
        							 deleteCard={this.deleteCard}
  							 />
        })}
      </ul>
    	);
		}
	},

	deleteCard (id) {
		$.ajax({
			url: "/cards/" + id,
			dataType: 'json',
			type: 'DELETE',
			success: function(response) {
				this.setState({cards: response.data});
			}.bind(this),
			error: function(req, status, err) {
				console.error(this.props.url, status, err.toString());
			}
		});
	},

	render () {
		return(
			<div className="cardList">
				{this.renderCards()}
			</div>
		);
	}
});

window.CardList = CardList;