"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// Define the shape of a comment
interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: {
    username: string;
    avatarUrl: string | null;
  };
}

export default function GuestbookPage() {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // Fetch comments from the API
  const fetchComments = async () => {
    try {
      const response = await fetch("/api/guestbook");
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        setNewComment("");
        fetchComments(); // Refresh comments after posting
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const dateFormatted = date.toLocaleDateString();
    const timeFormatted = date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${dateFormatted} ${timeFormatted}`;
  };

  return (
    <div className="pt-8 md:pt-16 pb-8 md:pb-16 px-4">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-handwriting">
          Guestbook
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-mono px-4">
          Leave a comment below. It could be anything – appreciation, feedback,
          or just a friendly hello.
        </p>
      </div>

      <div className="max-w-4xl mx-auto border rounded-lg bg-background font-mono">
        <div className="h-80 md:h-96 overflow-y-auto flex flex-col-reverse p-3 md:p-4 mb-4 border rounded-md">
          {/* Spacer to push comments to the bottom */}
          <div className="flex-grow" />
          <div className="space-y-3 md:space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-2 md:gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden bg-muted">
                  {comment.author.avatarUrl ? (
                    <Image
                      src={comment.author.avatarUrl}
                      alt={comment.author.username}
                      className="w-full h-full object-cover"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">
                        {comment.author.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content area */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-primary font-medium text-sm md:text-base">
                      {`~/${comment.author.username}`}
                    </span>
                    <time className="text-xs text-muted-foreground">
                      {formatDateTime(comment.createdAt)}
                    </time>
                  </div>
                  <p className="whitespace-pre-wrap break-words text-sm md:text-base leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {session ? (
          <div className="p-3 md:p-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* User info row */}
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden bg-muted">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-full h-full object-cover"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">
                        {(session.user?.name || 'U').charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-primary font-medium text-sm md:text-base">
                  {`~/${session.user?.name?.toLowerCase().replace(/\s+/g, '') || 'user'}`}
                </span>
              </div>

              {/* Input and submit row */}
              <div className="flex gap-2 md:gap-3">
                <Input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Leave a message..."
                  className="flex-1 text-sm md:text-base"
                  autoFocus
                />
                <Button type="submit" size="sm" className="px-4 md:px-6">
                  Submit
                </Button>
              </div>
            </form>

            <div className="mt-3 pt-3 border-t">
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center p-4 md:p-6">
            <Button onClick={() => signIn("github")} className="w-full sm:w-auto">
              Sign in with GitHub to comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}