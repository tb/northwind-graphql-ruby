class Functions::Delete < GraphQL::Function
  attr_reader :type

  def initialize(model)
    @model = model
    @type = Types.const_get("Types::#{model.name}Type")
    @param_key = model.model_name.param_key
  end

  argument :id, !types.Int

  def call(obj, args, ctx)
    @model.destroy(args[:id])
  end
end
