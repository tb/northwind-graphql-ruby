require 'rails_helper'

describe Functions::Update do

  describe '#call' do
    context 'when id of existing record is provided' do
      it 'updates a record' do
        product = create(:product)
        params = {
          'product' =>
            {
              'id' => product.id,
              'product_name' => 'New product name'
            }
        }

        Functions::Update.new(Product).call(nil, params, nil)

        expect(product.reload.product_name).to eq 'New product name'
      end
    end

    context 'when id of does not existing record is provided' do
      it 'returns record not found errors' do
        params = {
          'product' =>
            {
              'id' => 1,
              'product_name' => 'New product name'
            }
        }

        expect {
          Functions::Update.new(Product).call(nil, params, nil)
        }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context 'when empty parameters are provided' do
      it 'returns record not found error' do
        params = { }

        expect {
          Functions::Update.new(Product).call(nil, params, nil)
        }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
