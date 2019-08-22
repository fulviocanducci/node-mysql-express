module.exports = {
    select_all: 'select-all',
    select_one: 'select-one', 
    no_select_one: 'no-select-one',
    insert: "insert",
    update: 'update',
    no_update: 'no-update',
    no_delete: 'no-delete or no-exists',
    return_data: function (status, description, data) {
        return {
            status, 
            description, 
            data
        };
    }
}
