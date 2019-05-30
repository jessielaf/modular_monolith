class EmployeesController < ApplicationController
  def index
    employees = Model.all
    render json: employees, status: :ok
  end

  def show
    employee = Model.find(params[:id])
    render json: employee, status: :ok
  end

  def create
    employee = Model.create(employee_params)

    if employee
      render status: :created
    else
      render status: :bad_request
    end
  end

  private def employee_params
    params.permit(:name, :birth_date, :email)
  end
end
