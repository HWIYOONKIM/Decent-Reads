import { Request, Response } from 'express';
import { getAllBooks, addBook } from '../models/BookModel';
import { parseDatabaseError } from '../utils/db-utils';

async function getBook(req: Request, res: Response): Promise<void> {
  res.json(await getAllBooks());
}

type NewBookRequest = {
  title: string;
  publicationYear: number;
};

async function addNewBook(req: Request, res: Response): Promise<void> {
  if (!req.session.isLoggedIn) {
    res.sendStatus(401);
    return;
  }
  const { title, publicationYear } = req.body as NewBookRequest;
  try {
    // IMPORTANT: Store the `passwordHash` and NOT the plaintext password
    const newBook = await addBook(title, publicationYear);
    console.log(newBook);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export { getBook, addNewBook };
