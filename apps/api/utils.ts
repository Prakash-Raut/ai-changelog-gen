import Together from "together-ai";

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY!,
});


export const summarizeCommits = async (logs: string[]): Promise<string> => {
  try {
    const prompt = `You are an expert technical writer. Given the following Git commit messages, write a clear, concise, and professional changelog for a developer audience. Avoid repetition, use simple bullets, and group similar updates where possible.\n\nGit Commits:\n${logs}`;

    const response = await together.chat.completions.create({
      messages: [{"role": "user", "content": prompt}],
      model: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8"
    });

    if (!response) throw new Error('No response from Together AI.');

    const data = response.choices[0]?.message?.content;

		console.log('🧪 Ollama raw response:', data);

    // if (!data.response) throw new Error('No summary returned from Ollama.');

    return data?.trim() as string;
  } catch (err) {
    console.error('❌ Ollama summarization failed:', err);
    process.exit(1);
  }
};