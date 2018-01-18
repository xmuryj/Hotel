class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.create(params[:user])

    if @user.forename.blank?
      redirect_to welcome_contact_path
    end
  end

  def show
    @user = User.find(1)
  end
end
