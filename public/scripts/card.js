var Card = React.createClass({
	editDescription () {
		$.ajax({
			url: "/" + "cards/" + this.props.id,
			type: 'PUT',
			data: {data: JSON.stringify({description: "new text after edit"})},
			success: function(response) {
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
					{this.props.content} with id: {this.props.id}
				</li>
			</div>
		);
	}
});

window.Card = Card;
