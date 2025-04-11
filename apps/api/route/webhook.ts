import { Router } from "express";
import { ChangeLogModel } from "../models/ChangeLog.js";
import { summarizeCommits } from "../utils.js";

const webhookRouter: Router = Router();

webhookRouter.post("/github", async (req, res) => {
  const event = req.headers['x-github-event'];
  const payload = req.body;

  try { 
    let summary = '';
    let source = 'github';
    const tags: string[] = [];

    if (event === 'push') {
      const messages = payload.commits.map((c: any) => c.message);
      summary = await summarizeCommits(messages);
      source = 'github-push';
    } else if (event === 'pull_request' && payload.action === 'closed' && payload.pull_request.merged) {
      const prTitle = payload.pull_request.title;
      const prBody = payload.pull_request.body || '';
      summary = await summarizeCommits([prTitle, prBody]);
      source = 'github-pr';
      tags.push(payload.pull_request.head.ref);
    }

    if (summary) {
      const entry = await ChangeLogModel.create({ content: summary, source, tags });
      res.status(200).json(entry);
    } else {
      res.status(204).send('No content summarized');
    }
  } catch (err) {
    console.error('❌ Webhook Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

export { webhookRouter };

