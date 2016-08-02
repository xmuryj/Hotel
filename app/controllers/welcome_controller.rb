class WelcomeController < ApplicationController
  @@languge = 1

  def index
    @temp = @@languge
  end

  def room

  end

  def switch
    if(params[:id])
      @@languge = params[:id]
    end
  end

end

