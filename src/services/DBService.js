// import * as idb from 'idb';
import { openDB, deleteDB, wrap, unwrap } from 'idb';

const DATABASE_NAME = 'users_db';
const DATABASE_VERSION = 2;
// const db = idb.default;

/**
 * Initialize the IndexedDB.
 * see https://developers.google.com/web/ilt/pwa/lab-indexeddb
 * for information as to why we use switch w/o breaks for migrations.
 * add do the database version and add a switch case each time you need to
 * change migrations
 */
const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
    
    upgrade(db) {
        // Create a store of objects
        const store = db.createObjectStore('users', {
          // The 'id' property of the object will be the key.
          keyPath: 'id',
          // If it isn't explicitly set, create a value by auto incrementing.
          autoIncrement: true,
        });
        // Create an index on the 'date' property of the objects.
        store.createIndex('firstname', 'firstname');
        store.createIndex('lastname', 'lastname');
        store.createIndex('email', 'email');

        store.add({
            firstname: 'Nizar',
            lastname: 'KHSIB',
            email: 'nizar.khsib@gmail.com',
        });

        store.add({
            firstname: 'Steve',
            lastname: 'Johnson',
            email: 'steve.johnson@gmail.com',
        });

        store.add({
            firstname: 'Andre',
            lastname: 'Demarzio',
            email: 'andre.demarzio@gmail.com',
        });

    },

    blocked() {
      // …
    },
    blocking() {
      // …
    },
    terminated() {
      // …
    },
  });

class DBService {

  get(tablespace, key) {
    return dbPromise.then(db => {
      return db.transaction(tablespace).objectStore(tablespace).get(key);
    }).catch(error => {
      // Do something?
    });
  }

  getUsers(){
    return dbPromise.then(function(db) {
        var tx = db.transaction('users');
        var store = tx.objectStore('users');
        return store.getAll();
      });
  }

  putUser(object) {
    return dbPromise.then(function(db) {
        var tx = db.transaction('users','readwrite');
        var store = tx.objectStore('users');
        return store.put(object);
      });
  }

  getAll(tablespace, indexName, index = []) {
    return dbPromise.then(db => {
      return db.transaction(tablespace).objectStore(tablespace).index(indexName).getAll(index);
    }).catch(error => {
      // Do something?
    });
  }

  put(tablespace, object, key = null) {
    return dbPromise.then(db => {
      if (key) {
        return db.transaction(tablespace, 'readwrite').objectStore(tablespace).put(object, key);
      }
      return db.transaction(tablespace, 'readwrite').objectStore(tablespace).put(object);
    }).catch(error => {
      // Do something?
    });
  }

  delete(tablespace, key) {
    return dbPromise.then(db => {
      return db.transaction(tablespace, 'readwrite').objectStore(tablespace).delete(key);
    }).catch(error => {
      // Do something?
    });
  }

  deleteAll(tablespace) {
    return dbPromise.then(db => {
      return db.transaction(tablespace, 'readwrite').objectStore(tablespace).clear();
    }).catch(error => {
      // Do something?
    });
  }
}

export const Service = new DBService()