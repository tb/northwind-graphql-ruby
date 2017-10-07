# frozen_string_literal: true

class Contact < ApplicationRecord
  belongs_to :contactable, polymorphic: true

  validates :first_name, presence: true
  validates :last_name, presence: true
end
