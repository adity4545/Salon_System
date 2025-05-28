const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const ExcelJS = require('exceljs');
const path = require('path');

const contactUs = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User Not found, Please Signup");
  }

  // validaton
  if (!subject || !message) {
    res.status(400);
    throw new Error("Please add Subjects and Message");
  }

  // Save to Excel
  const filePath = path.join(__dirname, '../contact_submissions.xlsx');
  const workbook = new ExcelJS.Workbook();
  let worksheet;

  // If file exists, load it; otherwise, create new
  try {
    await workbook.xlsx.readFile(filePath);
    worksheet = workbook.getWorksheet('Submissions');
  } catch {
    worksheet = workbook.addWorksheet('Submissions');
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Subject', key: 'subject', width: 30 },
      { header: 'Message', key: 'message', width: 50 },
      { header: 'Date', key: 'date', width: 20 },
    ];
  }

  worksheet.addRow({
    name: user.name,
    email: user.email,
    subject,
    message,
    date: new Date().toLocaleString(),
  });

  await workbook.xlsx.writeFile(filePath);

  // No email sending, just respond success
  res.status(200).json({ success: true, message: "Contact submission saved to Excel" });
});

module.exports = {
  contactUs,
};
