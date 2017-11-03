class AddProductImageUrl < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :image_url, :string
  end
end
