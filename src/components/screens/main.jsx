import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { editExample } from '../../store/actions/exampleValue'
import About from './about'
import { bgC, titleC, textC } from '../../data/const'
import { SVGnoImg } from '../SVGnoImg'

const window = Dimensions.get("window");
const imgItemHeight = window.height / 2.8
const imgItemWidth = imgItemHeight * 0.6

export default function Main({ navigation }) {
    const [filmsList, setFilmsList] = useState()
    const [searchText, setSearchText] = useState()
    const [showNFText, setShowNFText] = useState(false)
    const [isLoading, setLoading] = useState(true);
    const apiUrl = 'http://api.tvmaze.com/';
    useEffect(() => {
        showNewWeb()
    }, [])

    const changeSearcText = (text) => {
        setSearchText(text)
        setShowNFText(false)

    }
    function showNewWeb() {
        fetch(apiUrl + 'schedule/web')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let curentId = 0
                let smalList = [];
                let img
                data.forEach((item) => {
                    if (item._embedded.show.image) img = item._embedded.show.image.medium
                    else img = false
                    if (curentId !== item._embedded.show.id) {
                        curentId = item._embedded.show.id
                        smalList.push({
                            id: String(item.id),
                            img: img,
                            name: item._embedded.show.name,
                            language: item._embedded.show.language,
                            idShow: item._embedded.show.id,
                        })
                    }
                })
                setFilmsList(smalList)

            })
            .finally(() => setLoading(false));

    }

    function searchGo() {
        if (searchText == '') showNewWeb()
        else {
            fetch(apiUrl + 'search/shows?q=' + searchText)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (!data.length) setShowNFText(true)
                    let smalList = data.map(item => {
                        if (item.show.image) img = item.show.image.medium
                        else img = false
                        return {
                            id: String(item.show.id,),
                            img: img,
                            name: item.show.name,
                            language: item.show.language,
                            idShow: item.show.id,
                        }
                    })
                    setFilmsList(smalList)
                });
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find your show </Text>
            <View style={styles.searchWrap}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={changeSearcText}
                    onEndEditing={searchGo}
                ></TextInput>
                <FontAwesome name="search" size={20} color={textC} style={styles.searchIcon} />
            </View>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    numColumns={2}
                    columnWrapperStyle={{
                        justifyContent: 'space-around',
                        marginBottom: 20,
                    }}
                    ListHeaderComponent={() => showNFText ? <Text style={styles.suportText}>no results were found for "{searchText}"</Text> : false}
                    ListHeaderComponentStyle={{ alignItems: 'center' }}
                    data={filmsList}
                    keyExtractor={item => item.id}
                    style={styles.filmList}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            style={styles.filmListItem}
                            onPress={
                                () => {
                                    navigation.navigate('Description', {
                                        itemId: item.idShow,
                                        otherParam: 'anything you want here',
                                    });
                                }
                            }
                        >
                            {item.img? 
                            <Image
                                source={{ uri: item.img }}
                                style={styles.itemImg}
                            />:<View style={styles.noImgWrap}><SVGnoImg></SVGnoImg></View>}
                            <Text style={styles.filmItemTitle}>{item.name}</Text>
                            <Text style={styles.filmItemCountry}>{item.language}</Text>
                        </TouchableOpacity>
                    }
                >
                </FlatList>
            )
            }

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop:20,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: bgC,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: titleC,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    textInput: {
        fontSize: 16,
        padding: 10,
        paddingLeft: 36,
        paddingRight: 20,
        color: textC,
        borderRadius: 10,
        width: '100%',
        backgroundColor: 'white',
    },
    filmList: {
        width: '100%',
        flexDirection: 'column',
    },
    itemImg: {
        width: '100%',
        height: imgItemHeight,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    noImgWrap:{
        width: '100%',
        height: imgItemHeight,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems:'center',
    },

    filmListItem: {
        borderRadius: 20,
        width: '45%',
        backgroundColor: 'white',
        paddingBottom: 6

    },
    filmItemTitle: {
        marginTop: 10,
        color: titleC,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    filmItemCountry: {
        color: textC,
        marginLeft: 10,
    },
    searchWrap: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 20,
    },
    searchIcon: {
        position: 'absolute',
        top: 13,
        left: 10,
    },
    suportText: {
        width: '70%',
        color: textC,
        fontSize: 16,
        textAlign: 'center',
    }

});
