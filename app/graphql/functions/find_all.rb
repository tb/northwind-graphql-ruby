class Functions::FindAll < GraphQL::Function
  def initialize(model, resolve_func = nil)
    @model = model
    @resolve_func = resolve_func
  end

  argument :limit, types.Int, default_value: nil
  argument :offset, types.Int, default_value: nil

  def call(obj, args, ctx)
    records = @resolve_func ? @resolve_func.call(obj, args, ctx) : @model.all
    records = records.limit(args[:limit]) if args[:limit].present?
    records = records.offset(args[:offset]) if args[:offset].present?
    records
  end
end
