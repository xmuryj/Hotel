class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.create(params[:user])

    if @user.nik_name.blank?
      redirect_to welcome_contact_pat
    end
  end

end
