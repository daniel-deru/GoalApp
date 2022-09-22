import {
    WebSQLDatabase, 
    openDatabase, 
    SQLResultSet, 
    SQLError, 
    SQLTransaction, 
    SQLStatementCallback, 
    SQLStatementErrorCallback
} from "expo-sqlite"

interface Result {
    data: any,
    error: any
}

class Model {
    private db: undefined | WebSQLDatabase;
    private _result: Result = {data: null, error: null};

    constructor(){
        this.db = openDatabase("goals.db")
    }

    get result(): Result {
        return this._result
    }

    set result(result: Result){
        this._result = result
    }

    public createTables(): void{
        if(!this.db) return

        this.createTable("goals")
        this.createTable("tasks")
    }

    private createTable(tableName: string): void {
        if(!this.db) return
       
        this.db.transaction((tx: SQLTransaction) => {
            const query: string = 
            `CREATE TABLE IF NOT EXISTS ${tableName} (
                id TEXT DEFAULT ${tableName} PRIMARY KEY,
                ${tableName} TEXT
            )`

            this.execute(tx, query)
        })
    }

    public read(table: string): Model {
        if(!this.db){
            this.result = {data: null, error: "No Database"}
            return this
        }
        
        this.db.transaction(((tx: SQLTransaction) => {
            this.execute(tx, `SELECT * FROM ${table}`)
        }))

        return this
    }

    private execute(tx: SQLTransaction, query: string, args: Array<string> = []){

        const resultCallback: SQLStatementCallback = (_, result: SQLResultSet) => this.trCallback(result)
        const errorCallback: SQLStatementErrorCallback =  (_, error) => this.stErrCallback(error)

        tx.executeSql(query, args, resultCallback, errorCallback)
    }

    private trCallback(result: SQLResultSet){
        const { rows: { _array: data} }: SQLResultSet = result
        this.result = {...this.result, data}
    }

    private stErrCallback(error: SQLError){
        console.log(error.message)
        return false
    }
}

export default Model