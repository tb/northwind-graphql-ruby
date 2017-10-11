# frozen_string_literal: true

FactoryGirl.define do
  factory :product do
    supplier
    product_code { Faker::Number.number(10) }
    product_name { Faker::Commerce.product_name }
    standard_cost { Faker::Commerce.price }
    list_price { (standard_cost * (1 + (Faker::Number.decimal(2).to_f / 100))).round(2) }
    reorder_level { Faker::Number.between(10_100) }
    target_level { Faker::Number.between(10_100) }
    discontinued { Faker::Boolean.boolean(0.2) }
    minimum_reorder_quantity { Faker::Number.between(10_100) }
    category { Faker::Commerce.department(1) }
    to_create {|instance| instance.save(validate: false) }
  end
end
