// There's also a second object called sessionStorage available,
// which works the same way, but clears when the window is closed.

if (!localStorage.checkins) localStorage.checkins = JSON.stringify([]);

this.db = openDatabase('gear bag', 1.0, 'iFixit Grab Bag', 20);
this.db.transaction(function (tx) {
    tx.executeSql("create table if not exists " +
        "checkins(id integer primary key asc, time integer, latitude float," +
        "longitude float, mood string)",
        [],
        function() { console.log("look, we have storage?"); }
    );
});


