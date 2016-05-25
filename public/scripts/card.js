var Card = React.createClass({
	getInitialState() {
		return {
      content: this.props.content
    };
	},

	editDescription () {
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

	render () {
		return(
			<div>
				<input className="card" 
						key={this.props.key}
						id={this.props.id} 
						type="text" 
						defaultValue={this.state.content} 
						onBlur={this.editDescription}/>
			</div>
		);
	}
});

window.Card = Card;
