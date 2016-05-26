require 'json'
require 'sinatra'

cards = []
index = 1

get '/' do
  erb :home
end

get '/cards' do
	return {:data => cards}.to_json
end

post '/cards' do
	newCard = Hash.new
	newCard[:id] = index
	newCard[:description] = JSON.parse(request.body.read)['description']
	cards << newCard
	index += 1
	return newCard.to_json
end	

put '/cards/:id' do
	description = JSON.parse(request.body.read)['description']
	cards.each do |card|
		if params[:id].to_i == card[:id]
			card[:description] = description
		end
	end
	{content: description}.to_json
end	

delete '/cards/:id' do 
	cards.each do |card|
		if params[:id].to_i == card[:id]
			cards.delete(card)
		end
	end
	p cards.to_json
	{:data => cards}.to_json
end
