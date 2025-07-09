const cron = require('node-cron');
const db = require('../config/database');

function nowIST() {
  const istOffset = 5.5 * 60; // IST is UTC+5:30
  const local = new Date(new Date().getTime() + istOffset * 60000);
  return `[${local.toISOString().replace('T', ' ').substring(0, 19)} IST]`;
}

// run every minute
cron.schedule('* * * * *', () => {
    console.log(`${nowIST()} Running cleanup job…`);

    const query = `
        DELETE FROM Notice
        WHERE validTill < NOW()
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error(`${nowIST()} Error deleting expired notices:`, err);
        } else {
            console.log(`${nowIST()} Deleted ${result.affectedRows} expired notices.`);
        }
    });
});

