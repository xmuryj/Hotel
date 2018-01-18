require 'yaml'

class HotelConfig

  CONFIG_FILES = [
      File.expand_path('../hotel.yml', __FILE__),
      '/var/rails/hotel.yml'
  ].freeze


  def initialize
    return {} unless filename
    @config = YAML.load (File.read(filename))
  end

  def filename
    @file_name ||= CONFIG_FILES.find {|f| File.exist?(f)}
  end

  def [](key, default = nil)
    @config.fetch(key.to_s, default)
  end

  class << self
    def config
      @config ||= HotelConfig.new
    end
    def [](key, default = nil)
      config[key.to_s, default]
    end
    def filename
      config.filename
    end
  end


end