import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";

export function LoadingSkeleton() {
	return (
		<div className="space-y-4">
			{[1, 2, 3].map((i) => (
				<Card key={i} className="animate-pulse">
					<CardHeader className="pb-2">
						<div className="flex items-center justify-between">
							<Skeleton className="h-6 w-28" />
							<Skeleton className="h-4 w-32" />
						</div>
					</CardHeader>
					<CardContent>
						<Skeleton className="h-4 w-full mb-2" />
						<Skeleton className="h-4 w-3/4" />
					</CardContent>
					<CardFooter className="pt-0">
						<div className="flex gap-2">
							<Skeleton className="h-5 w-16" />
							<Skeleton className="h-5 w-24" />
						</div>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
