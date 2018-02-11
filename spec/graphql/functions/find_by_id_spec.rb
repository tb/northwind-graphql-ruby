describe Functions::FindById do
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

      expect do
        Functions::FindById.new(Product).call(nil, params, nil)
      end.to raise_error(ActiveRecord::RecordNotFound)
    end
  end

  context 'when blank hash is provided' do
    it 'returns error record not found' do
      params = {}

      expect do
        Functions::FindById.new(Product).call(nil, params, nil)
      end.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
