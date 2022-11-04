const q = "SELECT type FROM User WHERE Email = ? & Password = ?";
export default q;
const q = "SELECT * FROM User WHERE Email = ?";
export default q;
const q =
  "INSERT INTO User (`Email`, `Password`,`PhoneNo`,`Nationality`,`Fname`,`Lname`,`type`) VALUE (?)";
export default q;
