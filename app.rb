require 'json'
require 'sinatra'
require 'sinatra/activerecord'
require './config/environments' #database configuration
require './models/card'
require './models/list'

cards = []
cardIndex = 1
listIndex = 1
cardLists = []

after do
    ActiveRecord::Base.clear_active_connections!
end

get '/' do
  erb :home
end

get '/lists/:id/cards' do
	@cards = Card.where(:list_id => params[:id])
	return {:data => @cards}.to_json
end

get '/lists' do
	@lists = List.all
	return {:data => @lists}.to_json
end

post '/lists' do
	@list = List.create!(:title => JSON.parse(request.body.read)['title'])
	return {:data => @list}.to_json
end	

post '/lists/:id/cards' do
	@card = Card.create!(
		:list_id => params[:id], 
		:content => JSON.parse(request.body.read)['description']
	)
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
	@card = Card.find_by(:id => params[:id])
	@card.destroy
end


