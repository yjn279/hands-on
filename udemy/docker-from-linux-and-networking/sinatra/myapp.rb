require 'mysql2'
require 'sinatra'


get '/' do
  'Hello World!'
end

get '/api/hello' do
  {message: 'Hello World!'}.to_json
end

get '/api/tasks' do
    client = connect
    result = client.query('select id, title, created from tasks')
    tasks = result.map do |row|
        {
            id: row['id'],
            title: row['title'],
            created: row['created']
        }
    end

    client.close
    {tasks: tasks}.to_json
end

post '/api/tasks' do
    body = JSON.parse request.body.read
    title = body['title']

    client = connect
    statement = client.prepare('INSERT INTO tasks (title) values (?)')
    statement.execute(title)
    client.close
end


def connect
    Mysql2::Client.new(
        :host => "localhost",
        :database => "mydb",
        :username => "myuser",
        :password => "password",
        :connect_timeout => 5
    )
end
