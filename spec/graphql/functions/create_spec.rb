require 'rails_helper'

describe Functions::Create do
  describe '#call' do
    context 'when valid parameters are provided' do
      it 'creates a record with a nested record' do
        params = {
          'product' =>
            {
              'product_name' => 'Ergonomic Lamp',
              'supplier' => { 'name' => 'Supplier #2' }
            }
        }

        result = Functions::Create.new(Product).call(nil, params, nil)

        expect(result.persisted?).to be_truthy
        expect(result).to have_attributes(product_name: 'Ergonomic Lamp')
        expect(result.supplier).to have_attributes(name: 'Supplier #2')
      end
    end

    context 'when blank parameters are provided' do
      it 'does not create a record and return validations errors' do
        params = {  }
        result = Functions::Create.new(Product).call(nil, params, nil)

        expect(result.persisted?).to be_falsey
        expect(result.errors.messages).to include(supplier: ['must exist'], product_name: ["can't be blank"])
      end
    end
  end
end
