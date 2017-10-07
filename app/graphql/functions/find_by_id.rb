class Functions::FindById < GraphQL::Function
  def initialize(model)
    @model = model
  end

  argument :id, !types.ID

  def call(obj, args, ctx)
    @model.find(args[:id])
  end
end
