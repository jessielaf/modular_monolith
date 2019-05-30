class Employee < ApplicationRecord
  validates :name, presence: true
  validates :birth_date, presence: true
  validates :email, presence: true
end
