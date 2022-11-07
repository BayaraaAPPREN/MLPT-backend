export const getAllExamList = `SELECT e.examId, e.Name, e.Level, e.Fee, t.testId, t.TaoId, t.Date FROM Exam e INNER JOIN Test t ON e.examId = t.examId`;
