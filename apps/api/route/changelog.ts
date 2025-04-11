import { Router } from "express";
import { ChangeLogModel } from "../models/ChangeLog.js";

const changelogRouter: Router = Router();

changelogRouter.post("/", async (req, res) => {
  const { content, source } = req.body;
  const entry = await ChangeLogModel.create({ content, source });
  res.json(entry);
});

changelogRouter.get("/", async (req, res) => {
  const { source, tag } = req.query;
  const filter: any = {};
  if (source) filter.source = source;
  if (tag) filter.tags = tag;

  const entries = await ChangeLogModel.find(filter).sort({ createdAt: -1 });
  res.json(entries);
});


export { changelogRouter };

