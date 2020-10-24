import faker from 'faker';
import { connectDatabase } from './index';

const usersCount = 100;

const seed = async () => {
  try {
    console.log('[seed] : running...');

    const db = await connectDatabase();
    await db.users.clear();

    for (let i = 1; i <= usersCount; i += 1) {
      const UserSeed = db.users.create({
        id: i,
        name: faker.name.firstName(),
        shortBio: `I was born on ${faker.date.past()}`,
        isVerified: false,
      });

      await UserSeed.save();
    }

    console.log('[seed] : success');
  } catch (error) {
    throw new Error(`failed to seed database ${error.message}`);
  }
};

seed();
