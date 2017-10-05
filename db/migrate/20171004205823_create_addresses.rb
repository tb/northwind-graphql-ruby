class CreateAddresses < ActiveRecord::Migration[5.1]
  def change
    create_table :addresses do |t|
      t.string :street_address
      t.string :city
      t.string :state
      t.string :postal_code
      t.string :country
      t.integer :addressable_id
      t.string :addressable_type
    end
  end
end
