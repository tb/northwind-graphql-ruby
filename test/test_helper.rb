require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  include FactoryGirl::Syntax::Methods

  DatabaseCleaner.strategy = :transaction
  setup { DatabaseCleaner.start }
  teardown { DatabaseCleaner.clean }
end
