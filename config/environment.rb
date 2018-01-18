# Load the Rails application.
require File.expand_path('../application', __FILE__)

require_relative 'application'
require_relative 'hotel_config'


$HotelName   = HotelConfig[:HotelName] || 'Xmuryj'


# Initialize the Rails application.
Rails.application.initialize!
