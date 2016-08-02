class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  @page_title = "Hotel Abell"

  def set_locale
    I18n.locale = :en
  end
end
