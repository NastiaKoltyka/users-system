const mysql = require('mysql2');
const config = require('../../../../config/app');

const getConnection = () => {
  const connection = mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    database: 'userManagement',
    password: config.password
  }).promise();

  const sql = `create table if not exists users(
      id int primary key auto_increment,
      name varchar(255) not null,
      email varchar(255) not null,
      password varchar(255) not null,
      created_at datetime not null,
      updated_at datetime not null
    )`;

  return connection.query(sql)
    .then(result => {
      return connection;
    });
}

const getAll = () => {
  return getConnection()
    .then(connection => {
      return connection.query("SELECT * FROM users")
        .then(result => {
          connection.close()
          return result[0];
        });
    })
};
const getUser = (userId) => {
  return getConnection()
    .then(connection => {
      const selectSql = 'SELECT * FROM users WHERE id=?'
      return connection.query(selectSql, [userId])
        .then(selectedResult => {
          connection.close()
          return selectedResult[0][0];
        })
    });

}

const createUser = (user) => {
  return getConnection()
    .then(connection => {
      const sql = `INSERT INTO users(name, email, password, created_at,updated_at) VALUES (?,?,?,?,?)`;
      return connection.query(sql, [user.name, user.email, user.password, user.created_at, user.updated_at])
        .then(result => {
          const selectSql = 'SELECT * FROM users WHERE id=?'
          return connection.query(selectSql, [result[0].insertId])
            .then(selectedResult => {
              connection.close()
              return selectedResult[0][0];
            })
        })
    });
}

const updateUser = (userId, user) => {
  return getConnection()
    .then(connection => {
      const sql = `UPDATE users SET name=?, email=?, password=?,updated_at=?  WHERE id=? `;
      const data = [user.name, user.email, user.password, user.updated_at, userId];
      return connection.query(sql, data)
        .then(result => {
          const selectSql = 'SELECT * FROM users WHERE id=?'
          return connection.query(selectSql, [userId])
            .then(selectedResult => {
              connection.close()
              return selectedResult[0][0];
            })
        });
    });
}

const deleteUser = (userId) => {
  return getConnection()
    .then(connection => {
      const sql = "DELETE FROM users WHERE id=?";
      const data = [userId]
      return connection.query(sql, data)
        .then(result => {
          connection.close()
          return result[0].affectedRows;
        })
    });
}


module.exports = {
  getAll,
  updateUser,
  createUser,
  deleteUser,
  getUser
}