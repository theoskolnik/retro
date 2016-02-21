require 'json'
require 'sinatra'

cards = [{:description => 'test1'}, {:description => 'test2'}]

get '/' do
  erb :home
end

get '/cards' do
	return {:data => cards}.to_json
end

post '/cards' do
	# create card
end		