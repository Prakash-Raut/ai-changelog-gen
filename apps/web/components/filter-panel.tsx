"use client";

import type { Source } from "@/lib/types";
import { Input } from "@workspace/ui/components/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@workspace/ui/components/select";
import { Search } from "lucide-react";

interface FilterPanelProps {
	selectedSource: Source | "all";
	searchQuery: string;
	onSourceChange: (source: Source | "all") => void;
	onSearchChange: (query: string) => void;
}

export function FilterPanel({
	selectedSource,
	searchQuery,
	onSourceChange,
	onSearchChange,
}: FilterPanelProps) {
	return (
		<div className="bg-card rounded-lg border p-4 shadow-sm">
			<div className="flex flex-col gap-4 md:flex-row md:items-center">
				<div className="w-full md:w-64">
					<label
						htmlFor="source-filter"
						className="text-sm font-medium mb-1.5 block"
					>
						Source
					</label>
					<Select
						value={selectedSource}
						onValueChange={(value) => onSourceChange(value as Source | "all")}
					>
						<SelectTrigger id="source-filter" className="w-full">
							<SelectValue placeholder="Select source" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Sources</SelectItem>
							<SelectItem value="cli">CLI</SelectItem>
							<SelectItem value="github-push">GitHub Push</SelectItem>
							<SelectItem value="github-pr">GitHub PR</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="flex-1">
					<label
						htmlFor="search-filter"
						className="text-sm font-medium mb-1.5 block"
					>
						Search by tag or content
					</label>
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							id="search-filter"
							type="search"
							placeholder="Search by tag (e.g. release/v1.0.0) or content..."
							className="pl-9"
							value={searchQuery}
							onChange={(e) => onSearchChange(e.target.value)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
