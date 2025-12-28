const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const submitContact = async (req, res) => {
  try {
    console.log("ENV CHECK:", {
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS ? "LOADED" : "MISSING"
    });

    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();
    console.log("Saved to DB");

    // ✅ CREATE TRANSPORTER HERE (IMPORTANT)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"MKM Engineering" <${process.env.EMAIL_USER}>`,
      to: "mkmengineeringworks2023@gmail.com",
      subject: "New Customer Enquiry – MKM Engineering",
      html: `
    <div style="font-family: Arial, Helvetica, sans-serif; color:#333; line-height:1.6;">

      <h2 style="color:#1a1a1a; border-bottom:2px solid #4682B4; padding-bottom:6px;">
        📩 New Customer Enquiry
      </h2>

      <p>A new enquiry has been submitted through the <strong>MKM Engineering website</strong>.</p>

      <!-- CUSTOMER DETAILS -->
      <h3 style="color:#4682B4; margin-top:20px;">👤 Customer Contact Details</h3>

      <table style="border-collapse: collapse; width:100%;">
        <tr>
          <td style="padding:8px; font-weight:bold; width:30%;">Name</td>
          <td style="padding:8px;">${name}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Email</td>
          <td style="padding:8px;">${email}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Phone</td>
          <td style="padding:8px;">${phone || "Not provided"}</td>
        </tr>
      </table>

      <!-- CUSTOMER MESSAGE -->
      <h3 style="color:#4682B4; margin-top:20px;">📝 Customer Message</h3>
      <p style="background:#f5f5f5; padding:12px; border-left:4px solid #4682B4;">
        ${message}
      </p>

      <hr style="margin:30px 0;">

      <!-- COMPANY FOOTER -->
      <p style="font-size:14px; color:#555;">
        This enquiry was generated automatically from the MKM Engineering website.
      </p>

      <p style="font-size:14px; color:#888;">
        <strong>MKM Engineering</strong><br>
        Sarada Devi, Beside CRI Foundry,<br>
        Ramakrishnapuram, Coimbatore – 641006<br>
        📞 +91 82207 18067 | 📧 mkmengineeringworks2023@gmail.com
      </p>

    </div>
  `
    });


    console.log("Email sent successfully");

    res.status(200).json({ message: "Message sent successfully" });

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { submitContact };
