require 'json'
require 'sinatra'
require 'sinatra/activerecord'
require './config/environments' #database configuration
require './models/card'

cards = []
cardIndex = 1
listIndex = 1
cardLists = []

get '/' do
  erb :home
end

get '/cards' do
	@cards = Card.all
	return {:data => @cards}.to_json
end

post '/lists' do
	newList = Hash.new 
	newList[:id] = listIndex
	newList[:title] = JSON.parse(request.body.read)['title']
	newList[:cards] = []
	cardLists << newList
	listIndex += 1
	return {:data => newList}.to_json
end	

post '/cards' do
	@card = Card.new
	@card.save
	{:data => @card}.to_json
end

put '/cards/:id' do
	description = JSON.parse(request.body.read)['description']
	cards.each do |card|
		if params[:id].to_i == card[:id]
			card[:description] = description
		end
	end
	{:data => description}.to_json
end	

delete '/cards/:id' do 
	cards.each do |card|
		if params[:id].to_i == card[:id]
			cards.delete(card)
		end
	end
	{:data => cards}.to_json
end
