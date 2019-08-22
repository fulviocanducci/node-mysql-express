const conn = require('./mysql-connection');
const messages = require('./constante_mysql');

module.exports = {
    setRouter: (router) => {
        router.get('/todos', (req, res) => {
            conn.executeSQLQuery('SELECT * FROM todos ORDER BY description', (error, results, fields) => {
                if (error) {
                    res.json(error);
                } else {
                    res.json(messages.return_data(200,messages.select_all,results));
                }
            });
        });
        
        router.get('/todo/:id?', (req, res) => {
            const id = parseInt(req.params.id);
            conn.executeSQLQueryParams('SELECT * FROM todos WHERE id=?',[id], (error, results, fields) => {
                if (error) {
                    res.json(error);
                } else {
                    if (results.length === 1) {
                        res.json(messages.return_data(200,messages.select_one,results[0]));
                    } else {
                        res.status(404)
                            .json(messages.return_data(404,messages.no_select_one));
                    }
                }
            });
        });
        
        router.post('/todo', (req, res) => {
            const description = req.body.description;
            const done = req.body.done;
            const params = [description, done];            
            conn.executeSQLQueryParams('INSERT INTO todos(description, done) VALUES(?,?)', params, (error, results, fields) => {
                if (error) {
                    res.json(error);
                } else {
                    const id = results.insertId;
                    if (id) {
                        conn.executeSQLQueryParams('SELECT * FROM todos WHERE id=?',[id], (error, results, fields) => {
                            if (error) {
                                res.json(error);
                            } else {
                                res.json(messages.return_data(200,messages.insert,results[0]));
                            }
                        });
                    }
                }
            });    
        });
        
        router.put('/todo/:id?', (req, res) => {
            const description = req.body.description;
            const done = req.body.done;
            const id = parseInt(req.params.id)
            const params = [description, done, id];
            conn.executeSQLQueryParams('UPDATE todos SET description=?, done=? WHERE id=?', params, (error, results, fields) => {
                if (error) {
                    res.json(error);
                } else {            
                    if (results.changedRows === 1) {
                        conn.executeSQLQueryParams('SELECT * FROM todos WHERE id=?',[id], (error, results, fields) => {
                            if (error) {
                                res.json(error);
                            } else {
                                res.json(messages.return_data(200,messages.update, results[0]));
                            }
                        });
                    } else {
                        res.json(messages.return_data(200,messages.no_update));
                    }            
                }
            });   
        });
        
        router.delete('/todo/:id?', (req, res) => {
            const id = parseInt(req.params.id);
            conn.executeSQLQueryParams('DELETE FROM todos WHERE id=?', [id], (error, results, fields) => {
                if (error) {
                    res.json(error);
                } else {
                    const affectedRows = results.affectedRows;
                    if (affectedRows === 1) {                
                        res.json(messages.return_data(200, messages.delete));
                    } else {                
                        res.status(404)
                            .json(messages.return_data(404, messages.no_delete));
                    }            
                }
            });
        })        
    }
}