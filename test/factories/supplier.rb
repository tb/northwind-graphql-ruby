# frozen_string_literal: true

FactoryGirl.define do
  factory :supplier do
    name Faker::Name.name
    webpage Faker::Internet.url
    notes Faker::Hipster.sentence

    after(:create) do |supplier|
      supplier.address = create(:address, addressable: supplier)
      supplier.contact = create(:contact, contactable: supplier)
    end
  end
end
