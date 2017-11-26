class Functions::AddressCountries < GraphQL::Function
  type types[Types::AddressCountryType]

  def call(obj, args, ctx)
    Address
      .group('country')
      .select('country AS code')
  end
end
