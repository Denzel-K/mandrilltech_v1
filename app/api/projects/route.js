import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import Project from "@/app/lib/models/Project";

// GET all projects
export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    // Return empty array instead of error to handle gracefully on the client
    return NextResponse.json([]);
  }
}

// POST a new project
export async function POST(request) {
  try {

    const data = await request.json();
    await connectToDatabase();

    const project = new Project({
      title: data.title,
      description: data.description,
      technologies: data.technologies,
      category: data.category,
      imageUrl: data.imageUrl,
      liveUrl: data.liveUrl,
      githubUrl: data.githubUrl,
      downloadUrl: data.downloadUrl,
      featured: data.featured || false,
      inProgress: data.inProgress || false,
    });

    await project.save();

    return NextResponse.json(
      { message: "Project created successfully", project },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating project", error: error.message },
      { status: 500 }
    );
  }
}

// PUT (update) a project
export async function PUT(request) {
  try {
    const data = await request.json();
    console.log("Received update data:", data);
    await connectToDatabase();

    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }

    // If imageUrl is not provided, we need to get the existing one
    if (!updateData.imageUrl) {
      const existingProject = await Project.findById(id);
      if (existingProject) {
        updateData.imageUrl = existingProject.imageUrl;
      } else {
        return NextResponse.json(
          { message: "Project not found" },
          { status: 404 }
        );
      }
    }

    const project = await Project.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Project updated successfully", project },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating project", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE a project
export async function DELETE(request) {
  try {

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting project", error: error.message },
      { status: 500 }
    );
  }
}
