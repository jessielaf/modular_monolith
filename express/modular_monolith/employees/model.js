export default (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      name: DataTypes.STRING,
      birth_date: DataTypes.DATE,
      email: DataTypes.STRING
    },
    {}
  );

  Employee.associate = models => {
    // associations can be defined here
  };

  return Employee;
};
