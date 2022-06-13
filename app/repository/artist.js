
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("itunesArtistdb.db");
import moment from "moment";
export const GetArtistByName = async (artistName, artistReturnData) => {

    let url = null;
    url = "https://itunes.apple.com/search?term=" + artistName + " ";
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: [],
    })
        .then((response) => response.json())
        .then((responseJson) => {
            artistReturnData(responseJson)
        })
        .catch((error) => {
            console.error(error.message);
        });
};

export const InsertArtist = async (artst, searchname, cb) => {
    var query = 'Insert into tbl_Artists(MobileArtistID,ArtistID,ArtistName,ArtistWorkURL,CollectionID,CollectionName,ReleasedDate,TrackName,TrackID,SearchData)' +
        ' VALUES (null,?,?,?,?,?,?,?,?,? )';
    var params = [artst.artistId, artst.artistName, artst.artworkUrl100, artst.collectionId.toString(), artst.collectionName, moment(new Date(artst.releaseDate)).format("MM-DD-YYYY"), artst.trackName, artst.trackId.toString(), searchname];
    db.transaction((tx) => {
        try {
            tx.executeSql(query, params, (tx, results) => {
                if (results.insertId > 0) {

                    cb(true)
                }
                else {
                    cb(false)

                }

            }, function (tx, err) {
                cb(false)

            });
        } catch (Exception) {
            console.log("error")
        }

    });




}

export const GetArtistData = async (cb) => {
    var query = 'Select * from tbl_Artists';
    var params = [];
    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            if (results.rows._array.length > 0) {

                cb(results.rows._array);
            }
            else {
                cb(results.rows._array);
            }
        }, function (tx, err) {

            cb = null;
        });
    });
}
export const GetUniquecollectionID = async (cb) => {
    var query = 'Select DISTINCT CollectionID from tbl_Artists';
    var params = [];
    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            if (results.rows._array.length > 0) {

                cb(results.rows._array);
            }
            else {
                cb(results.rows._array);
            }
        }, function (tx, err) {

            cb = null;
        });
    });
}
export const GetUniqueReleasedDate = async (cb) => {
    var query = 'Select DISTINCT ReleasedDate from tbl_Artists ORDER BY DATE(substr(ReleasedDate,7,4)||"-"||substr(ReleasedDate,1,2)||"-"||substr(ReleasedDate,4,2)) desc';
    var params = [];
    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            if (results.rows._array.length > 0) {

                cb(results.rows._array);
            }
            else {
                cb(results.rows._array);
            }
        }, function (tx, err) {

            cb = null;
        });
    });
}
export const GetCollectionNameList = async (colID, cb) => {
    var query = 'Select * from tbl_Artists Where CollectionID = ' + colID + ' ';
    var params = [];
    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            if (results.rows._array.length > 0) {

                cb(results.rows._array);
            }
            else {
                cb(results.rows._array);
            }
        }, function (tx, err) {

            cb = null;
        });
    });
}
export const GetCollectionListByReleasedDate = async (reldate, cb) => {

    var query = 'Select * from tbl_Artists Where ReleasedDate = ' + ('"' + reldate + '"') + ' ';
    var params = [];
    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            if (results.rows._array.length > 0) {

                cb(results.rows._array);
            }
            else {
                cb(results.rows._array);
            }
        }, function (tx, err) {

            cb = null;
        });
    });
}
export const DeleteArtistTable = async (cb) => {
    var query = 'DELETE FROM tbl_Artists'
    var params = [];
    db.transaction((tx) => {
        tx.executeSql(query, params, (tx, results) => {
            if (results.rows._array.length == 0) {

                cb(true);
            }
            else {
                cb(false);
            }
        }, function (tx, err) {


        });
    });
}

