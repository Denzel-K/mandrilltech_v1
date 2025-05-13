"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { FaEnvelope, FaReply, FaCheck } from "react-icons/fa";
import { GiMonkey } from "react-icons/gi";
import AdminLayout from "@/app/components/admin/AdminLayout";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [replySuccess, setReplySuccess] = useState(false);
  const [replyError, setReplyError] = useState("");
  const [filter, setFilter] = useState("all"); // all, unread, replied

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/messages");
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await fetch("/api/messages", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          read: true,
        }),
      });

      if (response.ok) {
        setMessages(
          messages.map((msg) =>
            msg._id === id ? { ...msg, read: true } : msg
          )
        );
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    if (!message.read) {
      markAsRead(message._id);
    }
  };

  const handleSendReply = async () => {
    if (!replyContent.trim()) {
      setReplyError("Reply content cannot be empty");
      return;
    }

    try {
      setSendingReply(true);
      setReplyError("");

      const response = await fetch("/api/messages/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId: selectedMessage._id,
          replyContent,
        }),
      });

      if (response.ok) {
        await response.json(); // We don't need the result since we're updating the UI directly

        // Update the messages list
        setMessages(
          messages.map((msg) =>
            msg._id === selectedMessage._id
              ? {
                  ...msg,
                  replied: true,
                  read: true,
                  replies: [
                    ...(msg.replies || []),
                    { content: replyContent, sentAt: new Date() },
                  ],
                }
              : msg
          )
        );

        // Update the selected message
        setSelectedMessage({
          ...selectedMessage,
          replied: true,
          read: true,
          replies: [
            ...(selectedMessage.replies || []),
            { content: replyContent, sentAt: new Date() },
          ],
        });

        setReplyContent("");
        setReplySuccess(true);

        // Hide success message after 3 seconds
        setTimeout(() => {
          setReplySuccess(false);
        }, 3000);
      } else {
        const error = await response.json();
        setReplyError(error.message || "Failed to send reply");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      setReplyError("An unexpected error occurred");
    } finally {
      setSendingReply(false);
    }
  };

  const filteredMessages = messages.filter((message) => {
    if (filter === "unread") return !message.read;
    if (filter === "replied") return message.replied;
    return true; // "all" filter
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AdminLayout unreadMessages={messages.filter(m => !m.read).length}>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Messages</h1>
          <p className="text-foreground/70">
            View and respond to messages from your website visitors.
          </p>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-primary/10 hover:bg-primary/20"
            }`}
          >
            All Messages
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg ${
              filter === "unread"
                ? "bg-secondary text-white"
                : "bg-secondary/10 hover:bg-secondary/20"
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter("replied")}
            className={`px-4 py-2 rounded-lg ${
              filter === "replied"
                ? "bg-accent text-white"
                : "bg-accent/10 hover:bg-accent/20"
            }`}
          >
            Replied
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 glass rounded-xl p-4 h-[calc(100vh-200px)] overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-8 text-foreground/70">
                No messages found
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div
                  key={message._id}
                  onClick={() => handleSelectMessage(message)}
                  className={`p-4 rounded-lg mb-3 cursor-pointer transition-colors ${
                    selectedMessage?._id === message._id
                      ? "bg-primary/20"
                      : message.read
                      ? "bg-background/50 hover:bg-background/80"
                      : "bg-secondary/10 hover:bg-secondary/20"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">
                      {message.name}
                      {!message.read && (
                        <span className="ml-2 inline-block w-2 h-2 bg-secondary rounded-full"></span>
                      )}
                    </h3>
                    <span className="text-xs text-foreground/50">
                      {format(new Date(message.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-1">{message.subject}</p>
                  <p className="text-xs text-foreground/70 truncate">
                    {message.message.substring(0, 100)}
                    {message.message.length > 100 ? "..." : ""}
                  </p>
                  <div className="flex mt-2 text-xs">
                    <span className="text-foreground/50">{message.email}</span>
                    <div className="ml-auto flex space-x-1">
                      {message.replied && (
                        <span className="text-accent flex items-center">
                          <FaCheck className="mr-1 h-3 w-3" /> Replied
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2 glass rounded-xl p-6 h-[calc(100vh-200px)] overflow-y-auto">
            {selectedMessage ? (
              <div>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{selectedMessage.subject}</h2>
                    <span className="text-sm text-foreground/50">
                      {format(new Date(selectedMessage.createdAt), "MMM d, yyyy h:mm a")}
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <span className="font-semibold">
                        {selectedMessage.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{selectedMessage.name}</p>
                      <p className="text-sm text-foreground/70">{selectedMessage.email}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-background/50 rounded-lg mb-6">
                    <p className="whitespace-pre-line">{selectedMessage.message}</p>
                  </div>
                </div>

                {/* Previous Replies */}
                {selectedMessage.replies && selectedMessage.replies.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Previous Replies</h3>
                    {selectedMessage.replies.map((reply, index) => (
                      <div key={index} className="p-4 bg-primary/10 rounded-lg mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center mr-2">
                              <GiMonkey className="w-4 h-4" />
                            </div>
                            <span className="font-medium">You</span>
                          </div>
                          <span className="text-xs text-foreground/50">
                            {format(new Date(reply.sentAt), "MMM d, yyyy h:mm a")}
                          </span>
                        </div>
                        <p className="whitespace-pre-line">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Reply</h3>
                  {replySuccess && (
                    <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500">
                      Reply sent successfully!
                    </div>
                  )}
                  {replyError && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500">
                      {replyError}
                    </div>
                  )}
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="w-full p-4 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-primary min-h-[150px] mb-4"
                    placeholder="Type your reply here..."
                  ></textarea>
                  <button
                    onClick={handleSendReply}
                    disabled={sendingReply}
                    className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center"
                  >
                    {sendingReply ? (
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
                      <>
                        <FaReply className="mr-2" /> Send Reply
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-foreground/50">
                <div className="text-center">
                  <FaEnvelope className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>Select a message to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
