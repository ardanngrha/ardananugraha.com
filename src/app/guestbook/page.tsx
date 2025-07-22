"use client";

import { GuestbookBg } from "@/components/backgrounds/guestbook-bg";
import { PageHeader } from "@/components/page-header";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { Input } from "@/components/ui/input"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import Comment from "@/types/guestbook";

export default function GuestbookPage() {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
    }
  };

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch("/api/guestbook");
      if (response.ok) {
        const data = await response.json();
        setComments(data);
        setTimeout(scrollToBottom, 100);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

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
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div>
      <PageHeader
        title="Guestbook"
        description="Leave a comment below. It could be anything – appreciation, feedback,
          or just a friendly hello."
        background={<GuestbookBg />}
      />

      <div className="max-w-4xl mx-auto border rounded-lg bg-background font-mono p-4 my-16">
        <ScrollArea className="h-80 md:h-96 rounded-md border p-4">
          <div className="flex-grow" />
          <div className="space-y-3 md:space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-2 md:gap-3">
                <Avatar>
                  <AvatarImage src={comment.author.image || ""} />
                  <AvatarFallback>{comment.author.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-primary font-medium text-sm">
                      {`~/${comment.author.username}`}
                    </span>
                    <time className="text-xs text-muted-foreground">
                      {formatDateTime(comment.createdAt)}
                    </time>
                  </div>
                  <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {session ? (
          <div className="p-3 md:p-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex items-center gap-2 md:gap-3">
                <Avatar>
                  <AvatarImage src={session.user?.image || ""} />
                  <AvatarFallback>{(session.user?.username || 'U').charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-primary font-medium text-sm">
                  {`~/${session.user?.username || 'user'}`}
                </span>
              </div>
              <div className="flex gap-2 md:gap-3">
                <Input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Leave a message..."
                  className="flex-1 text-sm"
                  autoFocus
                />
                <Button type="submit" size="default" variant="outline" className="px-4 md:px-6 cursor-pointer">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center p-4 md:p-6">
            <Button onClick={() => signIn("github")} variant="outline" className="w-full sm:w-auto cursor-pointer">
              Sign in with <FaGithub className="inline-block mx-1" /> to comment
            </Button>
          </div>
        )}
      </div>
    </div >
  );
}