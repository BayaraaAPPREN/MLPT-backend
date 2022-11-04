export const checkIsAdmin =
  "SELECT type FROM User WHERE Email = ? & Password = ?";
export const checkUserExit = "SELECT * FROM User WHERE Email = ?";
export const createNewUser =
  "INSERT INTO User (`Email`, `Password`,`PhoneNo`,`Nationality`,`Fname`,`Lname`,`type`) VALUE (?)";
