module Functions
  class AddressCountries < GraphQL::Function
    type types[Types::AddressCountryType]

    def call(_obj, _args, _ctx)
      Address
        .group('country')
        .select('country AS code')
    end
  end
end
