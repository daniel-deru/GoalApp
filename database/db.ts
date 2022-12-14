import {
    WebSQLDatabase, 
    openDatabase, 
    SQLResultSet, 
    SQLError, 
    SQLTransaction, 
    SQLStatementCallback, 
    SQLStatementErrorCallback,
    ResultSet,
    SQLResultSetRowList
} from "expo-sqlite"

interface Result {
    data: any,
    error: any
}

type SQLResult = SQLError | SQLResultSet

class Model {
    private db: undefined | WebSQLDatabase;

    constructor(){
        this.db = openDatabase("goals.db")
    }

    public async createTables(): Promise<boolean>{
        if(!this.db) return false

        const goals = await this.createTable("goals")
        const tasks = await this.createTable("tasks")

        if(!goals.success && !tasks.success) return false

        return true
    }

    private async createTable(tableName: string): Promise<{success: boolean}> {

        const query: string = 
        `CREATE TABLE IF NOT EXISTS ${tableName} (
            id TEXT DEFAULT ${tableName} PRIMARY KEY,
            ${tableName} TEXT
        )`
        
        const result = await this.execute(query)
        if("message" in result) throw new Error(result.message)

        return {success: true}
    }

    public async createInitialData(table: string): Promise<{success: boolean, message?: string}> {
        const currentData = await this.read(table)
        if(currentData._array.length > 0) return {success: true, message: "Data already created"}

        const query = `INSERT INTO ${table} (id, ${table}) VALUES(?, ?)`

        const result = await this.execute(query, [table, JSON.stringify({})])
        
        if("message" in result) throw new Error(result.message)

        return {success: true}
    }

    public async update(table: string, data: string): Promise<boolean> {
        const query = `UPDATE ${table} SET (${table}) = ? WHERE id = ?`

        const result = await this.execute(query, [data, table])

        if("message" in result) throw new Error(result.message)

        return true
    }

    public async read(table: string): Promise<SQLResultSetRowList> {

        const query = `SELECT * FROM ${table}`
        const result: SQLResult = await this.execute(query)

        if("message" in result) throw new Error(result.message)
        
        return result.rows

    }

    public async clearTable(table: string): Promise<boolean>{
        const query = `UPDATE ${table} SET ${table} = ? WHERE id = ?`
        const result = await this.execute(query, [JSON.stringify({}), table])

        if("message" in result) throw new Error(result.message)

        return true
    }

    private async execute(query: string, args: Array<string> = []): Promise<SQLResult>{
        return new Promise((resolve, reject) => {
            if(!this.db) return reject("No database instance")
            this.db.transaction((tx: SQLTransaction) => {
                tx.executeSql(
                    query, 
                    args, 
                    (_, result: SQLResultSet) => resolve(result), 
                    (_, error: SQLError) =>  {
                        reject(error)
                        return true
                    }
                )
            })
        })      
    }
}

export default Model