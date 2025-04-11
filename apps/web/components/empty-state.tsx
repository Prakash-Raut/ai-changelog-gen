import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { FileSearch } from "lucide-react";

export function EmptyState() {
	return (
		<Card className="w-full border-dashed">
			<CardContent className="flex flex-col items-center justify-center py-12">
				<div className="rounded-full bg-muted p-3">
					<FileSearch className="h-10 w-10 text-muted-foreground" />
				</div>
				<h3 className="mt-4 text-lg font-semibold">No changelogs found</h3>
				<p className="mt-2 text-center text-muted-foreground max-w-sm">
					No changelogs match your current filters. Try changing your search
					criteria or check back later.
				</p>
				<Button className="mt-4" variant="outline">
					Clear filters
				</Button>
			</CardContent>
		</Card>
	);
}
