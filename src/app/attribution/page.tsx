import Link from "next/link";
import { AttributionBg } from "@/components/backgrounds/attribution-bg";
import { PageHeader } from "@/components/page-header";
import inspirations from "@/data/attributions";

export default function AttributionPage() {
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
              <Link href={inspiration.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline custom-cursor">
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