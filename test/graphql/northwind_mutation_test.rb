require "test_helper"

class NorthwindMutationTest < ActiveSupport::TestCase
  def test_mutation_createSupplier
    query = <<-GRAPHQL
      mutation {
        createSupplier(supplier: {name: "NewCo"}) {
          name
        }
      }
    GRAPHQL
    assert_equal(Northwind.execute(query)["data"],
                 {"createSupplier"=>{"name"=>"NewCo"}})
  end

  def test_mutation_updateSupplier
    supplier = create(:supplier, name: 'ACME')

    query = <<-GRAPHQL
      mutation updateSupplier($id: ID!) {
        updateSupplier(supplier: {id: $id, name: "NewCo"}) {
          name
        }
      }
    GRAPHQL
    variables = { id: supplier.id }.stringify_keys
    assert_equal(Northwind.execute(query, variables: variables)["data"],
                 {"updateSupplier"=>{"name"=>"NewCo"}})
  end
end
