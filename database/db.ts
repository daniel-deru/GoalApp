import {WebSQLDatabase, openDatabase, SQLResultSet} from "expo-sqlite"

interface Result {
    data: any,
    error: any
}


class Model {
    private db: undefined | WebSQLDatabase;
    private _result: Result = {data: null, error: null};

    constructor(){
        this.db = openDatabase("goals.db")
        this.createTables()
       
    }

    get result(): Result {
        return this._result
    }

    set result(result: Result){
        this._result = result
    }

    private createTables(): void{
        if(!this.db) return

        this.createTable("goals")
        this.createTable("tasks")
    }

    private createTable(tableName: string): void {
        if(!this.db) return
       
        this.db.transaction(tx => {
            
            tx.executeSql(`
                CREATE TABLE IF NOT EXISTS ${tableName} (
                    id TEXT DEFAULT ${tableName} PRIMARY KEY,
                    ${tableName} TEXT
                )
            `, [], (_, result: SQLResultSet) => {
                console.log("Creating tables 3")
                // console.log(result)
            }, (tx, error) => {
                // console.log(error)
                return true
            })
        })
    }

    public read(table: string){
        if(!this.db) return
        

        this.db.transaction((tx => {
            
            tx.executeSql(
                `SELECT * FROM ${table}`,
                 [], 
                 (tx, result: SQLResultSet) => this.trCallback(result),
             (_, error) => {
                console.log(error)
                return false
            })
        }))
    }

    private trCallback(result: SQLResultSet){
        const { rows: { _array: data} }: SQLResultSet = result
        this.result = {...this.result, data}
    }
}

export default Model