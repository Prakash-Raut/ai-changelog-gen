import type { ChangeLog, Source } from "@/lib/types";
import { Badge } from "@workspace/ui/components/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@workspace/ui/components/card";
import { formatDistanceToNow } from "date-fns";
import { GitBranch, GitPullRequest, Tag, Terminal } from "lucide-react";

interface ChangelogCardProps {
	changelog: ChangeLog;
}

export function ChangelogCard({ changelog }: ChangelogCardProps) {
	const getSourceIcon = (source: Source) => {
		switch (source) {
			case "cli":
				return <Terminal className="h-4 w-4" />;
			case "github-push":
				return <GitBranch className="h-4 w-4" />;
			case "github-pr":
				return <GitPullRequest className="h-4 w-4" />;
		}
	};

	const getSourceLabel = (source: Source) => {
		switch (source) {
			case "cli":
				return "CLI";
			case "github-push":
				return "GitHub Push";
			case "github-pr":
				return "GitHub PR";
		}
	};

	const getSourceColor = (source: Source) => {
		switch (source) {
			case "cli":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
			case "github-push":
				return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
			case "github-pr":
				return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
		}
	};

	return (
		<Card className="transition-all hover:shadow-md">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<Badge
						variant="outline"
						className={`flex items-center gap-1 px-2 py-0.5 ${getSourceColor(changelog.source)}`}
					>
						{getSourceIcon(changelog.source)}
						{getSourceLabel(changelog.source)}
					</Badge>
					<span className="text-sm text-muted-foreground">
						{formatDistanceToNow(changelog.createdAt, { addSuffix: true })}
					</span>
				</div>
			</CardHeader>
			<CardContent>
				<p className="text-base">{changelog.content}</p>
			</CardContent>
			<CardFooter className="pt-0">
				<div className="flex flex-wrap gap-2">
					<Badge variant="secondary" className="text-xs">
						<Tag className="mr-1 h-3 w-3" />
						Default
					</Badge>
				</div>
			</CardFooter>
		</Card>
	);
}
