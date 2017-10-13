require 'rails_helper'

describe Functions::Delete do

  context 'when provided record exists' do
    describe '#call' do
      it 'destroys a record' do
        product = create(:product)
        params = { id: product.id }

        product = Functions::Delete.new(Product).call(nil, params, nil)

        expect(Product.where(id: product.id)).to_not exist
      end
    end
  end

  context 'when record with id provided does not exist' do
    it 'does not destroy a record, return record not found error' do
      params = { id: 1 }

      expect {
        Functions::Delete.new(Product).call(nil, params, nil)
      }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end

  context 'when provided hash without key id' do
    it 'returns error record not found' do
      params = { }

      expect {
        Functions::Delete.new(Product).call(nil, params, nil)
      }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
