import { Arg, Field, Float, ObjectType, Query, Resolver } from 'type-graphql';
import { FindConditions, Like } from 'typeorm';
import { User } from '../entities/User';

@ObjectType({ description: 'Object returned from Users query' })
class UsersResponse {
  @Field(() => [User])
  result: User[];
  @Field(() => Float)
  count: number;
  @Field(() => String)
  filter: string;
  @Field(() => Boolean)
  isVerified: boolean;
}

@Resolver()
export class UserResolver {
  @Query(() => UsersResponse)
  async Users(
    @Arg('skip', { nullable: true }) skip?: number,
    @Arg('take', { nullable: true }) take?: number,
    @Arg('filter', { nullable: true }) filter?: string,
    @Arg('isVerified', { nullable: true }) isVerified?: boolean,
  ) {
    const queryTake = take || 0;
    const querySkip = skip || 0;
    let where: FindConditions<User[]> = [];

    if (!!filter) {
      where = [{ name: Like('%' + filter + '%') }, { shortBio: Like('%' + filter + '%') }];
    }

    if (isVerified !== undefined) {
      if (!!where.length) {
        where = where.map((condition) => ({ ...condition, isVerified }));
      } else {
        where = [{ isVerified }];
      }
    }

    const [result, count] = await User.findAndCount({
      where,
      take: queryTake,
      skip: querySkip,
    });

    await new Promise((r) => setTimeout(r, 2000));

    return { result, count };
  }

  @Query(() => User)
  User(@Arg('id') id: string) {
    return User.findOne({ where: { id } });
  }
}
