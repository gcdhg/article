import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Article from "./Articles";

interface IComment {
  id: number;
  title: string;
}

@Table
class Comment extends Model implements IComment {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @ForeignKey(() => Article)
  @Column
  articleId: number;

  @BelongsTo(() => Article)
  article: Article;
}

export default Comment;
