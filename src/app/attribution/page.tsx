import Link from "next/link";

export default function AttributionPage() {
  const inspirations = [
    { name: "Theodorus Clarence", url: "https://theodorusclarence.com/" },
    { name: "Wiscaksono", url: "https://wiscaksono.com/" },
    // Add more inspirations here
  ];

  return (
    <div className="pt-8 md:pt-16 pb-8 md:pb-16">
      {/* Centered title section */}
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 font-handwriting">Attributions</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
          A special thanks to the creative minds who inspired this website. My design and structure are heavily influenced by their amazing work.
        </p>
      </div>

      {/* Inspirations content */}
      <div className="max-w-2xl mx-auto">
        <ul className="space-y-4">
          {inspirations.map((inspiration) => (
            <li key={inspiration.name} className="text-center">
              <Link href={inspiration.url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold hover:underline">
                {inspiration.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}