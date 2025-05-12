import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import Project from "@/app/lib/models/Project";
import { auth } from "@/auth";

// GET a single project by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { message: "Error fetching project", error: error.message },
      { status: 500 }
    );
  }
}
