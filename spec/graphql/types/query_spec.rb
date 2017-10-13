describe Types::QueryType do
  context 'Supplier' do
    context 'allSuppliers' do
      let(:result) { Northwind.execute(query)["data"] }

      let(:query) { %q(
        {
          allSuppliers {
            nodes {
              name
            }
          }
        }
      )}

      context 'when no suppliers' do
        it 'returns empty array' do
          expect(result).to eq("allSuppliers"=>{"nodes"=>[]})
        end
      end

      context 'when suppliers' do
        it 'returns supplier names' do
          create(:supplier, name: 'ACME')
          create(:supplier, name: 'NewCo')

          expect(result).to eq("allSuppliers"=>{"nodes"=>[{"name"=>"ACME"}, {"name"=>"NewCo"}]})
        end
      end

      context 'when sorted by -name suppliers' do
        let(:query) { %q(
          {
            allSuppliers(orderBy: "-name") {
              nodes {
                name
              }
            }
          }
        )}

        it 'returns supplier names in reverse order' do
          create(:supplier, name: 'ACME')
          create(:supplier, name: 'NewCo')

          expect(result).to eq("allSuppliers"=>{"nodes"=>[{"name"=>"NewCo"}, {"name"=>"ACME"}]})
        end
      end

      context 'when filter name contains scope' do
        let(:query) { %q(
          {
            allSuppliers(filter: { name_contains: "BCD" }) {
              nodes {
                name
              }
            }
          }
        )}

        it 'returns matching results' do
          create(:supplier, name: 'ABC')
          create(:supplier, name: 'ABCD')
          create(:supplier, name: 'ABCDE')

          expect(result).to eq("allSuppliers"=>{"nodes"=>[{"name"=>"ABCD"}, {"name"=>"ABCDE"}]})
        end
      end
    end
  end
end
