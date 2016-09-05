var iDevice = function (name, summary, img) {
    this.name = name;
    this.summary = summary;
    this.img = img;
    this.html = "";
};

var GearBag = function () {
    this.myGearBag = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
};

GearBag.prototype.create = function () {
    this.myGearBag.transaction(function (tx) {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS GEAR (' +
            'name TEXT UNIQUE, summary TEXT, img TEXT, date TEXT)', [],
            function (tx, results) { console.log("Successfully Created")},
            function (tx, error) { console.log("Error, could not create")}
        );
    });
};
GearBag.prototype.add = function (name, summary, img) {
    var d = new Date();
    this.myGearBag.transaction(function (tx) {
        tx.executeSql(
            'INSERT OR REPLACE INTO GEAR (name, summary, img, date) '+
            'VALUES (?, ?, ?, ?)', [name, summary, img, d.getTime()],
            function (tx, results) { console.log("Successfully Inserted")},
            function (tx, error) { console.log("Error, could not insert")}
        );
    });
};

GearBag.prototype.listAll = function () {
    this.myGearBag.transaction(function (tx) {
        tx.executeSql('SELECT * FROM GEAR ORDER BY date DESC',
            [], function (tx, results) {
            var len = results.rows.length, i;
            console.log("Found rows: " + len);
            var output="<ul>";
            for(i = 0; i < len; i++){
                myDev = results.rows.item(i);
                output += createBagHTML(myDev.name, myDev.img);
            }
            output+="</ul>";
            $('myBag').html(output)},
            function (tx, results) { console.log("Successfully Listed")},
            function (tx, error) { console.log("Error, could not list")});
    }, null);
};

GearBag.prototype.remove = function (name) {
    this.myGearBag.transaction(function (tx) {
        tx.executeSql(
            'DELETE FROM GEAR WHERE name=?', [name],
            function (tx, results) { console.log("Successfully Removed")},
            function (tx, error) { console.log("Error, could not remove")}
        );
    });
};


GearBag.prototype.removeAll = function () {
    this.myGearBag.transaction(function (tx) {
        tx.executeSql(
            'DELETE FROM GEAR', [],
            // 'UPDATE GEAR SET show = "FALSE" where show = "TRUE"', [],
            function (tx, results) { console.log("Successfully Removed All")},
            function (tx, error) { console.log("Error, could not remove all")}
        );
    });
};

GearBag.prototype.dropTable = function () {
    this.myGearBag.transaction(function (tx) {
        tx.executeSql(
            'DROP TABLE GEAR', [],
            function (tx, results) { console.log("Successfully Dropped")},
            function (tx, error) { console.log("Error, could not drop")}
        );
    });
};
