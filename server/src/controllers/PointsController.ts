import { Request, Response } from "express";
import knex from "../database/connection";

class PointsController {
  async index(req: Request, res: Response) {
    try {
      const { city, uf, items } = req.query;

      const parseItems = String(items)
        .split(",")
        .map((item) => Number(item.trim()));

      const points = await knex("points")
        .join("point_items", "points.id", "=", "point_items.point_id")
        .whereIn("point_items.item_id", parseItems)
        .where("city", String(city))
        .where("uf", String(uf))
        .distinct()
        .select("points.*");

      return res.json(points);
    } catch (err) {
      console.log(err);

      return res.json({ message: "Error" });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const point = await knex("points").where("id", id).first();

      const items = await knex("items")
        .join("point_items", "items.id", "=", "point_items.item_id")
        .where("point_items.point_id", id);

      return res.json({ point, items });
    } catch (err) {
      return res.status(400).json({ message: "Point not found." });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items,
      } = req.body;

      const trx = await knex.transaction();

      const point = {
        image:
          "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
      };

      const insertedIds = await trx("points").insert(point);

      const point_id = insertedIds[0];

      const pointItems = items.map((item_id: number) => {
        return {
          item_id,
          point_id,
        };
      });

      await trx("point_items").insert(pointItems);

      await trx.commit();

      return res.json({
        id: point_id,
        ...point,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default PointsController;
