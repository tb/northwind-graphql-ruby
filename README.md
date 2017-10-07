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

Add the engine to `routes.rb`

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

Read [Introduction to GraphQL](http://graphql.org/learn/)

## Types

GraphQL queries begin from [root types](http://graphql-ruby.org/schema/root_types.html): query, mutation, and subscription (experimental).

[Types](http://graphql-ruby.org/types/introduction.html) describe objects and values in a system.

To query and mutate models we will define two types for each model

    Types::SupplierType = GraphQL::ObjectType.define do
      name "Supplier"

      field :id, !types.ID
      field :name, types.String
      field :webpage, types.String
      field :notes, types.String
      field :errors, Types::JSONType
    end

    Types::SupplierInputType = GraphQL::InputObjectType.define do
      name "SupplierInput"

      argument :id, types.ID
      argument :name, types.String
      argument :webpage, types.String
      argument :notes, types.String
    end

and some custom types with `GraphQL::ScalarTypes` like

    Types::DateType = GraphQL::ScalarType.define do
      name "Date"

      coerce_input ->(value, ctx) { Date.iso8601(value) }
      coerce_result ->(value, ctx) { value.iso8601 }
    end

## Queries

To keep schema definition clean use [`GraphQL::Function`](http://graphql-ruby.org/fields/function.html)

    Types::QueryType = GraphQL::ObjectType.define do
      name "Query"

      field :supplier, function: Functions::FindById.new(Supplier) do
        type Types::SupplierType
      end

      field :allSuppliers, function: Functions::FindAll.new(Supplier) do
        type types[Types::SupplierType]
      end
    end

Above defines queries

    fragment supplierFields on Supplier {
      id
      name
    }

    {
      supplier(id: 1) {
        ...supplierFields
      }
      allSuppliers(offset: 1) {
        ...supplierFields
      }
    }

## Mutations

For mutations also use [`GraphQL::Function`](http://graphql-ruby.org/fields/function.html)

    Types::MutationType = GraphQL::ObjectType.define do
      name "Mutation"

      field :createSupplier, function: Functions::Create.new(Supplier) do
        type Types::SupplierType
        argument :supplier, !Types::SupplierInputType
      end

      field :updateSupplier, function: Functions::Update.new(Supplier) do
        type Types::SupplierType
        argument :supplier, !Types::SupplierInputType
      end

      field :deleteSupplier, function: Functions::Delete.new(Supplier) do
        type Types::SupplierType
      end
    end

Try mutations (run one mutation at a time)

    fragment supplierFields on Supplier {
      id
      name
    }

    mutation {
      createSupplier(supplier: {name: "ACME"}) {
        ...supplierFields
        errors
      }
    }

    mutation {
      updateSupplier(supplier: {id: 11, name: "NewCo"}) {
        ...supplierFields
        errors
      }
    }

    mutation {
      deleteSupplier(id: 11) {
        ...supplierFields
      }
    }

We are using `Types::JSONType` to get validation `errors`, read more on [Error Handling](http://graphql-ruby.org/queries/error_handling.html)

## Relations

For one-to-one relations use `Functions::HasOne` that is wrapper around [exAspArk/batch-loader](https://github.com/exAspArk/batch-loader),
"Powerful tool to avoid N+1 DB or HTTP queries".

For one-to-many relations you can reuse `Functions::FindAll`.

    Types::SupplierType = GraphQL::ObjectType.define do
      name "Supplier"
      #...

      field :contact, function: Functions::HasOne.new('id', -> (ids, obj, args, ctx) {
        Contact.where(contactable_id: ids, contactable_type: 'Supplier')
      }) do
        type Types::ContactType
      end

      field :products, function: Functions::FindAll.new(Product, -> (obj, args, ctx) {
        obj.products
      }) do
        type types[Types::ProductType]
      end
    end

## Server-side REST wrapper

You can use [`GraphQL::Function`](http://graphql-ruby.org/fields/function.html)
to write a [server-side REST wrapper](http://graphql.org/blog/rest-api-graphql-wrapper/).
Here is example for [Fixer.io](http://fixer.io/) "Foreign exchange rates and currency conversion API"

    class Functions::CurrencyRates < GraphQL::Function
      attr_reader :type
    
      def initialize
        @type = GraphQL::ObjectType.define do
          name "CurrencyRates"
    
          field :base, types.String
          field :date, Types::DateType, resolve: ->(obj, args, ctx) { Date.iso8601(obj['date']) }
          field :rates, Types::JSONType
        end
      end
    
      argument :date, Types::DateType
      argument :base, types.String, default_value: 'EUR'
    
      def call(obj, args, ctx)
        params = "#{args['date']||'latest'}?base=#{args['base']}"
        response = HTTParty.get("http://api.fixer.io/#{params}", timeout: 10)
        OpenStruct.new(response.parsed_response)
      end
    end

Query

    {
      currencyRates(date: "2017-10-02", base: "EUR") {
        date
        base
        rates
      }
    }

## TODO

- authorization
- testing
- file upload
- consider eager loading based on [`ctx.ast_node`](https://github.com/rmosolgo/graphql-ruby/issues/58#issuecomment-162736610)
