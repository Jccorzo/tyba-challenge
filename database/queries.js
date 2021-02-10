// Users
module.exports.newUser = 'INSERT INTO Users (username, name, password) values (:username, :name, :password)';
module.exports.savedUser = 'Select * FROM Users WHERE username = :username';

// Locations
module.exports.allLocations = 'SELECT * FROM Locations';
module.exports.newLocation = 'INSERT INTO Locations (estado,hora,descripcion,pago,usuario) values (:estado,:hora,:descripcion,:pago,:usuario)';
