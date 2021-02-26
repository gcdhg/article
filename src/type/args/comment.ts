import { Min, Max } from "class-validator";
import { ArgsType, Field, ID, Int } from "type-graphql";

@ArgsType()
class addArticle {
  @Field()
  title: string;

  @Min(0)
  @Field(() => Int)
  articleId: number;
}

export default addArticle;
