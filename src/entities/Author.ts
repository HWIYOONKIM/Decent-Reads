import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation } from 'typeorm';
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

  @ManyToMany(() => Book, (book) => book.authors)
  books: Relation<Book>[];
}
