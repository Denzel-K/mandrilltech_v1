import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Check if the file is an image
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed." },
        { status: 400 }
      );
    }

    // Get file extension
    const fileExtension = file.name.split(".").pop();
    
    // Create a unique filename
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the upload directory and ensure it exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    // Write the file to the upload directory
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Return the path to the uploaded file
    return NextResponse.json({ 
      success: true, 
      filePath: `/uploads/${fileName}` 
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Error uploading file", details: error.message },
      { status: 500 }
    );
  }
}
