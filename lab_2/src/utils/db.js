import {openDatabase, enablePromise} from 'react-native-sqlite-storage';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'timer.db', location: 'default'});
}

export const createTables = async (db) => {  
  const drop_seqs = `DROP TABLE IF EXISTS seqs`;
  const seqs_query = `CREATE TABLE IF NOT EXISTS seqs (
          id        INTEGER PRIMARY KEY,
          duration INTEGER NOT NULL,
          name      TEXT NOT NULL,
          color     TEXT NOT NULL
  );`

  const drop_phases = `DROP TABLE IF EXISTS phases`; 
  const phases_query = `CREATE TABLE IF NOT EXISTS phases (
          id        INTEGER PRIMARY KEY,
          seq_id    INTEGER NOT NULL,
          seq_order INTEGER NOT NULL,
          duration  INTEGER NOT NULL,
          name      TEXT NOT NULL
  );`
  
  // await db.executeSql(drop_seqs)
  await db.executeSql(seqs_query)
  
  // await db.executeSql(drop_phases)
  await db.executeSql(phases_query)
}