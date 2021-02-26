import { Min, Max } from "class-validator";
import { ArgsType, Field, ID, Int } from "type-graphql";

@ArgsType()
class editComment {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;
}

export default editComment;
