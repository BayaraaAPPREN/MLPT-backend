export const forgotPassword = `UPDATE User SET Password = ? WHERE userId = ?`;
export const changeEmail = `UPDATE User SET Email = ? WHERE userId = ?`;
export const deleteUser = `DELETE FROM User WHERE userId = ?`;
export const getUserById = `Select * FROM User WHERE userId = ?`;
export const getAllUser = `Select * FROM User`;
