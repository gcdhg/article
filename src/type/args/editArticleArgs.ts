import { Min } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
class editArticleArgs {
  @Field(() => ID)
  id: number;

  // @Field()
  // title: string;

  // @Field()
  // body: string;
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  body?: string;
}

export default editArticleArgs;
