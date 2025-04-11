"use client";

import { useEffect, useState } from "react";

type ChangeLog = {
	_id: string;
	content: string;
	source: string;
	createdAt: Date;
	updatedAt: Date;
};

export default function Page() {
	const [logs, setLogs] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5000/changelog")
			.then((res) => res.json())
			.then((data) => setLogs(data));
	}, []);

	return (
		<div className="flex items-center justify-center min-h-svh">
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-2xl font-bold mb-4">AI Changelog Dashboard</h1>
				<ul className="space-y-4">
					{logs.map((log: ChangeLog) => (
						<li key={log._id} className="border p-4 rounded">
							<p className="text-sm text-gray-500">
								{new Date(log.createdAt).toLocaleString()}
							</p>
							<p>{log.content}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
