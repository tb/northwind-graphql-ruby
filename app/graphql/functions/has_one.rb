module Functions
  class HasOne < GraphQL::Function
    def initialize(foreign_key, cache_key = 'id', resolve_func) # rubocop:disable Style/OptionalArguments
      @foreign_key = foreign_key
      @cache_key = cache_key
      @resolve_func = resolve_func
    end

    def call(obj, args, ctx)
      BatchLoader.for(obj[@foreign_key]).batch(cache: false) do |ids, loader|
        @resolve_func.call(ids, obj, args, ctx).each do |record|
          loader.call(record[@cache_key], record)
        end
      end
    end
  end
end
