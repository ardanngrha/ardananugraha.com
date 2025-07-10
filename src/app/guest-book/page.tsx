import Giscus from "@/components/giscus";

export default function GuestbookPage() {
  return (
    <div className="pt-8 md:pt-16 pb-8 md:pb-16">
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 font-handwriting">Guestbook</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
          Leave a comment below. It could be anything – appreciation, feedback, or just a friendly hello.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Giscus />
      </div>
    </div>
  );
}