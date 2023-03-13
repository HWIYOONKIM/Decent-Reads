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
  isDomainPublic: boolean;

  @OneToMany(() => Review, (review) => review.book)
  reviews: Relation<Review>[];

  @ManyToOne(() => Author, (author) => author.books)
  authors: Relation<Author>[];
}
