describe Types::QueryType do
  context 'allSuppliers' do
    let(:result) { Northwind.execute(query)['data'] }

    def expeced_names_data(names = [])
      {
        'allSuppliers' => {
          'nodes' => names.map { |name| { 'name' => name } }
        }
      }
    end

    let(:query) do
      '
        {
          allSuppliers {
            nodes {
              name
            }
          }
        }
      '
    end

    context 'when no suppliers' do
      it 'returns empty array' do
        expect(result).to eq('allSuppliers' => { 'nodes' => [] })
      end
    end

    context 'when suppliers' do
      it 'returns supplier names' do
        create(:supplier, name: 'ACME')
        create(:supplier, name: 'NewCo')

        expect(result).to eq(expeced_names_data(%w[ACME NewCo]))
      end
    end

    context 'when sorted by -name suppliers' do
      let(:query) do
        '
          {
            allSuppliers(orderBy: "-name") {
              nodes {
                name
              }
            }
          }
        '
      end

      it 'returns supplier names in reverse order' do
        create(:supplier, name: 'ACME')
        create(:supplier, name: 'NewCo')

        expect(result).to eq(expeced_names_data(%w[NewCo ACME]))
      end
    end

    context 'when filter name contains scope' do
      let(:query) do
        '
          {
            allSuppliers(filter: { name_contains: "BCD" }) {
              nodes {
                name
              }
            }
          }
        '
      end

      it 'returns matching results' do
        create(:supplier, name: 'ABC')
        create(:supplier, name: 'ABCD')
        create(:supplier, name: 'ABCDE')

        expect(result).to eq(expeced_names_data(%w[ABCD ABCDE]))
      end
    end
  end
end
