import { enablePromise, openDatabase, SQLiteDatabase } from "react-native-sqlite-storage"

enablePromise(true)

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
    return openDatabase({name: "goals.db", location: "default"})
}

const getData = async (table_name: string, db: SQLiteDatabase) => {
    const query: string = `SELECT * FROM ${table_name}`
    try {
        const result = await db.executeSql(query)
        return result[0]
    }
    catch (e) {
        throw e
    }
}

const saveData = async (table_name: string, name: string) => {
    
}

const createTable = async (db: SQLiteDatabase): Promise<void> => {
    const query: string = `
        CREATE TABLE IF NOT EXISTS goals (
            name TEXT DEFAULT "goal" NOT NULL PRIMARY KEY 
            goal TEXT NOT NULL;
        );
    `
    await db.executeSql(query)
}