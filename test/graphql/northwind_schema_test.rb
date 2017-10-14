require "test_helper"

class NorthwindSchemaTest < ActiveSupport::TestCase
  def test_graphql_schema_is_up_to_date
    current_defn = Northwind.to_definition
    printout_defn = File.read(Rails.root.join("client/src/graphql/schema.graphql"))
    assert_equal(current_defn, printout_defn, "Update the printed schema with `bundle exec rake graphql:schema`")
  end
end
