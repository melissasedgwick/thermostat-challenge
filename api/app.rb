require 'sinatra/base'

class Thermostat < Sinatra::Base
  use Rack::Session::Cookie, :key => "rack.session"
  set :session_secret, "My session secret"

  get '/' do
    headers 'Access-Control-Allow-Origin' => '*'
    redirect '/temperature'
  end

  get '/temperature' do
    headers 'Access-Control-Allow-Origin' => '*'
    if @@temperature == nil
      { temp: "20" }.to_json
    else
      { temp: @@temperature }.to_json
    end
  end

  post '/temperature' do
    headers 'Access-Control-Allow-Origin' => '*'
    @@temperature = params[:temp]
    redirect '/temperature'
  end

  run! if app_file == $0
end
