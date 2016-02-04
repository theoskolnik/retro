var TestComponent = React.createClass({
	render: function() {
		return (
			<div>Hello World!</div>
		);
	}
});


ReactDOM.render(
	<TestComponent url="/" />, 
	document.getElementById('main')
);
