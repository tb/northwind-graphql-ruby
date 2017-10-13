require 'rails_helper'

describe Services::NestedAttributes do
  describe '.call' do
    context 'when model have one nested attributes model' do
      context 'when hash with nested attributes is provided' do
        it 'replaces nested model key from hash to model_attributes' do
          params =
            {
              'product_name' => 'Ergonomic Wooden Lamp',
              'supplier' =>
                {
                  'name' => 'Supplier #1',
                  'webpage' => 'http://example.com',
                  'notes' => 'Something note'
                }
            }

          results = Services::NestedAttributes.call(Product, params)

          expect(results).to include(
            {
             'product_name' => 'Ergonomic Wooden Lamp',
             'supplier_attributes' =>
               {
                 'name' => 'Supplier #1',
                 'webpage' => 'http://example.com',
                 'notes' => 'Something note'
               }
            }
          )
        end
      end

      context 'when hash without nested attributes is provided' do
        it 'does not change hash' do
          params = { 'product_name' => 'Ergonomic Wooden Lamp' }

          results = Services::NestedAttributes.call(Product, params)

          expect(results).to eq params
        end
      end
    end
  end
end
