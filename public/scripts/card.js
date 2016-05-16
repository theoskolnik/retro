var Card = React.createClass({
	editDescription () {
		console.log("editing!");
		console.log(this);

		$.ajax({
			url: "/" + "cards/" + this.props.id,
			type: 'PUT',
			data: {data: JSON.stringify({description: "new hard coded"})},
			success: function(response) {
    		console.log("SUCCESS!");
    	}.bind(this),
    	error: function(req, status, err) {
    		console.log("FAILED!!!");
    	}
		})
	},

	render () {
		return(
			<div>
				<li className="card" key={this.props.key} id={this.props.id} onClick={this.editDescription}>{this.props.content}</li>
			</div>
		);
	}
});

window.Card = Card;
