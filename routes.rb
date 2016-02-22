require 'json'
require 'sinatra'

cards = []

get '/' do
  erb :home
end

get '/cards' do
	return {:data => cards}.to_json
end

post '/cards' do
	jsonCard = JSON.parse(params[:data])
	newCard = Hash.new
	newCard[:id] = jsonCard['key']
	newCard[:description] = jsonCard['props']['description']
	cards << newCard
	'success'
end		