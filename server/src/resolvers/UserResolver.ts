import { Arg, Field, Float, ObjectType, Query, Resolver } from 'type-graphql';
import { User } from '../entities/User';

@ObjectType({ description: 'Object returned from Users query' })
class UsersResponse {
  @Field(() => [User])
  result: User[];
  @Field(() => Float)
  count: number;
}

@Resolver()
export class UserResolver {
  @Query(() => UsersResponse)
  async Users(@Arg('skip', { nullable: true }) skip?: number, @Arg('take', { nullable: true }) take?: number) {
    const queryTake = take || 0;
    const querySkip = skip || 0;

    const [result, count] = await User.findAndCount({
      take: queryTake,
      skip: querySkip,
    });

    return { result, count };
  }

  @Query(() => User)
  User(@Arg('id') id: string) {
    return User.findOne({ where: { id } });
  }
}
