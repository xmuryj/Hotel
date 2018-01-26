class User < ActiveRecord::Base
  validates_presence_of :nik_name
  validates :email, presence: true, uniqueness: { case_sensitive: false }
end
