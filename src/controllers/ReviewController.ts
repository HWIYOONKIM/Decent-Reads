import { Request, Response } from 'express';
import { addReview, getAllReviews } from '../models/reviewModel';
import { parseDatabaseError } from '../utils/db-utils';
import { getUserById } from '../models/UserModel';
import { getBookById } from '../models/BookModel';

async function getReviews(req: Request, res: Response): Promise<void> {
  res.json(await getAllReviews());
}

type NewReviewRequest = {
  reviewText: string;
  rating: number;
};

type BookIdRequest = {
  bookId: string;
};
async function addNewReview(req: Request, res: Response): Promise<void> {
  if (!req.session.isLoggedIn) {
    res.sendStatus(401);
    return;
  } // make sure they are logged in
  const { authenticatedUser } = req.session;
  const user = await getUserById(authenticatedUser.userId);
  const { bookId } = req.params as BookIdRequest;

  const book = await getBookById(bookId);
  if (!user || book) {
    res.sendStatus(404);
    return;
  }

  const { rating, reviewText } = req.body as NewReviewRequest;
  try {
    // IMPORTANT: Store the `passwordHash` and NOT the plaintext password
    const newReview = await addReview(rating, reviewText, user, book);
    console.log(newReview);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function addReviewsForBook(req: Request, res: Response): Promise<void> {
  res.sendStatus(501);
}

export { getReviews, addNewReview, addReviewsForBook };
