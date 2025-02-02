const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
// const port = 3000;

const app = express();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

router.post('/send', async (req, res) => {
  const { fromName, subject, message } = req.body;
  console.log(req.body);

  let output = `
  <p>You have a new Inquiry</p>
  <h3>Contact Details</h3>
  <ul>
  <li>Name: ${fromName}</li>
  <li>Email: ${req.body.email}</li>
  <li>Query: ${subject}</li>
  </ul>
  <h3>Message</h3>
  <p>${message}</p>`;
  console.log(output);

  try {
    const mailOptions = {
      from: `"NodeMailer"<${process.env.MAIL_USER}>`,
      to: process.env.EMAIL_ID,
      subject: subject,
      html: output,
    };

    const emailInfo = await transporter.sendMail(mailOptions);
    // console.log(mailOptions);
    console.log('Email sent:', emailInfo.response);
    res.status(200).json({ success: true, message: 'Email sent succesfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

module.exports = router;
