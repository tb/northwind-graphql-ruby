class Contact < ApplicationRecord
  belongs_to :contactable, polymorphic: true

  validates :first_name, :last_name, :email, presence: true
end
