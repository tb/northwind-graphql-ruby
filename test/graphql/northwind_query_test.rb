require "test_helper"

class NorthwindQueryTest < ActiveSupport::TestCase
  def test_query_allSuppliers
    create(:supplier, name: 'ACME')
    create(:supplier, name: 'NewCo')
    query = <<-GRAPHQL
      {
        allSuppliers {
          nodes {
            name
          }
        }
      }
    GRAPHQL
    assert_equal(Northwind.execute(query)["data"],
                 {"allSuppliers"=>{"nodes"=>[{"name"=>"ACME"}, {"name"=>"NewCo"}]}})
  end

  def test_query_allSuppliers_orderBy_name_desc
    create(:supplier, name: 'ACME')
    create(:supplier, name: 'NewCo')
    query = <<-GRAPHQL
      {
        allSuppliers(orderBy: "-name") {
          nodes {
            name
          }
        }
      }
    GRAPHQL
    assert_equal(Northwind.execute(query)["data"],
                 {"allSuppliers"=>{"nodes"=>[{"name"=>"NewCo"}, {"name"=>"ACME"}]}})
  end

  def test_query_allSuppliers_filter_name_contains_scope
    create(:supplier, name: 'ABC')
    create(:supplier, name: 'ABCD')
    create(:supplier, name: 'ABCDE')
    query = <<-GRAPHQL
      {
        allSuppliers(filter: { name_contains: "BCD" }) {
          nodes {
            name
          }
        }
      }
    GRAPHQL
    assert_equal(Northwind.execute(query)["data"],
                 {"allSuppliers"=>{"nodes"=>[{"name"=>"ABCD"}, {"name"=>"ABCDE"}]}})
  end
end
