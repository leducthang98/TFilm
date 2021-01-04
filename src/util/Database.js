import mysql from 'mysql';
import CommonConfig from '../config/CommonConfig';

const pool = mysql.createPool(CommonConfig.MYSQL_URL);

export const query = async (sql, params) => {
    console.log('----------------------------');
    console.log('sql:', mysql.format(sql, params));
    console.log('----------------------------');
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
};

export const queryOne = async (sql, params) => {
    const results = await query(sql, params);
    return results[0];
  };
  
  export const getConnection = async () => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      return resolve(connection);
    });
  });
  
// transaction

  export const beginTransaction = async () => {
    const connection = await getConnection();
    return new Promise((resolve, reject) => {
      connection.beginTransaction((err) => {
        if (err) {
          connection.release();
          return reject(err);
        }
        return resolve(connection);
      });
    });
  };
  
  export const rollbackTransaction = async transaction => new Promise((resolve, reject) => {
    transaction.rollback((err) => {
      transaction.release();
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
  
  export const commitTransaction = async transaction => new Promise((resolve, reject) => {
    transaction.commit(async (errCommit) => {
      if (errCommit) {
        try {
          await rollbackTransaction(transaction);
        } catch (errorRollback) {
          return reject(Object.assign(errCommit, { errorRollback }));
        }
        return reject(errCommit);
      }
      transaction.release();
      return resolve();
    });
  });

  export const executeInTransaction = async (sql, params, transaction) => {
    console.log('----------------------------');
    console.log('sql', mysql.format(sql, params));
    console.log('----------------------------');
  
    return new Promise((resolve, reject) => {
      if (!transaction) {
        pool.query(sql, params, (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        });
      } else {
        transaction.query(sql, params, (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        });
      }
    });
  };