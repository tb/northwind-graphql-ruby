describe Types::MutationType do
  context 'Supplier' do
    context 'createSupplier' do
      let(:result) { Northwind.execute(query) }

      context 'when valid params' do
        let(:query) { %q(
          mutation {
            createSupplier(supplier: {name: "NewCo"}) {
              name
            }
          }
        )}

        it 'returns created supplier' do
          expect(result['data']).to eq("createSupplier"=>{"name"=>"NewCo"})
        end
      end

      context 'when invalid params' do
        let(:query) { %q(
          mutation {
            createSupplier(supplier: {name: ""}) {
              name
            }
          }
        )}

        it 'returns errors and no data' do
          expect(result['data']).to eq("createSupplier"=>nil)
          expect(result['errors']).to eq([{"message"=>"ActiveRecord::RecordInvalid", "locations"=>[{"line"=>3, "column"=>13}], "path"=>["createSupplier"], :fields=>{:name=>["can't be blank"]}}])
        end
      end
    end

    context 'updateSupplier' do
      let(:result) { Northwind.execute(query, variables: variables) }

      let(:query) { %q(
        mutation updateSupplier($id: ID!, $name: String) {
          updateSupplier(supplier: {id: $id, name: $name}) {
            name
          }
        }
      )}

      let(:supplier) { create(:supplier, name: 'ACME') }

      context 'when valid params' do
        let(:variables) { { id: supplier.id, name: "NewCo" }.stringify_keys }

        it 'returns update supplier' do
          expect(result['data']).to eq("updateSupplier"=>{"name"=>"NewCo"})
        end
      end

      context 'when invalid params' do
        let(:variables) { { id: supplier.id, name: "" }.stringify_keys }

        it 'returns errors and no data' do
          expect(result['data']).to eq("updateSupplier"=>nil)
          expect(result['errors']).to eq([{"message"=>"ActiveRecord::RecordInvalid", "locations"=>[{"line"=>3, "column"=>11}], "path"=>["updateSupplier"], :fields=>{:name=>["can't be blank"]}}])
        end
      end
    end
  end
end
