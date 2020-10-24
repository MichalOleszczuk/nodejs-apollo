import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { userDefaultAvatar } from './user.utils';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  shortBio: string;

  @Field(() => Boolean)
  @Column({ default: false })
  isVerified: boolean;

  @Field(() => String)
  @Column({ default: 'https://avatars.dicebear.com/api/avataaars/seed.svg' })
  avatar: string;

  @BeforeInsert()
  setDefault() {
    this.avatar = userDefaultAvatar();
  }
}
