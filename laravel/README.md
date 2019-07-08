The versions used are:

-   php 7.2.11

-   composer 1.8.5

-   laravel 5.8.19

First install laravel via composer

      composer global require laravel/installer

Then create the laravel project

      laravel new modular_monolith

Unlike some other frameworks you need to create the migrations yourself
by running:

      php artisan make:migration create_employees_table
      php artisan make:migration create_shifts_table
      php artisan make:migration create_employee_shift_table

There will be a file created in `database/migrations` which ends with
`create_employees_table`. Replace the `up` function with this:

      Schema::create('employee', function (Blueprint $table) {
        $table->increments('id');
        $table->string( 'name');
        $table->date('birth_date');
        $table->string('email');
      });

And for the file that ends with `create_shifts_table`

      Schema::create('shifts', function (Blueprint $table) {
        $table->increments('id');
        $table->string('title');
        $table->date('start');
        $table->date('end');
      });

Now last of all the table that connects the two models needs to be made.
This is because it is a many to many relation. Laravel does not pick
this us automatically. Therefore again replace the `up` function of the
file that ends with `create_employee_shift_table`

      Schema::create('employee_shift', function (Blueprint $table) {
          $table->bigIncrements('id');

          $table->integer('employee_id')->unsigned()->nullable();
          $table->foreign('employee_id')->references('id')
              ->on('employees')->onDelete('cascade');

          $table->integer('shift_id')->unsigned()->nullable();
          $table->foreign('shift_id')->references('id')
              ->on('shifts')->onDelete('cascade');
      });

First the `.env` needs to know the database settings. Replace these
variables

      DB_DATABASE=laravel
      DB_USERNAME=root
      DB_PASSWORD=root

Now migrate the database by running

      php artisan migrate

Then create the Employee model in `app/Employees/Employee.php`

      <?php
      namespace App\Employees;

      use Illuminate\Database\Eloquent\Model;

      class Employee extends Model
      {
          public $name;
          public $birth_date;
          public $email;
          public $fillable = ['name', 'birth_date', 'email'];
          public $timestamps = false;

          public function shifts()
          {
              return $this->belongsToMany(\App\Shifts\Api::getModel());
          }
      }

Then the controller for Employees will be created:

      <?php
      namespace App\Employees;

      use App\Http\Controllers\Controller;
      use Illuminate\Http\Request;

      class EmployeeController extends Controller
      {
          public function index()
          {
              return response()->json(Employee::with('shifts')->get());
          }

          public function store(Request $request)
          {
              $employee = $request->all();
              $employee['birth_date'] = \Carbon\Carbon::parse($employee['birth_date']);

              return Employee::create($employee);
          }

          public function show($id)
          {
              return Employee::with('shifts')->find($id);
          }
      }

Next is the shift model

      <?php
      namespace App\Shifts;

      use Illuminate\Database\Eloquent\Model;

      class Shift extends Model
      {
          public $title;
          public $start;
          public $end;

          public $fillable = ['title', 'start', 'end'];
          public $timestamps = false;

          public function employees()
          {
              return $this->belongsToMany(\App\Employees\Api::getModel());
          }
      }

And the matching Controller:

      <?php
      namespace App\Shifts;

      use App\Http\Controllers\Controller;
      use Illuminate\Http\Request;

      class ShiftController extends Controller
      {
          public function index()
          {
              return response()->json(Shift::with(['employees'])->get());
          }

          public function store(Request $request)
          {
              $shiftArray = $request->all();
              $shiftArray['start'] = \Carbon\Carbon::parse($shiftArray['start']);
              $shiftArray['end'] = \Carbon\Carbon::parse($shiftArray['end']);

              $shift = Shift::create($shiftArray);

              $shift->employees()->sync($shiftArray['employees']);

              return $shift;
          }

          public function show($id)
          {
              return Shift::with(['employees'])->find($id);
          }
      }

Now the urls can be mapped to the controller by adding this to the
`url/web.php`

      Route::resources([
        'employees' => '\App\Employees\EmployeeController',
        'shifts' => '\App\Shifts\ShiftController'
      ]);

The last thing to do is disable csrf for the paths. This can be done in
`app/Http/Middelware/VerifyCsrfToken.php`

      protected $except = [
        'employees',
        'shifts'
      ];

Now run the app with

      php artisan serve
