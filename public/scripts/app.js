let Retro = window.Retro;

var App = React.createClass({
	getInitialState() {
		return {
			retro: null,
			loaded: false
		}
	},

	componentDidMount(){
		if (this.props.retro_id !== undefined) {
			$.ajax({
				url: "/retros/" + this.props.retro_id,
				dataType: 'json',
				type: 'GET',
				success: function(response) {
					console.log("This is the response" + response);
					this.setState({
						loaded: true, 
						retro: response.data
					});
				}.bind(this),
				error: function(req, status, err) {
					console.log("Failed to load retro.");
				}
			});
		} else {
			console.log("No retro id was passed");
		}

		// if this.props.retro.id exists
			// get retro
			// set state
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
				window.location = "/" + retro.id;
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
	<App baseUrl="/" retro_id={window.retro_id} />,
	document.getElementById('main')
);