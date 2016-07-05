require 'json'
require 'sinatra'
require 'sinatra/activerecord'
require './config/environments' #database configuration
require './models/card'
require './models/list'
require './models/retro'

after do
    ActiveRecord::Base.clear_active_connections!
end

get '/' do
  erb :home
end

get '/:id' do
	@retro = Retro.find(params[:id])
  erb :home
end

get '/retros/:id' do
	@retro = Retro.find(params[:id])
	{:data => @retro}.to_json
end

get '/lists/:id/cards' do
	@cards = Card.where(:list_id => params[:id])
	return {:data => @cards}.to_json
end

get '/retros/:id/lists' do
	@lists = List.where(:retro_id => params[:id])
	return {:data => @lists}.to_json
end

post '/retros' do
	@retro = Retro.create!(:title => JSON.parse(request.body.read)['title'])
	return {:data => @retro}.to_json
end

post '/retros/:id/lists' do
	@list = List.create!(:title => JSON.parse(request.body.read)['title'], :retro_id => params[:id])
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
	@card = Card.find_by(:id => params[:id])
	@card[:content] = JSON.parse(request.body.read)['description']
	@card.save
	{:data => @card}.to_json
end

put '/lists/:id' do
	@list = List.find(params[:id])
	@list[:title] = JSON.parse(request.body.read)['title']
	@list.save
	{:data => @list}.to_json
end

delete '/cards/:id' do
	@card = Card.find_by(:id => params[:id])
	@card.destroy
end


