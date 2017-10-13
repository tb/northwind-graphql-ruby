describe Functions::Create do
  context 'when valid parameters are provided' do
    it 'creates a record with a nested record' do
      params = {
        'product' =>
          {
            'product_name' => 'Ergonomic Lamp',
            'supplier' => { 'name' => 'Supplier' }
          }
      }

      result = Functions::Create.new(Product).call(nil, params, nil)

      expect(result.persisted?).to be_truthy
      expect(result).to have_attributes(product_name: 'Ergonomic Lamp')
      expect(result.supplier).to have_attributes(name: 'Supplier')
    end
  end

  context 'when blank parameters are provided' do
    it 'does not create a record and return validations errors' do
      params = {  }

      expect {
        Functions::Create.new(Product).call(nil, params, nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end
