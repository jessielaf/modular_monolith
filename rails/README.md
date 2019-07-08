The versions used are:

-   Ruby 2.5.5

-   rails 5.2.3

-   gem 2.7.6.2

Install rails and the mysql client by running

      gem install rails mysql2

Create a new rails project with mysql and focussed on building an api

      rails new modular_monolith -d mysql --api

Change your database name and password in the `config/database.yml`

      default: &default
        ...
        password: root

      development:
        ...
        database: rails
        ...

The time has come to create the first model. This can be done by:

      rails g model Employee name:string birth_date:date

Rails has created the model in `app/models/employee.rb` but the model
does not contain the given attributes. Thus change the model to

      class Employee < ApplicationRecord
        validates :name, presence: true
        validates :birth_date, presence: true
      end

When trying to change the location of the model rails didn't work. You
can specify one different folder, but not multiple like we need in a
modular monolith. Therefor rails is not a viable option.
