import { Router } from "express";
import { ChannelLogModel } from "../models/ChangeLog.js";

const changelogRouter: Router = Router();

changelogRouter.post("/", async (req, res) => {
  const { content, source } = req.body;
  const entry = await ChannelLogModel.create({ content, source });
  res.json(entry);
});

changelogRouter.get("/", async (req, res) => {
  const entries = await ChannelLogModel.find().sort({ createdAt: -1 });
  res.json(entries);
});


export { changelogRouter };

