import Link from "next/link";
import { AttributionBg } from "@/components/backgrounds/attribution-bg";
import { PageHeader } from "@/components/page-header";

export default function AttributionPage() {
  const inspirations = [
    { name: "Theodorus Clarence", url: "https://theodorusclarence.com/", reason: "for the portfolio design inspiration." },
    { name: "Wiscaksono", url: "https://wiscaksono.com/", reason: "for creative layout and guestbook ideas." },
  ];

  return (
    <div>
      <PageHeader
        title="Attribution"
        description="This website was made possible by the inspiration and work of many talented individuals and projects."
        background={<AttributionBg />}
      />
      <div className=" mx-auto py-16">
        <ul className="text-left">
          {inspirations.map((inspiration) => (
            <li key={inspiration.name} className="text-lg">
              <Link href={inspiration.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                {inspiration.name}
              </Link>
              <span className="text-muted-foreground"> - {inspiration.reason}</span>
            </li>
          ))}
        </ul>
      </div>
    </div >
  );
}