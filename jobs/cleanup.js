const cron = require('node-cron');
const db = require('../config/database');

// run every minute
cron.schedule('* * * * *', () => {
    console.log('Running cleanup job…');

    const query = `
        DELETE FROM Notice
        WHERE validTill < NOW()
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error deleting expired notices:', err);
        } else {
            console.log(`Deleted ${result.affectedRows} expired notices.`);
        }
    });
});

