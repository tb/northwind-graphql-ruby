require 'httparty'

class Functions::CurrencyRates < GraphQL::Function
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

  private
  
  attr_reader :type
end
