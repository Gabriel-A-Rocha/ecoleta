import { Request, Response } from "express"; //definition for TypeScript
import knex from "../database/connection";

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    //manipulating the query to make it a numeric array
    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    return response.json(points);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    //finds the facility
    const point = await knex("points").where("id", id).first();

    if (!point) {
      return response.status(400).json({ message: "Point not found" });
    }
    //finds which items the facility accepts
    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");

    return response.json({ point, items });
  }

  async create(request: Request, response: Response) {
    //destructuring the request.body
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const point = {
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    //using knex transaction variable to assure database inserts
    const trx = await knex.transaction();

    //filling the received information into the 'points' table
    //the knex insert() method returns an array with the inserted items ids
    const insertedIds = await trx("points").insert(point);

    //id of the facility registered
    const point_id = insertedIds[0];

    //associate the facility with items accepted
    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    //populate the 'point_items' table with the foreign keys
    await trx("point_items").insert(pointItems);

    await trx.commit();

    return response.json({
      id: point_id,
      ...point, //spread operator (all info about the point)
    });
  }
}

export default PointsController;
