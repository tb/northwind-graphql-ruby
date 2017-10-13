require 'rails_helper'

describe Services::OrderBy do
  describe '.call' do
    context 'when orderBy is provided' do
      it 'returns ascending sorted records by by product_name' do
        first_product = create(:product, product_name: 'Product 1')
        second_product = create(:product, product_name: 'Product 2')
        third_product = create(:product, product_name: 'Product 3')

        results = Services::OrderBy.call(Product.all, 'product_name')

        expect(results).to match([first_product, second_product, third_product])
      end
    end

    context 'when -orderBy is provided' do
      it 'returns descending sorted records by product_name' do
        first_product = create(:product, product_name: 'Product 1')
        second_product = create(:product, product_name: 'Product 2')
        third_product = create(:product, product_name: 'Product 3')

        results = Services::OrderBy.call(Product.all, '-product_name')

        expect(results).to match([third_product, second_product, first_product])
      end
    end
  end
end
