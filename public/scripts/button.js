var Button = React.createClass({
	handleClick() {
		this.props.handleSubmit();
	},
	render() {
		return (
			<button type="button" 
							onClick={this.handleClick}>
							Create Card
			</button>
		)
	}
});

window.Button = Button;