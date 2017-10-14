# see http://rmosolgo.github.io/blog/2017/03/16/tracking-schema-changes-with-graphql-ruby/
namespace :graphql do
  task schema: :environment do
    # Get a string containing the definition in GraphQL IDL:
    schema_defn = Northwind.to_definition
    # Choose a place to write the schema dump:
    schema_path = "client/src/graphql/schema.graphql"
    # Write the schema dump to that file:
    File.write(Rails.root.join(schema_path), schema_defn)
    puts "Updated #{schema_path}"
  end
end
