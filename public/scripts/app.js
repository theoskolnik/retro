let Retro = window.Retro;

var App = React.createClass({
	getInitialState() {
		return {
			retro: null,
			loaded: false
		}
	},

	createRetroLink() {
		this.handleSubmit();
		return (
			<Retro />
		);

	},

	handleSubmit() {
		$.ajax({
    	url: "/retros",
    	type: 'POST',
    	dataType: 'json',
    	data: JSON.stringify({title: 'Retro title'}),
    	success: function(response) {
    		var retro = { 
					title: response.data.title,
					id: response.data.id
				};
				this.setState({retro: retro, loaded: true});
    	}.bind(this),
    	error: function(req, status, err) {
    		console.error(this.props.url, status, err.toString());
    	}
    });
	},
	render() {
		if(this.state.loaded) {
			var baseUrl = "/retros/" + this.state.retro.id;
			return (
				<div className="retroContainer">
					<Retro retro={this.state.retro} baseUrl={baseUrl} />
				</div>
			);
		} else {
			return (
				<div className="retroContainer">
					<button onClick={this.createRetroLink}>Create your retro</button>
				</div>
			);
		}
	}
});

ReactDOM.render(
	<App baseUrl="/" />,
	document.getElementById('main')
);