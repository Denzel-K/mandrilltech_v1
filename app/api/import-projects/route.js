import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import Project from "@/app/lib/models/Project";

// Old projects data
const oldProjects = [
  {
    "title": "Responsive Intro Section",
    "description": "Responsive Intro Section is a responsive web application built as part of the Frontend Mentor challenges. It demonstrates my skills in creating user-friendly interfaces with clean, maintainable code.",
    "technologies": ["HTML", "CSS", "JavaScript"],
    "category": "Web",
    "imageUrl": "/uploads/intro-section.png",
    "liveUrl": "https://denzel-k.github.io/intro-section/",
    "githubUrl": "https://github.com/Denzel-K/intro-section",
    "featured": false,
    "createdAt": new Date("2022-08-20")
  },
  {
    "title": "Time Tracking Dashboard",
    "description": "Time Tracking Dashboard is a responsive web application built as part of the Frontend Mentor challenges. It demonstrates my skills in creating user-friendly interfaces with clean, maintainable code.",
    "technologies": ["HTML", "CSS", "JavaScript"],
    "category": "Web",
    "imageUrl": "/uploads/time-tracker.png",
    "liveUrl": "https://denzel-k.github.io/time-tracker/",
    "githubUrl": "https://github.com/Denzel-K/time-tracker/tree/update",
    "featured": false,
    "createdAt": new Date("2022-08-30")
  },
  {
    "title": "Social Media Tracker (With Theme Switch)",
    "description": "Social Media Tracker is a responsive web application with theme switching functionality built as part of the Frontend Mentor challenges. It demonstrates my skills in creating user-friendly interfaces with clean, maintainable code.",
    "technologies": ["HTML", "CSS", "JavaScript", "CSS Variables"],
    "category": "Web",
    "imageUrl": "/uploads/theme-switcher.png",
    "liveUrl": "https://denzel-k.github.io/theme-switcher-dashboard/",
    "githubUrl": "https://github.com/Denzel-K/theme-switcher-dashboard",
    "featured": false,
    "createdAt": new Date("2022-07-12")
  },
  {
    "title": "Spendings Chart Component (chart.js)",
    "description": "Spendings Chart Component is a responsive web application built with Chart.js as part of the Frontend Mentor challenges. It demonstrates my skills in data visualization and creating user-friendly interfaces.",
    "technologies": ["HTML", "CSS", "JavaScript", "Chart.js"],
    "category": "Web",
    "imageUrl": "/uploads/chart-component.png",
    "liveUrl": "https://denzel-k.github.io/Chart-Component/",
    "githubUrl": "https://github.com/Denzel-K/Chart-Component",
    "featured": false,
    "createdAt": new Date("2024-01-13")
  },
  {
    "title": "MultiStep Form",
    "description": "MultiStep Form is a responsive web application built as part of the Frontend Mentor challenges. It demonstrates my skills in form validation and creating user-friendly interfaces with clean, maintainable code.",
    "technologies": ["HTML", "CSS", "JavaScript", "Form Validation"],
    "category": "Web",
    "imageUrl": "/uploads/multistepForm.png",
    "liveUrl": "https://denzel-k.github.io/multistepForm/",
    "githubUrl": "https://github.com/Denzel-K/multistepForm",
    "featured": false,
    "createdAt": new Date("2024-01-30")
  },
  {
    "title": "Testimonials Slider",
    "description": "Testimonials Slider is a responsive web application built as part of the Frontend Mentor challenges. It demonstrates my skills in creating interactive sliders and user-friendly interfaces with clean, maintainable code.",
    "technologies": ["HTML", "CSS", "JavaScript", "Swiper.js"],
    "category": "Web",
    "imageUrl": "/uploads/testimonials-slider.png",
    "liveUrl": "https://denzel-k.github.io/testimonials/",
    "githubUrl": "https://github.com/Denzel-K/testimonials",
    "featured": false,
    "createdAt": new Date("2022-10-14")
  }
];

// POST to import projects
export async function GET() {
  try {
    await connectToDatabase();
    
    const results = {
      success: [],
      skipped: [],
      errors: []
    };
    
    for (const project of oldProjects) {
      try {
        // Check if project with same title already exists
        const existingProject = await Project.findOne({ title: project.title });
        
        if (existingProject) {
          results.skipped.push(project.title);
          continue;
        }
        
        // Create the project
        await Project.create({
          ...project,
          updatedAt: new Date()
        });
        
        results.success.push(project.title);
      } catch (error) {
        results.errors.push({
          title: project.title,
          error: error.message
        });
      }
    }
    
    return NextResponse.json({
      message: "Import process completed",
      results
    });
  } catch (error) {
    console.error("Error importing projects:", error);
    return NextResponse.json(
      { error: "Failed to import projects", details: error.message },
      { status: 500 }
    );
  }
}
