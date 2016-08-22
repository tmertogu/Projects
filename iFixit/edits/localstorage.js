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
            'name TEXT UNIQUE, summary TEXT, img TEXT, show BOOLEAN NOT NULL DEFAULT FALSE)', [],
            function (tx, results) { console.log("Successfully Created")},
            function (tx, error) { console.log("Error, could not create")}
        );
    });
};
GearBag.prototype.add = function (name, summary, img) {
    this.myGearBag.transaction(function (tx) {
        tx.executeSql(
            'INSERT INTO GEAR (name, summary, img) '+
            'VALUES (?, ?, ?)', [name, summary, img],
            function (tx, results) { console.log("Successfully Inserted")},
            function (tx, error) { console.log("Error, could not insert")}
        );
    });
};

GearBag.prototype.showHide = function (name, b) {
    this.myGearBag.transaction(function (tx) {
        tx.executeSql(
            'UPDATE GEAR SET show =? where NAME =?', [b, name],
            function (tx, results) { console.log("Successfully Updated")},
            function (tx, error) { console.log("Error, could not update")}
        );
    });
};

GearBag.prototype.listAll = function () {
    this.myGearBag.transaction(function (tx) {
        tx.executeSql('SELECT * FROM GEAR WHERE show = "TRUE" ORDER BY rowid DESC',
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

GearBag.prototype.remove = function (name, summary, img) {
    this.myGearBag.transaction(function (tx) {
        tx.executeSql(
            'DELETE FROM GEAR WHERE name=? and summary=? and img=?', [name, summary, img],
            function (tx, results) { console.log("Successfully Removed")},
            function (tx, error) { console.log("Error, could not remove")}
        );
    });
};

GearBag.prototype.removeHidden = function () {
    this.myGearBag.transaction(function (tx) {
        tx.executeSql(
            'DELETE FROM GEAR WHERE show = "FALSE"', [],
            function (tx, results) { console.log("Successfully Removed Hidden")},
            function (tx, error) { console.log("Error, could not remove hidden")}
        );
    });
};

GearBag.prototype.removeAll = function () {
    this.myGearBag.transaction(function (tx) {
        tx.executeSql(
            'UPDATE GEAR SET show = "FALSE" where show = "TRUE"', [],
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
