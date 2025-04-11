export type Source = "cli" | "github-push" | "github-pr"

export type ChangeLog = {
	_id: string;
	content: string;
	source: Source;
  tags: string[];
	createdAt: Date;
	updatedAt: Date;
};