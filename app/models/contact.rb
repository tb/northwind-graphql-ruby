class Contact < ApplicationRecord
  belongs_to :contactable, polymorphic: true, optional: true

  validates :first_name, :last_name, :email, presence: true
end
