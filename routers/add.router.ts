import { RequestHandler, Router } from "express";
import { AddRecord } from "../records/add.record";

export const adRouter = Router();

adRouter
  .get("/search/:name?", (async (req, res): Promise<void> => {
    const { name } = req.params;
    const ads = await AddRecord.getAll(name ?? "");
    res.json(ads);
  }) as RequestHandler)
  .get("/:id", (async (req, res) => {
    const { id } = req.params;
    const ad = await AddRecord.getOne(id);
    res.json(ad);
  }) as RequestHandler)
  .post("/", (async (req, res) => {
    const ad = new AddRecord(req.body);
    await ad.insert();
    res.json(ad);
  }) as RequestHandler);
