import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from 'typeorm';
import { Review } from './Review';
import { Book } from './Book';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  AuthorId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  publicationYear: number;

  @Column({ default: false })
  isDomainPublic: boolean;

  @OneToMany(() => Review, (review) => review.book)
  reviews: Relation<Review>[];

  @OneToMany(() => Book, (book) => book.authors)
  books: Relation<Book>[];
}
