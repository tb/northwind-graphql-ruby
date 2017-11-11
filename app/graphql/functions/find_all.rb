class Functions::FindAll < GraphQL::Function
  attr_reader :type

  def initialize(model, resolve_func = nil)
    @model = model
    @resolve_func = resolve_func
    @type = Types.const_get("Types::#{model.name}Type").to_list_type
  end

  argument :first, types.Int, default_value: nil
  argument :orderBy, types.String, default_value: nil
  argument :page, types.Int, default_value: nil
  argument :perPage, types.Int, default_value: nil

  def call(obj, args, ctx)
    records = @resolve_func ? @resolve_func.call(obj, args, ctx) : @model.all
    records = records.limit(args[:perPage]) if args[:perPage].present?
    records = records.offset((args[:page] - 1) * args[:perPage]) if args[:page].present?
    records = Services::OrderBy.call(@model, records, args[:orderBy])
    records = Services::Filter.call(records, args[:filter]) if args[:filter].present?
    records
  end
end
