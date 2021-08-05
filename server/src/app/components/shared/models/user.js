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

  const createTable = `create table if not exists users(
      id int primary key auto_increment,
      name varchar(255) not null,
      email varchar(255) not null,
      password varchar(255) not null,
      phone int(255),
      date_of_birth varchar(255),
      about_me varchar(255),
      created_at datetime not null,
      updated_at datetime not null,
      is_admin BOOLEAN not null)
  `;
  const createRoles = `create table if not exists userRoles(
    id int primary key auto_increment,
    role varchar(100) not null,
    user_id int,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );`

  const createAdmin = `INSERT INTO users (name, email, password, phone, date_of_birth, about_me, created_at,updated_at,is_admin )
  SELECT * FROM (SELECT 'admin' as name, 'admin@gmail.com' as email, 'admin' as password, 5555555 as phone, '12/12/12' as date_of_birth, 'I am admin' as about_me, now() as created_at,  now() as updated_at, true as is_admin)
  as temp
  WHERE NOT EXISTS (SELECT name FROM users WHERE name = 'admin') LIMIT 1;`;


  return connection.query(createTable)
    .then(result => {
      return connection.query(createRoles)
        .then(result1 => {
          return connection.query(createAdmin)
            .then(result3 => {
              return connection;
            });
        });
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
    }).catch(err => {
      throw new Error(`Error getting users from the database. ${err.message}`);
    });
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
    }).catch(err => {
      throw new Error(`Error getting user by id from the database. ${err.message}`);
    });
}

const createUser = (user) => {
  return getConnection()
    .then(connection => {
      const sql = `INSERT INTO users(name, email, password, created_at,updated_at,is_admin ) VALUES (?,?,?,?,?,?)`;
      return connection.query(sql, [user.name, user.email, user.password, user.created_at, user.updated_at, false])
        .then(result => {
          const selectSql = 'SELECT * FROM users WHERE id=?'
          return connection.query(selectSql, [result[0].insertId])
            .then(selectedResult => {
              connection.close()
              return selectedResult[0][0];
            })
        })
    }).catch(err => {
      throw new Error(`Error creating user in the database. ${err.message}`);
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
    }).catch(err => {
      throw new Error(`Error updating user in the database. ${err.message}`);
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
    }).catch(err => {
      throw new Error(`Error deleting user in the database. ${err.message}`);
    });
}


module.exports = {
  getAll,
  updateUser,
  createUser,
  deleteUser,
  getUser
}