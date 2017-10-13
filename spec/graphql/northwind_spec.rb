describe Northwind do
  it 'graphql schema is up to date' do
    current_defn = Northwind.to_definition
    printout_defn = File.read(Rails.root.join("client/src/graphql/schema.graphql"))

    expect(current_defn).to eq(printout_defn), "Update the printed schema with `bundle exec rake graphql:schema`"
  end
end
