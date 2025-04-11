import type { ChangeLog } from "@/lib/types";
import { ChangelogCard } from "./changelog-card";

interface ChangelogFeedProps {
	changelogs: ChangeLog[];
}

export function ChangelogFeed({ changelogs }: ChangelogFeedProps) {
	return (
		<div className="space-y-4">
			{changelogs?.map((changelog) => (
				<ChangelogCard key={changelog._id} changelog={changelog} />
			))}
		</div>
	);
}
