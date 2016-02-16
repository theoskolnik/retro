
var Card = React.createClass({
	renderCards() {
		console.log(this.props.data);
		if(this.props.data !== 0) {
			var cards = this.props.data;
			
			return (
      <ol>
        {cards.map((card, index) => {
        	console.log("loop" +card);
          return <li className="card" key={index}>{card.anything}</li>;
        })}
      </ol>
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

	createCard () {
		var newArray = this.state.cards.slice();    
    newArray.push(<Card/>);   
    this.setState({cards:newArray})
	},

	render () {
		return (
			<div>
				<Card data={this.state.cards}/>
				<Button handleClickCreateCard={this.createCard}/>
			</div>
		);
	}
});

ReactDOM.render(
	<App url="/" />, 
	document.getElementById('main')
);