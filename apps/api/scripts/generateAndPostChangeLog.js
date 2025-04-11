import { execSync } from "node:child_process";

const getGitLogs = () => {
	try {
		const log = execSync('git log --since="1 day ago" --pretty=format:%s')
			.toString()
			.trim();
		return log || "No commits found in the last day.";
	} catch (error) {
		console.error("❌ Failed to get git logs:", error);
		process.exit(1);
	}
};

const summarizeWithOllama = async (logs) => {
	try {
    const prompt = `You are an expert technical writer. Given the following Git commit messages, write a clear, concise, and professional changelog for a developer audience. Avoid repetition, use simple bullets, and group similar updates where possible.\n\nGit Commits:\n${logs}`;

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt,
        stream: false
      })
    });

    const data = await response.json();
		console.log('🧪 Ollama raw response:', data);
    if (!data.response) throw new Error('No summary returned from Ollama.');

    return data.response.trim();
  } catch (err) {
    console.error('❌ Ollama summarization failed:', err);
    process.exit(1);
  }
};

const postToAPI = async (summary) => {
	try {
		const res = await fetch("http://localhost:5000/changelog", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content: summary, source: "cli-gpt" }),
		});

		if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
		const data = await res.json();
		console.log("✅ Posted to API:", data);
	} catch (error) {
		console.error("❌ Failed to post to API:", error);
		process.exit(1);
	}
};

const run = async () => {
  const logs = getGitLogs();
  console.log('📋 Git Commits:\n', logs);

  const summary = await summarizeWithOllama(logs);
  console.log('\n🧠 LLaMA3 Summary:\n', summary);

  await postToAPI(summary);
};

run();
