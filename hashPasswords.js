const bcrypt = require('bcrypt');
const User = require('./models/User');
async function fixPlainPasswords() {
  // Fetch users with un-hashed passwords
  const users = await User.findAll({
    where: {
      username: ['admin1', 'driver1'], // target usernames (or use another condition)
    },
  });

  for (const user of users) {
    const plainPassword = user.password;

    // Skip if already hashed (optional check, bcrypt hashes start with $2)
    if (plainPassword.startsWith('$2')) {
      console.log(`Skipping ${user.username}, already hashed.`);
      continue;
    }

    const hashed = await bcrypt.hash(plainPassword, 10);
    user.password = hashed;
    await user.save();

    console.log(`Updated ${user.username}`);
  }

  console.log('Done!');
}

fixPlainPasswords().catch(console.error);

