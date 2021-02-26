import { Field, ID, Int, ObjectType } from "type-graphql";
import Comments from "./Comments";

@ObjectType()
class Article {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  body: string;

  @Field((type) => [Comments], { nullable: true })
  comments?: Comments[];

  @Field((type) => [Int], { nullable: true })
  randomfield?: number[];
}

export default Article;
