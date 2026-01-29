import { Request, Response } from "express";
import { Router } from "express";

const ProductCategories = Router();

ProductCategories.get('/product-categories', (req: Request, res: Response) => {
    res.json({ message: 'List of product categories' });
});