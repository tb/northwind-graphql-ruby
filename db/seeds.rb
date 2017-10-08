# frozen_string_literal: true

include FactoryGirl::Syntax::Methods

MULTIPLIER = 1

suppliers = create_list :supplier, 10 * MULTIPLIER
shippers = create_list :shipper, 10 * MULTIPLIER
customers = create_list :customer, 30 * MULTIPLIER
employees = create_list :employee, 30 * MULTIPLIER
products = (1..300 * MULTIPLIER).map do
  create :product, supplier: suppliers.sample
end
(1..100 * MULTIPLIER).map do
  order_date = Faker::Date.between(1.years.ago, Date.today)
  paid_date = nil
  shipped_date = nil
  if Faker::Boolean.boolean # paid
    paid_date = Faker::Date.between(order_date, Date.today)
    if Faker::Boolean.boolean # shipped
      shipped_date = Faker::Date.between(paid_date, Date.today)
    end
  end
  order = create(:order,
                 order_date: order_date,
                 paid_date: paid_date,
                 shipped_date: shipped_date,
                 employee: employees.sample,
                 customer: customers.sample,
                 shipper: shippers.sample)
  products.sample(Faker::Number.between(1, 10)).each do |p|
    OrderDetail.create(
      order: order,
      product: p,
      quantity: Faker::Number.between(1, 5),
      unit_price: p.list_price,
      discount: 0
    )
  end
end
