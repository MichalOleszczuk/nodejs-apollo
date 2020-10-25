import faker from 'faker';
import { connectDatabase } from './index';

const usersCount = 98;

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
        isVerified: Math.random() >= 0.5,
      });

      await UserSeed.save();
    }

    // Special guest for filtering. Case sensitive.
    const JasonBourne = db.users.create({
      id: 99,
      name: 'Peter Lastname',
      shortBio: `I was born in St Spetersburg`,
      isVerified: true,
    });

    await JasonBourne.save();

    const JasonWhatever = db.users.create({
      id: 100,
      name: 'Peter Whatever',
      shortBio: `I was born in St Spetersburg`,
      isVerified: false,
    });

    await JasonWhatever.save();

    console.log('[seed] : success');
  } catch (error) {
    throw new Error(`failed to seed database ${error.message}`);
  }
};

seed();
