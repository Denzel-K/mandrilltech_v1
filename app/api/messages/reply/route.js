import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import Message from "@/app/lib/models/Message";
import { auth } from "@/auth";
import nodemailer from "nodemailer";

// POST to reply to a message
export async function POST(request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { messageId, replyContent } = data;

    if (!messageId || !replyContent) {
      return NextResponse.json(
        { message: "Message ID and reply content are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find the message
    const message = await Message.findById(messageId);

    if (!message) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }

    // Add reply to the message
    message.replies.push({ content: replyContent });
    message.replied = true;
    message.read = true;
    await message.save();

    // Send email reply
    const emailSent = await sendEmailReply(message.email, message.name, replyContent);

    return NextResponse.json(
      { 
        message: "Reply sent successfully", 
        emailSent,
        data: message 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending reply:", error);
    return NextResponse.json(
      { message: "Error sending reply", error: error.message },
      { status: 500 }
    );
  }
}

// Function to send email reply
async function sendEmailReply(recipientEmail, recipientName, replyContent) {
  try {
    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("Email configuration missing. Email not sent.");
      return false;
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `"Mandrill Technologies" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: "Re: Your message to Mandrill Technologies",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #3a86ff; margin: 0;">Mandrill Technologies</h2>
            <p style="color: #666; font-size: 14px;">Response to your inquiry</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p>Hello ${recipientName},</p>
            <p>Thank you for reaching out to Mandrill Technologies. Here's our response to your inquiry:</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #3a86ff; margin-bottom: 20px;">
            <p style="margin: 0; white-space: pre-line;">${replyContent}</p>
          </div>
          
          <div style="margin-top: 30px; font-size: 14px; color: #666;">
            <p>If you have any further questions, feel free to reply to this email or contact us through our website.</p>
            <p>Best regards,<br>Denzel Kariuki<br>Mandrill Technologies</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #999;">
            <p>This is an automated response to your message sent through our website.</p>
            <p>&copy; ${new Date().getFullYear()} Mandrill Technologies. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
