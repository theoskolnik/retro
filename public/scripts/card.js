var Card = React.createClass({
	getInitialState() {
		return {
      content: this.props.card.description
    };
	},

	editCard() {
		this.props.handleEdit(this.props.card.id);
	},

	destroyCard () {
		console.log("destroy card: " + this.props.card.id);
		this.props.handleDelete(this.props.card.id);
	},

	render () {
		return(
			<div className="cardBox">
				<textArea className="cardInput" 
						type="text"
						key={this.props.key}
						id={this.props.card.id} 
						defaultValue={this.state.content} 
						onBlur={this.editCard}
				/>		
				<span className="deleteButton"
							onClick={this.destroyCard}>
						&#9746;
				</span>
			</div>
		);
	}
});

window.Card = Card;
