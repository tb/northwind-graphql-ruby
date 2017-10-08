# frozen_string_literal: true

FactoryGirl.define do
  factory :address do
    street_address { Faker::Address.street_address }
    city { Faker::Address.city }
    state { Faker::Address.state_abbr }
    postal_code { Faker::Address.zip }
    country { Faker::Address.country_code }
  end
end
