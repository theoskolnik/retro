var Card = React.createClass({
	getInitialState() {
		return {
      content: this.props.content
    };
	},

	editCard () {
		var userInput = document.getElementById(this.props.id).value;
		
		$.ajax({
			url: "/" + "cards/" + this.props.id,
			type: 'PUT',
			data: JSON.stringify({ description: userInput }),
			success: function(response) {
				this.setState({content: JSON.parse(response).content});
    		console.log("Successfully edited card.");
    	}.bind(this),
    	error: function(req, status, err) {
    		console.log("Failed to edit card.");
    	}
		})
	},

	deleteCard () {
		this.props.deleteCard(this.props.id);
	},

	render () {
		return(
			<div className="cardBox">
				<textArea className="card" 
						key={this.props.key}
						id={this.props.id} 
						type="text" 
						defaultValue={this.state.content} 
						onBlur={this.editCard}>
				</textArea>		
				<span className="deleteButton"
							onClick={this.deleteCard}>
						&#9746;
				</span>
			</div>
		);
	}
});

window.Card = Card;
