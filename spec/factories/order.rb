# frozen_string_literal: true

FactoryGirl.define do
  factory :order do
    employee
    customer
    paid_date { Faker::Date.between(1.years.ago, Date.today) }
    shipped_date { Faker::Date.between(1.years.ago, Date.today) }
    shipper
    name { Faker::Name.name }
    shipping_fee { Faker::Number.between(1050) }
    taxes { Faker::Number.between(1015) }
    payment_type { %w[CASH VISA MASTERCARD PAYPAL].sample }
    notes { Faker::Hipster.sentence }
    tax_rate { Faker::Number.decimal(1) }
    status { Order::STATUSES.sample }

    after(:create) do |order|
      order.address = create(:address, addressable: order)
    end
  end
end
