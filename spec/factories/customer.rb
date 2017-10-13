# frozen_string_literal: true

FactoryGirl.define do
  factory :customer do
    name { Faker::Name.name }
    webpage { Faker::Internet.url }
    notes { Faker::Hipster.sentence }

    after(:create) do |customer|
      customer.address = create(:address, addressable: customer)
      customer.contact = create(:contact, contactable: customer)
    end
  end
end
