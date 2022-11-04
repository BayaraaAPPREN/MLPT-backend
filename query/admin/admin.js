export const addExamQuery = "INSERT INTO Exam(`Name`, `Level`, `Fee`) VALUES (?)";

export const updateExamQuery = "UPDATE Exam SET `Name`=?,`Level`=?,`Fee`=?, WHERE `id` = ?";