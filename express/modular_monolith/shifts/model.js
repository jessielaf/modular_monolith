export default (sequelize, DataTypes) => {
  const Shift = sequelize.define(
    "Shift",
    {
      title: DataTypes.STRING,
      start: DataTypes.STRING,
      end: DataTypes.DATE
    },
    {}
  );

  Shift.associate = models => {
    models.Shift.belongsToMany(models.Employee, {
      onDelete: "CASCADE",
      through: "ShiftEmployee"
    });
  };

  return Shift;
};
