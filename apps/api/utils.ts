export const summarizeCommits = async (logs: string[]): Promise<string> => {
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

    const data = await response.json() as { response?: string };

		console.log('🧪 Ollama raw response:', data);

    // if (!data.response) throw new Error('No summary returned from Ollama.');

    return data?.response?.trim() as string;
  } catch (err) {
    console.error('❌ Ollama summarization failed:', err);
    process.exit(1);
  }
};