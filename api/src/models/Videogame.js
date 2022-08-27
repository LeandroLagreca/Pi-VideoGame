const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT, // permite numeros con decimales
      
    },
    released: {
      type: DataTypes.DATE,
      defaultValue:DataTypes.NOW,
      
    },
    image:{
      type: DataTypes.STRING,
      
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),  //viene en un arreglo de obj de plataformas
      allowNull: false,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },
    {
      timestamps: false
    
    });

};
