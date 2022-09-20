import {WebSQLDatabase, openDatabase, SQLResultSet} from "expo-sqlite"


class Model {
    private db: undefined | WebSQLDatabase;

    constructor(){
        this.db = openDatabase("goals.db")
        this.createTables()
       
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
            
            tx.executeSql(`SELECT * FROM ${table}`, [], (tx, result: SQLResultSet) => {
                const { rows: { _array: data } }: SQLResultSet = result
                console.log(data)
            }, (_, error) => {
                console.log(error)
                return false
            })
        }))
    }
}

export default Model