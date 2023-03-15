import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation, ManyToOne } from 'typeorm';
import { Review } from './Review';
import { Author } from './Author';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  bookId: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  publicationYear: number;

  @Column({ default: false })
  inPublicDomain: boolean;

  @ManyToOne(() => Author, (author) => author.books)
  authors: Relation<Author>[];

  @OneToMany(() => Review, (review) => review.book, { cascade: ['insert', 'update'] })
  reviews: Relation<Review>[];
}
