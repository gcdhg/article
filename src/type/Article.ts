import { Module } from "module";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class User {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  body: string;
}

export default User;
