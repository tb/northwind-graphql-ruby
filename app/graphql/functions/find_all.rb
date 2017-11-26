class Functions::FindAll < GraphQL::Function
  attr_reader :type

  def initialize(model, resolve_func = nil)
    @model = model
    @resolve_func = resolve_func
    @type = Types.const_get("Types::#{model.name}Type").to_list_type
  end

  argument :orderBy, types.String, default_value: nil
  argument :page, types.Int, default_value: nil
  argument :perPage, types.Int, default_value: nil

  def call(obj, args, ctx)
    records = @resolve_func ? @resolve_func.call(obj, args, ctx) : @model.all
    records = Services::Filter.call(records, args[:filter])
    records = Services::Includes.call(@model, records, ctx)
    records = Services::OrderBy.call(records, args[:orderBy])
    records = Services::Paginate.call(records, args)
    records
  end
end
