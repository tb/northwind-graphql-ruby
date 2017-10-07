class CreateContacts < ActiveRecord::Migration[5.1]
  def change
    create_table :contacts do |t|
      t.string :last_name
      t.string :first_name
      t.string :email
      t.string :job_title
      t.string :business_phone
      t.integer :contactable_id
      t.string :contactable_type
    end
  end
end
