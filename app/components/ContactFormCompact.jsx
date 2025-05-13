"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaCheckCircle, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactFormCompact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [userLocation, setUserLocation] = useState("");

  // Get user's location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
              );
              const data = await response.json();

              // Extract city and country
              const city = data.address.city ||
                          data.address.town ||
                          data.address.village ||
                          data.address.county ||
                          "Unknown";
              const country = data.address.country || "Unknown";

              setUserLocation(`${city}, ${country}`);
            } catch (error) {
              console.error("Error fetching location data:", error);
              setUserLocation("");
            }
          }, (error) => {
            console.error("Geolocation error:", error);
            setUserLocation("");
          });
        }
      } catch (error) {
        console.error("Location detection error:", error);
      }
    };

    fetchLocation();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  // Set location value when it's available
  useEffect(() => {
    if (userLocation) {
      setValue("location", userLocation);
    }
  }, [userLocation, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError("");

    // Make sure subject is set (use message as fallback)
    if (!data.subject) {
      data.subject = data.message.substring(0, 50) + (data.message.length > 50 ? '...' : '');
    }

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const result = await response.json();
      console.log("Message sent successfully:", result);
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitError(error.message || "Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Get in Touch</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Have a project in mind or want to discuss a collaboration?
          </p>
        </motion.div>

        <div className="glass p-6 md:p-8 rounded-xl max-w-3xl mx-auto">
          <div>
            {/* Contact Form */}
            <div>
              {submitSuccess ? (
                <div className="text-center py-8">
                  <FaCheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    Thank you for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="btn px-5 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        id="name"
                        {...register("name")}
                        className={`w-full px-4 py-2 rounded-lg glass focus:outline-none focus:ring-1 focus:ring-primary ${
                          errors.name ? "ring-1 ring-red-500" : ""
                        }`}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className={`w-full px-4 py-2 rounded-lg glass focus:outline-none focus:ring-1 focus:ring-primary ${
                          errors.email ? "ring-1 ring-red-500" : ""
                        }`}
                        placeholder="Your email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="tel"
                        id="phone"
                        {...register("phone")}
                        className={`w-full px-4 py-2 rounded-lg glass focus:outline-none focus:ring-1 focus:ring-primary ${
                          errors.phone ? "ring-1 ring-red-500" : ""
                        }`}
                        placeholder="+254 XXX XXX XXX"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="relative">
                        <input
                          type="text"
                          id="location"
                          {...register("location")}
                          className={`w-full px-4 py-2 pl-8 rounded-lg glass focus:outline-none focus:ring-1 focus:ring-primary ${
                            errors.location ? "ring-1 ring-red-500" : ""
                          }`}
                          placeholder={userLocation || "Your location"}
                          defaultValue={userLocation}
                        />
                        <FaMapMarkerAlt className="absolute left-3 top-3 text-primary text-xs" />
                      </div>
                      {errors.location && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.location.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      id="subject"
                      {...register("subject")}
                      className={`w-full px-4 py-2 rounded-lg glass focus:outline-none focus:ring-1 focus:ring-primary ${
                        errors.subject ? "ring-1 ring-red-500" : ""
                      }`}
                      placeholder="Subject of your message"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <textarea
                      id="message"
                      {...register("message")}
                      rows={4}
                      className={`w-full px-4 py-2 rounded-lg glass focus:outline-none focus:ring-1 focus:ring-primary ${
                        errors.message ? "ring-1 ring-red-500" : ""
                      }`}
                      placeholder="Your message"
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
                      {submitError}
                    </div>
                  )}

                  <div className="flex flex-col">
                    <div className="text-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn px-16 py-2 rounded-full bg-primary text-white disabled:opacity-70 inline-flex items-center justify-center text-sm"
                      >
                        {isSubmitting ? (
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
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </button>
                    </div>

                    <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <div className="flex items-start">
                        <FaInfoCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                        <p className="text-xs text-foreground/70 leading-relaxed opacity-50">
                          When you submit this form, your message will be stored in my secure database.
                          I'll receive a notification and respond to your inquiry via email as soon as possible,
                          typically within 24 hours during business days. Your contact information will only be
                          used to respond to your inquiry and will not be shared with third parties.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormCompact;
