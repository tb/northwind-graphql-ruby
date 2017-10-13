# based on https://github.com/nettofarah/graphql-query-resolver/pull/6
module Services
  module Includes
    def self.call(model_class, records, context)
      return records if !context
      records.includes(Resolver.new(model_class, context).call)
    end

    class Resolver
      attr_reader :context, :fragment_definitions

      def initialize(model_class, context)
        @model_class = model_class
        @context = context
        @fragment_definitions = context.query.fragments
      end

      def call
        map_dependencies(@model_class, @context.ast_node)
      end

      private

      def map_dependencies(class_name, ast_node, dependencies = {})
        ast_node.selections.each do |selection|
          if inline_fragment?(selection) || relay_connection_using_nodes?(selection)
            proceed_to = selection
          elsif fragment_spread?(selection)
            proceed_to = fragment_definitions[selection.name]
          elsif relay_connection_using_edges?(selection)
            proceed_to = selection.selections.find { |sel| sel.name == 'node' }
          end

          if proceed_to.present?
            map_dependencies(class_name, proceed_to, dependencies)
            next
          end

          name = selection.name
          if !preloadable_reflection?(class_name, name)
            next
          end

          begin
            next_model_class = name.singularize.classify.constantize
          rescue NameError
            selection_name = class_name.reflections[name].options[:class_name]
            next_model_class = selection_name.singularize.classify.constantize
          end

          dependencies[name.to_sym] = map_dependencies(next_model_class, selection)
        end

        dependencies
      end

      def preloadable_reflection?(class_name, selection_name)
        class_name.reflections.with_indifferent_access[selection_name].present?
      end

      def relay_connection_using_edges?(selection)
        selection.name == 'edges'
      end

      def relay_connection_using_nodes?(selection)
        selection.name == 'nodes'
      end

      def inline_fragment?(selection)
        selection.is_a?(GraphQL::Language::Nodes::InlineFragment)
      end

      def fragment_spread?(selection)
        selection.is_a?(GraphQL::Language::Nodes::FragmentSpread)
      end
    end
  end
end
