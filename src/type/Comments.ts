import { type } from "os";
import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
class Comments {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  title: string;

  @Field((type) => Int, { nullable: true })
  articleId: number;
}

export default Comments;
