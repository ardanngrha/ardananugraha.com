"use client";

import { GuestbookBg } from "@/components/backgrounds/guestbook-bg";
import { PageHeader } from "@/components/page-header";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSession, signIn } from "next-auth/react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { Input } from "@/components/ui/input"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Comment } from "@/types/guestbook";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const commentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

const formVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      delay: 0.3,
    },
  },
};

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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <PageHeader
        title="Guestbook"
        description="Leave a comment below. It could be anything – appreciation, feedback,
          or just a friendly hello."
        background={<GuestbookBg />}
      />

      <motion.div
        className="max-w-4xl mx-auto border rounded-lg bg-background font-mono p-4 my-16"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <ScrollArea className="h-80 md:h-96 rounded-md border p-4" ref={commentsContainerRef}>
          <div className="flex-grow" />
          <motion.div
            className="space-y-3 md:space-y-4"
            variants={containerVariants}
          >
            <AnimatePresence>
              {comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  className="flex items-start gap-2 md:gap-3"
                  variants={commentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  custom={index}
                  whileHover={{
                    scale: 1.01,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    },
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: index * 0.05,
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={comment.author.image || ""} />
                      <AvatarFallback>{comment.author.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <motion.div
                      className="flex items-center justify-between gap-2 mb-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <span className="text-primary font-medium text-sm">
                        {`~/${comment.author.username}`}
                      </span>
                      <time className="text-xs text-muted-foreground">
                        {formatDateTime(comment.createdAt)}
                      </time>
                    </motion.div>
                    <motion.p
                      className="whitespace-pre-wrap break-words text-sm leading-relaxed"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 + 0.15 }}
                    >
                      {comment.content}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </ScrollArea>

        <AnimatePresence mode="wait">
          {session ? (
            <motion.div
              className="p-3 md:p-4"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              key="signed-in"
            >
              <form onSubmit={handleSubmit} className="space-y-3">
                <motion.div
                  className="flex items-center gap-2 md:gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={session.user?.image || ""} />
                      <AvatarFallback>{(session.user?.username || 'U').charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <span className="text-primary font-medium text-sm">
                    {`~/${session.user?.username || 'user'}`}
                  </span>
                </motion.div>
                <motion.div
                  className="flex gap-2 md:gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Leave a message..."
                    className="flex-1 text-sm"
                    autoFocus
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button type="submit" size="default" variant="outline" className="px-4 md:px-6 cursor-pointer">
                      Submit
                    </Button>
                  </motion.div>
                </motion.div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              className="text-center p-4 md:p-6"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              key="signed-out"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button onClick={() => signIn("github")} variant="outline" className="w-full sm:w-auto cursor-pointer">
                  Sign in with <FaGithub className="inline-block mx-1" /> to comment
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}