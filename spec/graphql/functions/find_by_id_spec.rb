require 'rails_helper'

describe Functions::FindById do

  describe '#call' do
    context 'when id of existing record is provided' do
      it 'returns record' do
        product = create(:product)
        create(:product)
        params = { id: product.id }

        result = Functions::FindById.new(Product).call(nil, params, nil)

        expect(result).to eq product
      end
    end

    context 'when id of does not existing record is provided' do
      it 'returns error record not found' do
        params = { id: 1 }

        expect {
          Functions::FindById.new(Product).call(nil, params, nil)
        }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context 'when blank hash is provided' do
      it 'returns error record not found' do
        params = { }

        expect {
          Functions::FindById.new(Product).call(nil, params, nil)
        }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
