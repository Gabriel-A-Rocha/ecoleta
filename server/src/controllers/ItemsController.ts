import { Request, Response } from "express"; //definition for TypeScript
import knex from "../database/connection";

class ItemsController {
  async index(request: Request, response: Response) {
    //retrieve all items stored in the 'items' table
    const items = await knex("items").select("*");
    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`,
      };
    });

    return response.json(serializedItems);
  }
}

export default ItemsController;
