import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from "sequelize-typescript";
import Comment from "./Comments";

interface IArticle {
  id: number;
  title: string;
  body: string;
}

@Table
class Article extends Model implements IArticle {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.STRING,
  })
  body: string;

  @HasMany(() => Comment, {
    foreignKey: "comments",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    hooks: true,
  })
  comments: Comment[];
}

export default Article;
