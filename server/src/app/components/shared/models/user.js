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

  const createUsersTable = `
    create table if not exists users(
      id int primary key auto_increment,
      name varchar(255) not null,
      email varchar(255) not null,
      password varchar(255) not null,
      phone int(255),
      date_of_birth varchar(255),
      about_me varchar(255),
      created_at datetime not null,
      updated_at datetime not null,
      is_admin BOOLEAN not null);`;

  const createRolesTable = `
  create table if not exists user_roles(
    id int primary key auto_increment,
    role varchar(100) not null,
    user_id int,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);`

  const createAdmin = `INSERT INTO users (name, email, password, phone, date_of_birth, about_me, created_at,updated_at,is_admin )
  VALUES('admin', 'admin@gmail.com', 'admin', 5555555, '12/12/12', 'I am admin', now(), now(), true );`;

  const insertRoles = `INSERT INTO user_roles (user_id, role) VALUES ?`

  return Promise.all([connection.query(createUsersTable), connection.query(createRolesTable)])
    .then(result => {
      return connection.query('SELECT COUNT(*) as Count FROM users')
        .then(usersCountResult => {
          if (usersCountResult[0][0].Count == 0) {
            return connection.query(createAdmin)
              .then(createAdminResult => {
                return connection.query(insertRoles, [
                  [
                    [1, 'can_view_users'],
                    [1, 'can_edit_users'],
                    [1, 'can_delete_users'],
                    [1, 'can_view_details'],
                    [1, 'can_view_details_full'],
                    [1, 'can_edit_users_full']
                  ]
                ]).then(insertResult => {
                  return connection;
                });
              });
          } else {
            return connection;
          }
        })
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
          let user = selectedResult[0][0];
          return connection.query("SELECT role FROM user_roles WHERE user_id=?", user.id)
            .then(result => {
              connection.close()
              user.roles = result[0].map(row => row.role);
              return user;
            });
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
        .then(userResult => {
          const sql = `INSERT INTO user_roles(role, user_id) VALUES (?,?)`;
          let rolesInserts = user.roles.map(role => {
            return connection.query(sql, [role, userResult[0].insertId])
          });
          let res = Promise.all(rolesInserts);
          connection.close()
          return res;
        }).catch(err => {
          throw new Error(`Error creating user in the database. ${err.message}`);
        });
    });
}

const updateUser = (userId, user) => {
  return getConnection()
    .then(connection => {
      return connection.query('SELECT COUNT(*) as Count FROM users WHERE id=?', [userId]).then(checkUserResult => {
        if (checkUserResult[0][0].Count == 0) {
          return Promise.reject('Specified user doesn\'t exist');
        } else {
          const sql = `UPDATE users SET name=?, email=?, password=?, phone=?, date_of_birth=?, about_me=?, updated_at=?  WHERE id=? `;
          const data = [user.name, user.email, user.password, user.phone, user.date_of_birth, user.about_me, user.updated_at, userId];
          return connection.query(sql, data)
            .then(userResult => {
              return connection.query('SELECT role FROM user_roles WHERE user_id=?', [userId]).then(rolesResult => {
                let existingRoles = rolesResult[0].map(row => row.role);
                let insertRoles = user.roles.filter(role => !existingRoles.includes(role)).map(role => [userId, role]);
                let result;
                if (insertRoles.length > 0) {
                  result = Promise.all([
                    connection.query(`DELETE FROM user_roles WHERE user_id=? AND role NOT IN (?)`, [userId, user.roles]),
                    connection.query(`INSERT INTO user_roles(user_id, role) VALUES ?`, [insertRoles])
                  ])
                } else {
                  result = connection.query(`DELETE FROM user_roles WHERE user_id=? AND role NOT IN (?)`, [userId, user.roles]);
                }
                connection.close();
                return result;
              })
            })
        }
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