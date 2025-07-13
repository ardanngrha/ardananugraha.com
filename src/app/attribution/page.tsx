import Link from "next/link";
import { AttributionBg } from "@/components/backgrounds/attribution-bg";
import { PageHeader } from "@/components/page-header";

export default function AttributionPage() {
  const inspirations = [
    { name: "Theodorus Clarence", url: "https://theodorusclarence.com/" },
    { name: "Wiscaksono", url: "https://wiscaksono.com/" },
  ];

  return (
    <div>
      <PageHeader
        title="Attribution"
        description="Journey to build this website. A special thanks to the creative minds who inspired this website."
        background={<AttributionBg />}
      />
      <div className="max-w-2xl mx-auto px-4 py-16">
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
    </div >
  );
}