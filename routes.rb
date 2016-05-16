require 'json'
require 'sinatra'

cards = []
index = 0

get '/' do
  erb :home
end

get '/cards' do
	return {:data => cards}.to_json
end

post '/cards' do
	jsonCard = JSON.parse(params[:data])
	newCard = Hash.new
	newCard[:id] = index
	newCard[:description] = jsonCard['description']
	cards << newCard
	index += 1
	return newCard.to_json
end	

put '/cards/:id' do
	description = JSON.parse(params[:data])['description']
	cards.each do |card|
		if params[:id].to_i == card[:id]
			card[:description] = description
		end
	end
	"success"
end	
