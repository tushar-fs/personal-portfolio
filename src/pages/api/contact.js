import nodemailer from "nodemailer";
import { IncomingForm } from "formidable";
import fs from "fs";

// Disable default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Parse form with formidable
    const form = new IncomingForm({
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Extract form values, ensuring they are strings
    const name = String(fields.name || "");
    const email = String(fields.email || "");
    const subject = String(fields.subject || "");
    const message = String(fields.message || "");
    // Check if attachment exists and has required properties
    const attachment = files && files.attachment ? files.attachment : null;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Configure nodemailer with Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your app password or Gmail password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <p><strong>Message:</strong></p>
            <p>${message.split("\n").join("<br>")}</p>
          </div>
        </div>
      `,
    };

    // If file was uploaded, attach it to email
    if (attachment && attachment.filepath) {
      mailOptions.attachments = [
        {
          filename: attachment.originalFilename || "attachment",
          content: fs.createReadStream(attachment.filepath),
        },
      ];
    }

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    // Return more detailed error for debugging
    return res.status(500).json({
      message: "Failed to send message. Please try again later.",
      error: error.message || "Unknown error",
    });
  }
}
