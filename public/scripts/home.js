var Button = React.createClass({
	render: function() {
		return (
			<div>
				<button>Create Card</button>
			</div>
		);
	}
});


ReactDOM.render(
	<Button url="/" />, 
	document.getElementById('main')
);
