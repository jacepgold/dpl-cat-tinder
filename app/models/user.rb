class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable
  include DeviseTokenAuth::Concerns::User
  serialize :liked_cats, Array

  def self.random_cat(ids)
    ids = ids.length > 0 ? ids : [0]
    Cat.where("id NOT IN (?)", ids).order("RANDOM()")
  end
end
