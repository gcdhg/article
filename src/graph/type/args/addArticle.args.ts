import { Min, Max } from "class-validator";
import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
class addArticle {
  @Field()
  title: string;

  @Field({ nullable: true })
  body?: string;
}

export default addArticle;
