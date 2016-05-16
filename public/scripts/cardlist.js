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

window.CardList = CardList;