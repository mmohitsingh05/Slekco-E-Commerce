import { content } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export function AnnouncementBar() {
  return (
    <div className="border-b border-accent-hover bg-accent">
      <Container className="flex items-center justify-center py-2">
        <p className="text-body-sm font-medium text-surface">{content.announcement}</p>
      </Container>
    </div>
  );
}