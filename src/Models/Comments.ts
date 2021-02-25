import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

interface IComment {
  id: number;
  body: string;
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
  body: string;
}

export default Comment;
