const pool = require('./pool');

const getAllMessages = async () => {
    const { rows } = await pool.query("SELECT * FROM message_board");
    return rows;
}

const addNewMessage = async (msg) => {
    const { username, title, message, created_at } = msg;
    await pool.query(
        `INSERT INTO message_board (username, title, message, created_at)
            VALUES ($1, $2, $3, $4)`, [username, title, message, created_at]);    
}

const getSpecificMessage = async (messageID) => {
	const { rows } = await pool.query(`SELECT * FROM message_board WHERE id = $1`, [messageID]);
	return rows[0];
};

const deleteMessage = async (messageID) => {
    await pool.query(`DELETE FROM message_board WHERE id = $1`, [messageID]);
}

async function clearDatabase() {
  await pool.query("TRUNCATE TABLE message_board RESTART IDENTITY");
  const { rows } = await pool.query("SELECT * FROM message_board");
  return rows;
}

module.exports = { getAllMessages, addNewMessage, getSpecificMessage, deleteMessage };