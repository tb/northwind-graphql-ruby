module Functions
  class Update < GraphQL::Function
    attr_reader :type

    def initialize(model)
      @model = model
      @type = Types.const_get("Types::#{model.name}Type")
      @param_key = model.model_name.param_key
    end

    def call(_obj, args, _ctx)
      attributes = args[@param_key].to_h
      id = attributes.delete(@model.primary_key)
      record = @model.find(id)
      record.update!(Services::NestedAttributes.call(@model, attributes))
      record
    end
  end
end
