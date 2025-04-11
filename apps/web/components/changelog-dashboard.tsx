"use client";

import type { ChangeLog, Source } from "@/lib/types";
import { useEffect, useState } from "react";
import { ChangelogFeed } from "./changelog-feed";
import { EmptyState } from "./empty-state";
import { FilterPanel } from "./filter-panel";
import { LoadingSkeleton } from "./loading-skeleton";

export function ChangelogDashboard() {
	const [isLoading, setIsLoading] = useState(false);
	const [selectedSource, setSelectedSource] = useState<Source | "all">("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [changelogs, setChangelogs] = useState<ChangeLog[]>();

	useEffect(() => {
		fetch("http://localhost:5000/changelog")
			.then((res) => res.json())
			.then((data) => setChangelogs(data));
	}, []);

	// Filter changelogs based on selected source and search query
	const filteredChangelogs = changelogs?.filter((changelog) => {
		const matchesSource =
			selectedSource === "all" || changelog.source === selectedSource;
		const matchesSearch =
			searchQuery === "" ||
			changelog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
			changelog.tags.some((tag) =>
				tag.toLowerCase().includes(searchQuery.toLowerCase()),
			);

		return matchesSource && matchesSearch;
	});

	const handleSourceChange = (source: Source | "all") => {
		setIsLoading(true);
		setSelectedSource(source);

		// Simulate loading delay
		setTimeout(() => {
			setIsLoading(false);
		}, 800);
	};

	const handleSearchChange = (query: string) => {
		setSearchQuery(query);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">
					Changelog Dashboard
				</h1>
				<p className="text-muted-foreground mt-2">
					View and filter AI-generated changelogs from your development
					activities
				</p>
			</div>

			<FilterPanel
				selectedSource={selectedSource}
				searchQuery={searchQuery}
				onSourceChange={handleSourceChange}
				onSearchChange={handleSearchChange}
			/>

			<div className="mt-6">
				{isLoading ? (
					<LoadingSkeleton />
				) : filteredChangelogs && filteredChangelogs.length > 0 ? (
					<ChangelogFeed changelogs={filteredChangelogs} />
				) : (
					<EmptyState />
				)}
			</div>
		</div>
	);
}
