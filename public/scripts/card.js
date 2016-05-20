var Card = React.createClass({
	getInitialState() {
		return {
      content: this.props.content
    };

	},

	editDescription () {
		$.ajax({
			url: "/" + "cards/" + this.props.id,
			type: 'PUT',
			data: JSON.stringify({description: "new text after edit"}),
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
				<li className="card" 
						key={this.props.key} 
						id={this.props.id} 
						onClick={this.editDescription}>
						content: {this.state.content}, id: {this.props.id}
				</li>
			</div>
		);
	}
});

window.Card = Card;
