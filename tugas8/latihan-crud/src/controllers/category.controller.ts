import { Request, Response } from "express";
import CategoryModel from "@/models/category.model";

export default {
    async create (req: Request, res: Response){
        try {
            const result = await CategoryModel.create(req.body);
            res.status(201).json({
                data: result,
                message: "Success create category",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
            data: err.message,
            message: "Failed create category",
            });
        }
    },
    async findAll(req: Request, res: Response) {
        try {
          const result = await CategoryModel.find();
          res.status(200).json({
            data: result,
            message: "Success get all category",
          });
        } catch (error) {
          const err = error as Error;
          res.status(500).json({
            data: err.message,
            message: "Failed get all category",
          });
        }
    },
}