import React, { useEffect, useState } from "react";

import { getDBConnection, createTables } from "../utils/db";


// let db
// (async () => {
//   db = await getDBConnection()
//   await createTables(db)
// })()


export const DatabaseContext = React.createContext({
  isConnected: null,
  getSeqAndPhases: null,
  getAllSeqs: null,
  createNewSeq: null,
  deleteSeq: null,
  deleteAllSeqs: null
})

export const DatabaseProvider = ({ children }) => {

  const [db, setDatabase] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    async function initDB() {
      let _db = await getDBConnection()
      setDatabase(_db)
      await createTables(_db)
      setIsConnected(true)
    }
    initDB()
  }, [])

  const createNewSeq = async (name, color, duration, phases) => {
    if (db) {
      let seq = await db.executeSql(
        `INSERT INTO seqs (name, color, duration) VALUES("${name}", "${color}", ${duration})`)
      let seqId = seq[0].insertId
      phases.map(async (phase, i) => {
        await db.executeSql(
          `INSERT INTO phases 
              (name, duration, seq_order, seq_id) 
              VALUES("${phase.name}", ${phase.duration}, ${i}, ${seqId})`)
      })
    }
  }

  const deleteSeq = async (id) => {
    if (db) {
      await db.executeSql(
        `DELETE FROM seqs WHERE id=${id}`
      )
      await db.executeSql(
        `DELETE FROM phases WHERE seq_id=${id}`
      )
    }
  }

  const deleteAllSeqs = async () => {
    if (db) {
      await db.executeSql(
        `DELETE FROM seqs`
      )
      await db.executeSql(
        `DELETE FROM phases`
      )
    }
  }

  const getSeqAndPhases = async (seqId) => {
    if (db) {
      let seqResponse = await db.executeSql(
        `SELECT * FROM seqs WHERE id=${seqId}`
      )
      let phasesResponse = await db.executeSql(
        `SELECT * FROM phases WHERE seq_id=${seqId}`
      )

      let phases = []
      for (let i = 0; i < phasesResponse[0].rows.length; i++) {
        phases.push(phasesResponse[0].rows.item(i))
      }

      return {
        seq: seqResponse[0].rows.item(0),
        phases: phases
      }
    }
    return null
  }

  const getAllSeqs = async () => {
    if (db) {
      const data = await db.executeSql(`SELECT * FROM seqs`)
      const seqs = []
      for (let i = 0; i < data[0].rows.length; i++) {
        seqs.push(data[0].rows.item(i))
      }
      return seqs
    }
    return []
  }

  return (
    <DatabaseContext.Provider value={{
      isConnected: isConnected,
      createNewSeq: createNewSeq,
      getSeqAndPhases: getSeqAndPhases,
      getAllSeqs: getAllSeqs,
      deleteSeq: deleteSeq,
      deleteAllSeqs: deleteAllSeqs
    }}>
      {children}
    </DatabaseContext.Provider>
  )
}
