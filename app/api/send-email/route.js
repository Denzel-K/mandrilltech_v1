import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectToDatabase from "@/app/lib/db";
import Message from "@/app/lib/models/Message";
import { getServerSession } from "next-auth";
import { auth } from "@/auth";

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

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      secure: process.env.EMAIL_SERVER_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Denzel Kariuki" <${process.env.EMAIL_FROM}>`,
      to: message.email,
      subject: `Re: ${message.subject}`,
      text: replyContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #3a86ff, #ff006e); padding: 20px; color: white; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0;">Mandrill Technologies</h1>
          </div>
          <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
            <p>Hello ${message.name},</p>
            <p>Thank you for reaching out to me. Here's my response to your inquiry:</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #3a86ff; margin: 20px 0;">
              ${replyContent.replace(/\n/g, '<br>')}
            </div>
            <p>If you have any further questions, feel free to reply to this email or contact me directly.</p>
            <p>Best regards,<br>Denzel Kariuki<br>Mandrill Technologies</p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Mandrill Technologies. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    // Update message in database
    message.replied = true;
    message.replies.push({
      content: replyContent,
      sentAt: new Date(),
    });

    await message.save();

    return NextResponse.json(
      { message: "Reply sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error sending reply", error: error.message },
      { status: 500 }
    );
  }
}
