# frozen_string_literal: true

FactoryGirl.define do
  factory :shipper do
    name { Faker::Company.name }
    webpage { Faker::Internet.url }
    notes { Faker::Hipster.sentence }

    after(:create) do |shipper|
      shipper.address = create(:address, addressable: shipper)
      shipper.contact = create(:contact, contactable: shipper)
    end
  end
end
