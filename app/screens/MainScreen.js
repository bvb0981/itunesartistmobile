import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Button, Image, Dimensions, SectionList, Alert, ToastAndroid, ActivityIndicator, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { useIsFocused } from "@react-navigation/native";
import { GetArtistByName, InsertArtist, GetArtistData, DeleteArtistTable, GetUniquecollectionID, GetCollectionNameList, GetUniqueReleasedDate, GetCollectionListByReleasedDate } from "../repository/artist.js"
export default function MainScreen({ navigation }) {
    const [txtsearchval, settxtsearchval] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [finalData, setFinalData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [disabled, setdisabled] = useState(false);
    const isFocused = useIsFocused();
    useEffect(() => {
            GetArtistData(async (artistdataRet) => {
                console.log(artistdataRet.length)
                if (artistdataRet.length > 0) {
                    setLoading(true)
                    setdisabled(true)
                    settxtsearchval(artistdataRet[0]["SearchData"])
                    GetUniquecollectionID(async (getUniqueColsRet) => {
                        let counter2 = 0;
                        let dataArray = [];
                        if (getUniqueColsRet.length > 0) {
                            for (let colid of getUniqueColsRet) {
                                GetCollectionNameList(colid["CollectionID"], async (getColListRet) => {

                                    if (getColListRet.length > 0) {
                                        let dataToPush = {
                                            title: getColListRet[0]["CollectionName"],
                                            data: getColListRet
                                        }

                                        dataArray.push(dataToPush);


                                    }
                                    counter2++
                                    if (getUniqueColsRet.length - 1 == counter2) {
                                        setFinalData(dataArray)
                                        setLoading(false)
                                        setdisabled(false)
                                    }
                                })

                            }
                        } else {
                            setLoading(false)
                            setdisabled(false)
                        }

                    })
                } else {
                    setLoading(false)
                    setdisabled(false)
                }

            })
       

    }, [navigation]);
    const buildDatatByAlbum = (artistname) => {
        settxtsearchval(artistname)
        artistname.replace(/^\s+|\s+$/gm, '')
        artistname.replace(/\s/g, '+')
        GetArtistByName(
            artistname,
            async (artistret) => {

                if (artistret != null) {
                    if (artistret.results.length > 0) {


                        DeleteArtistTable(async (deleteRet) => {

                            if (deleteRet) {
                                let counter = 0;
                                for (let artst of artistret.results) {
                                    if (artst.kind == "song") {
                                        InsertArtist(artst, txtsearchval, async (insertRet) => {

                                        })
                                    }
                                    counter++;
                                    if (artistret.results.length - 1 == counter) {
                                        GetUniquecollectionID(async (getUniqueColsRet) => {
                                            let counter2 = 0;
                                            let dataArray = [];
                                            for (let colid of getUniqueColsRet) {

                                                GetCollectionNameList(colid["CollectionID"], async (getColListRet) => {

                                                    if (getColListRet.length > 0) {
                                                        let dataToPush = {
                                                            title: getColListRet[0]["CollectionName"],
                                                            data: getColListRet
                                                        }

                                                        dataArray.push(dataToPush);


                                                    }
                                                    counter2++
                                                    if (getUniqueColsRet.length - 1 == counter2) {
                                                        setFinalData(dataArray)
                                                        setLoading(false)
                                                        setdisabled(false)
                                                    }
                                                })

                                            }
                                        })
                                    }
                                }
                            }
                        })

                    } else {
                        setLoading(false)
                        setdisabled(false)
                    }
                } else {
                    setLoading(false)
                    setdisabled(false)
                }
            })
    }

    const builDataByReleaseDate = (artistname) => {
        settxtsearchval(artistname)
        artistname.replace(/^\s+|\s+$/gm, '')
        artistname.replace(/\s/g, '+')
        GetArtistByName(
            artistname,
            async (artistret) => {

                if (artistret != null) {
                    if (artistret.results.length > 0) {

                        DeleteArtistTable(async (deleteRet) => {

                            if (deleteRet) {
                                let counter = 0;
                                for (let artst of artistret.results) {
                                    if (artst.kind == "song") {
                                        InsertArtist(artst, txtsearchval, async (insertRet) => {

                                        })
                                    }
                                    counter++;
                                    if (artistret.results.length - 1 == counter) {
                                        GetUniqueReleasedDate(async (getUniqueReldatesRet) => {
                                            let counter2 = 0;
                                            let dataArray = [];
                                            for (let reldate of getUniqueReldatesRet) {


                                                GetCollectionListByReleasedDate(reldate["ReleasedDate"], async (getColListRet) => {


                                                    if (getColListRet.length > 0) {
                                                        let dataToPush = {
                                                            title: getColListRet[0]["ReleasedDate"],
                                                            data: getColListRet
                                                        }

                                                        dataArray.push(dataToPush);


                                                    }
                                                    counter2++
                                                    if (getUniqueReldatesRet.length - 1 == counter2) {
                                                        setFinalData(dataArray)

                                                        setLoading(false)
                                                        setdisabled(false)
                                                    }
                                                })

                                            }
                                        })
                                    }
                                }
                            }
                        })

                    } else {
                        setLoading(false)
                        setdisabled(false)
                    }
                } else {
                    setLoading(false)
                    setdisabled(false)
                }
            })
    }


    const searchArtist = (artistname) => {

        if (artistname != null && artistname != "") {
            setLoading(true)
            setdisabled(true)
            setFinalData([])
            if (selectedIndex == 0) {

                buildDatatByAlbum(artistname)
            }
            else {

                builDataByReleaseDate(artistname)
            }
        } else {
            ToastAndroid.show("Enter Artist Name", ToastAndroid.SHORT)
        }

    }
    const handleIndexChange = index => {

        setSelectedIndex(index)
        if (txtsearchval != null && txtsearchval != "") {
            setLoading(true)
            setdisabled(true)
            setFinalData([])
            if (index == 0) {
                buildDatatByAlbum(txtsearchval)
            }
            else {
                builDataByReleaseDate(txtsearchval)
            }
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <SearchBar
                style={{ width: '90%' }}
                round
                searchIcon={{ size: 24 }}
                onChangeText={text => settxtsearchval(text)}
                onClear={text => setFinalData([])}
                placeholder="Enter Artist Name..."
                value={txtsearchval}
            />
            <View style={styles.bodySearchbtn}>
                <TouchableOpacity
                    onPress={!disabled ? () => searchArtist(txtsearchval) : () => ToastAndroid.show("Processing", ToastAndroid.SHORT)}
                    style={styles.touchsearchBody}
                >
                    <Text style={styles.actionText}>Search</Text>
                </TouchableOpacity>
            </View>
            <SegmentedControlTab
                values={["Album", "Released Date"]}
                selectedIndex={selectedIndex}
                onTabPress={index => handleIndexChange(index)}
                tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle}
                tabTextStyle={styles.tabTextStyle}
                activeTabStyle={styles.activeTabStyle}
                activeTabTextStyle={styles.activeTabTextStyle}
                borderRadius={10}
            />
            {loading ? (
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        paddingTop: 30,
                        backgroundColor: "white",
                        alignItems: "center",
                        padding: 8,
                    }}
                >
                    <ActivityIndicator color="red" size="large" visible={true} />
                </View>
            ) : (
                <SectionList
                    style={styles.sectioncontainer}
                    sections={finalData}
                    renderItem={({ item }) => <TouchableOpacity onPress={() => navigation.navigate("ArtistDetailsScreen", {
                        artistData: item,
                    })}><Text style={styles.row}>{item.TrackName}</Text></TouchableOpacity>}
                    renderSectionHeader={({ section }) => (
                        <Text style={styles.header}> {section.title}</Text>
                    )}
                    keyExtractor={(item) => Math.random().toString()}
                />
            )}
        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    sectioncontainer: {
        flex: 2,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',    //THIS LINE HAS CHANGED
        backgroundColor: "#fff",
        width: Dimensions.get("screen").width,
    },
    thBodyTouchable: {
        flexDirection: "column",
        backgroundColor: "white",
        borderWidth: 2,
        height: 10,
        borderColor: "white",
        justifyContent: "center",
        width: Dimensions.get("screen").width - 900,
        height: Dimensions.get("window").height - 1000,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 10,
        marginTop: 10,
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 8,
        backgroundColor: "white",
    },
    bodySearchbtn: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "space-between",
        width: Dimensions.get("window").width,
    },
    touchsearchBody: {
        elevation: 8,
        backgroundColor: "#27ae60",
        borderRadius: 5,
        padding: 10,
        height: 50,
        width: Dimensions.get("window").width - 20,
    },
    actionText: {
        fontSize: 18,
        color: "#fff",
        alignSelf: "center",
    },
    row: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'skyblue',
    },
    header: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'steelblue',
        color: 'white',
        fontWeight: 'bold',
    },
    tabContainerStyle: {
        backgroundColor: 'transparent',
        width: '100%', height: '8%',
        borderRadius: 10
    },
    tabStyle: {
        backgroundColor: 'lightgray',
        borderRadius: 10, borderColor: 'transparent',
        fontSize: 18,
        margin: 5
    },
    tabTextStyle: {
        color: '#818181',
        fontSize: 18
    },

    activeTabStyle: {
        backgroundColor: 'white',
        borderRadius: 10, borderColor: 'transparent',
        margin: 5
    },
    activeTabTextStyle: {
        color: 'black',
        fontSize: 18
    },
    textStyle: {
        color: 'white',
        fontSize: 20, fontWeight: '700',
        marginTop: 40
    }
})