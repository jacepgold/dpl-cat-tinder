class Api::CatsController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: User.random_cat(current_user.liked_cats)
  end

  def update
    current_user.liked_cats << params[:id].to_i
    current_user.save
  end

  def show
  end
end
