require 'rails_helper'

describe Functions::FindAll do

  let(:context) { {} }

  describe '#call' do
    context 'when provided arguments are blank' do
      it 'return all of records' do
        products = create_list(:product, 2)
        params = { }

        result = Functions::FindAll.new(Product).call(nil, params, nil)

        expect(result).to eq products
      end
    end

    context 'when offset is provided' do
      it 'returns paginated records' do
        _, _, product_3, product_4, product_5 = create_list(:product, 5)
        params = { page: 2, perPage: 2 }

        result = Functions::FindAll.new(Product).call(nil, params, nil)

        expect(result).to match([product_3, product_4])
      end
    end

    context 'when orderBy is provided' do
      it 'return all sorted records by product_name' do
        first_product = create(:product, product_name: 'Product 1')
        second_product = create(:product, product_name: 'Product 2')
        third_product = create(:product, product_name: 'Product 3')
        params = { orderBy: 'product_name' }

        result = Functions::FindAll.new(Product).call(nil, params, nil)

        expect(result).to match([first_product, second_product, third_product])
      end
    end

    context 'when -orderBy is provided' do
      it 'return all sorted records by product_name' do
        first_product = create(:product, product_name: 'Product 1')
        second_product = create(:product, product_name: 'Product 2')
        third_product = create(:product, product_name: 'Product 3')
        params = { orderBy: '-product_name' }

        result = Functions::FindAll.new(Product).call(nil, params, nil)

        expect(result).to match([third_product, second_product, first_product])
      end
    end

    context 'when provided arguments have a filter' do
      pending
    end
  end
end
