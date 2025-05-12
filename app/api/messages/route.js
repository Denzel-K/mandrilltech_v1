import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import Message from "@/app/lib/models/Message";
import { getServerSession } from "next-auth";
import { auth } from "@/auth";

// GET all messages (protected)
export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

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
    await connectToDatabase();

    const message = new Message({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    await message.save();

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error sending message", error: error.message },
      { status: 500 }
    );
  }
}

// PUT (update) a message (protected)
export async function PUT(request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

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
