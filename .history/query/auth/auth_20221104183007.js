const q = "SELECT type FROM User WHERE Email = ? & Password = ?";
export default q;
export const checkUserExit = "SELECT * FROM User WHERE Email = ?";

const q =
  "INSERT INTO User (`Email`, `Password`,`PhoneNo`,`Nationality`,`Fname`,`Lname`,`type`) VALUE (?)";
export default q;