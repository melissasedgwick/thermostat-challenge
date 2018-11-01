require 'sinatra/base'

class Thermostat < Sinatra::Base

  get '/temperature' do
    headers 'Access-Control-Allow-Origin' => '*'
    { temp: @@temperature }.to_json
  end

  post '/temperature' do
    headers 'Access-Control-Allow-Origin' => '*'
    @@temperature = params[:temp]
    redirect '/temperature'
  end

  run! if app_file == $0
end
