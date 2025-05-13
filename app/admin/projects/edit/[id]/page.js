"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";
import AdminLayout from "@/app/components/admin/AdminLayout";

export default function EditProjectPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetchingProject, setFetchingProject] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [],
    category: "Web",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
  });

  const [techInput, setTechInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      setFetchingProject(true);
      const response = await fetch(`/api/projects/${id}`);

      if (response.ok) {
        const project = await response.json();
        setFormData({
          title: project.title,
          description: project.description,
          technologies: project.technologies,
          category: project.category,
          imageUrl: project.imageUrl,
          liveUrl: project.liveUrl || "",
          githubUrl: project.githubUrl || "",
          featured: project.featured,
        });

        // If there's an existing image, set it as preview
        if (project.imageUrl) {
          setPreviewUrl(project.imageUrl.startsWith('http')
            ? project.imageUrl
            : `${window.location.origin}${project.imageUrl}`);
        }
      } else {
        setError("Failed to fetch project");
        console.error("Failed to fetch project");
      }
    } catch (error) {
      console.error("Error fetching project:", error);
      setError("An error occurred while fetching the project");
    } finally {
      setFetchingProject(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleTechKeyDown = (e) => {
    if (e.key === "Enter" && techInput.trim()) {
      e.preventDefault();
      if (!formData.technologies.includes(techInput.trim())) {
        setFormData({
          ...formData,
          technologies: [...formData.technologies, techInput.trim()],
        });
      }
      setTechInput("");
    }
  };

  const handleRemoveTech = (tech) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Create a preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) return null;

    try {
      setUploadProgress(10);
      const formData = new FormData();
      formData.append("file", selectedFile);

      setUploadProgress(30);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      setUploadProgress(70);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to upload image");
      }

      const data = await response.json();
      setUploadProgress(100);
      return data.filePath;
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Error uploading image: " + error.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // First upload the image if one is selected
      let imageUrl = formData.imageUrl;

      if (selectedFile) {
        const uploadedPath = await uploadImage();
        if (uploadedPath) {
          imageUrl = uploadedPath;
        } else {
          throw new Error("Failed to upload image");
        }
      }

      // Then update the project with the image URL
      const response = await fetch("/api/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          ...formData,
          imageUrl,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/projects");
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      setError("An unexpected error occurred: " + error.message);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  if (fetchingProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Edit Project</h1>
              <p className="text-foreground/70">
                Update your portfolio project
              </p>
            </div>
            <Link
              href="/admin/projects"
              className="px-4 py-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back to Projects
            </Link>
          </div>

          {success ? (
            <div className="glass rounded-xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Project Updated Successfully!</h2>
              <p className="text-foreground/70 mb-6">
                Your project has been updated.
              </p>
              <p className="text-sm text-foreground/50">
                Redirecting to projects page...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-xl p-6">
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="My Awesome Project"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Web">Web</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Describe your project..."
                ></textarea>
              </div>

              <div className="mb-6">
                <label htmlFor="technologies" className="block text-sm font-medium mb-2">
                  Technologies *
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="px-3 py-1 rounded-full bg-primary/10 text-sm flex items-center"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(tech)}
                        className="ml-2 text-foreground/50 hover:text-foreground"
                      >
                        <FaTimes className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  id="technologies"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={handleTechKeyDown}
                  className="w-full px-4 py-3 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Type a technology and press Enter (e.g., React, Node.js)"
                />
                <p className="mt-1 text-xs text-foreground/50">
                  Press Enter to add each technology
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="projectImage" className="block text-sm font-medium mb-2">
                    Project Image *
                  </label>
                  <div className="mb-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <input
                          type="file"
                          id="projectImage"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="projectImage"
                          className="w-full px-4 py-3 rounded-lg glass border border-dashed border-primary/50 flex items-center justify-center cursor-pointer hover:bg-primary/5 transition-colors"
                        >
                          {selectedFile ? (
                            <span className="text-sm">{selectedFile.name}</span>
                          ) : (
                            <span className="text-sm text-foreground/70">Click to upload new image</span>
                          )}
                        </label>
                      </div>
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="w-20 h-1 bg-background rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {previewUrl && (
                    <div className="mt-2 relative w-full h-40 rounded-lg overflow-hidden">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="mt-2">
                    <p className="text-xs text-foreground/50">Or provide an image URL:</p>
                    <input
                      type="url"
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-primary mt-1"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="liveUrl" className="block text-sm font-medium mb-2">
                    Live URL
                  </label>
                  <input
                    type="url"
                    id="liveUrl"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="githubUrl" className="block text-sm font-medium mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div className="mb-8">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="h-4 w-4 rounded text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm">Feature this project on your portfolio</span>
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" /> Update Project
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
