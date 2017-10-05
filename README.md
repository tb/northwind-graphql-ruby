# northwind-graphql-ruby

## Initial project setup

    gem install rails
    rails new northwind-graphql-ruby --api --database=postgresql
    echo northwind-graphql-ruby > northwind-graphql-ruby/.ruby-gemset
    echo 2.3 > northwind-graphql-ruby/.ruby-version
    cd northwind-graphql-ruby
    gem install bundler

## Setup data 

    rake db:setup

See [Entity-Relationship Diagrams PDF](erd.pdf)

## Setup GraphQL

Add to Gemfile

    gem 'graphql'
    gem 'batch-loader'

    group :development do
      # ...
      # graphiql in development https://github.com/rmosolgo/graphiql-rails/issues/13#issuecomment-256256255
      gem 'sass-rails'
      gem 'uglifier'
      gem 'coffee-rails'
      gem 'graphiql-rails'
    end

Then run

    bundle
    rails generate graphql:install

Add the engine to routes.rb

    Rails.application.routes.draw do
      post "/graphql", to: "graphql#execute"
      if Rails.env.development?
        mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
      end
    end

And start server

    rails s
    open http://localhost:3000/graphiql

Query GraphQL API

    query { testField }
