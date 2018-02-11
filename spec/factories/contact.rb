# frozen_string_literal: true

FactoryGirl.define do
  factory :contact do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { Faker::Internet.email }
    job_title { Faker::Company.profession }
    business_phone { Faker::PhoneNumber.phone_number }
  end
end
