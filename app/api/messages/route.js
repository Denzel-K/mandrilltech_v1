import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import Message from "@/app/lib/models/Message";

// GET all messages
export async function GET() {
  try {

    await connectToDatabase();
    const messages = await Message.find({}).sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    // Return empty array instead of error to handle gracefully on the client
    return NextResponse.json([]);
  }
}

// POST a new message
export async function POST(request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Create new message
    const message = new Message({
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      location: data.location || "",
      subject: data.subject,
      message: data.message,
    });

    // Save to database
    const savedMessage = await message.save();
    console.log("Message saved to database:", savedMessage._id);

    return NextResponse.json(
      {
        message: "Message sent successfully",
        id: savedMessage._id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving message to database:", error);
    return NextResponse.json(
      { message: "Error sending message", error: error.message },
      { status: 500 }
    );
  }
}

// PUT (update) a message
export async function PUT(request) {
  try {

    const data = await request.json();
    await connectToDatabase();

    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { message: "Message ID is required" },
        { status: 400 }
      );
    }

    const message = await Message.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!message) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Message updated successfully", data: message },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating message", error: error.message },
      { status: 500 }
    );
  }
}
