import { enablePromise, openDatabase, ResultSet, SQLiteDatabase } from "react-native-sqlite-storage"

enablePromise(true)

interface DBInterface {
    createTables: () => Promise<void>
}

class DB implements DBInterface {
    private connection: SQLiteDatabase

    constructor(connection: SQLiteDatabase){
        this.connection = connection
    }

    async createTables(): Promise<void>{
        const goalTableQuery: string = `
            CREATE TABLE IF NOT EXISTS goals (
                id TEXT PRIMARY KEY,
                goals TEXT
            )
        `

        const taskTableQuery: string = `
            CREATE TABLE IF NOT EXISTS tasks (
                id TEXT PRIMARY KEY,
                tasks TEXT
            )
        `

        await this.connection.executeSql(goalTableQuery)
        await this.connection.executeSql(taskTableQuery)
    }

    async getData(table: string){
        const getQuery: string = `
            SELECT * FROM ${table}
        `
        const [result]: [ResultSet] = await this.connection.executeSql(getQuery)
        console.log(result)
        
    }
}

async function Model(): Promise<DB> {
    // Create db connecttion
    const connection: SQLiteDatabase = await openDatabase({name: "goals.db", location: "default"})
    // Create db instance
    const db: DB = new DB(connection)
    // Create the tables
    await db.createTables()
    //  return the db instance
    return db
}

export default Model