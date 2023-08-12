import React, { useState, useCallback, useEffect } from 'react'
import { Alert, Button, Dimensions, Linking, StyleSheet, Text, ActivityIndicator, View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { URL, URLSearchParams } from 'react-native-url-polyfill'

import { SVGnoImg, SVGnoPhoto } from '../SVGnoImg'
import Flag from 'react-native-flags'
import { bgC, titleC, textC } from '../../data/const'
import PrintLink from '../PrintLink'
import showAlert from '../showAlert'

const window = Dimensions.get("window");
let posterH = window.height / 100 * 60
let posterW = posterH - posterH / 100 * 40
let contentW = '100%'
if (window.width > 600) contentW = window.width / 100 * 60

const PrintAtribute = (props) => {
    return (
        <Text style={{ color: titleC }} ><Text style={styles.bold}>{props.title + ': '}</Text>{props.value}</Text>
    )
}


export default function Description({ route, navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [film, setFilm] = useState()
    const { itemId } = route.params
    useEffect(() => {
        fetch('http://api.tvmaze.com/shows/' + itemId + '?embed=cast')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setFilm(data)
            })
            .finally(() => setLoading(false));
    }, [])
    return (
        <View style={styles.container}
            keyboardShouldPersistTaps='handled'>
            {isLoading ? <ActivityIndicator /> : (
                <ScrollView style={styles.scroll}>
                    {film.image ?
                        <Image
                            source={{ uri: film.image.medium }}
                            style={styles.poster}
                        /> :
                        <View style={styles.moImWrapper}>
                            <SVGnoImg
                                style={styles.poster}
                            ></SVGnoImg>
                        </View>
                    }
                    <View style={styles.contentWrapper}>
                        <Text style={styles.title}>
                            {film.name}
                        </Text>
                        {film.summary ? <Text style={styles.description}>{film.summary.replace(/<\/?[^>]+(>|$)/g, "")}</Text> : false}
                        {film.premiered ? <PrintAtribute title={"Premiered"} value={film.premiered} ></PrintAtribute> : false}
                        {film.type ? <PrintAtribute title={"Show type"} value={film.type} ></PrintAtribute> : false}
                        {film.status ? <PrintAtribute title={"Status"} value={film.status} ></PrintAtribute> : false}
                        {film.language ? <PrintAtribute title={"language"} value={film.language} ></PrintAtribute> : false}
                        {film.runtime ? <PrintAtribute title={"Average Runtime"} value={film.runtime + ' minutes'} ></PrintAtribute> : false}
                        {film.genres[0] ? <PrintAtribute title={"Genres"} value={film.genres.join(' / ')} ></PrintAtribute> : false}
                        {film.officialSite ? <PrintLink
                            title={'Official site'}
                            link={film.officialSite}
                            value={new URL(film.officialSite).host} >
                        </PrintLink> : false}
                        {
                            film.network ?
                                <View style={styles.line}>
                                    <Text style={styles.bold}>Web channel: </Text>
                                    <Flag
                                        code={film.network.country.code}
                                        size={24}
                                    />
                                    <Text style={{ color: titleC }}>{'  ' + film.network.name + '  '}</Text>
                                </View>
                                : false
                        }

                        {film.url ?
                            <PrintLink
                                title={'Page at Tvmaze.com'}
                                link={film.url}
                                value={''} >
                            </PrintLink> : false}
                    </View>
                    {film._embedded.cast[0] ?
                        <View style={
                            {
                                width: contentW,
                                marginHorizontal: 'auto',
                                marginBottom:40,
                            }
                        }>
                            <Text style={styles.title}>Cast</Text>
                            {
                               film._embedded.cast.map((item) =>
                                    <View 
                                    style={styles.castItem}
                                    key={ item.person.id.toString()}
                                    >
                                        <View style={styles.avatar}>
                                            {item.person.image ?
                                                <View>
                                                    <Image
                                                        source={{ uri: item.person.image.medium }}
                                                        style={styles.photo}
                                                    />
                                                </View >
                                                : <View style={styles.photo}>
                                                    <SVGnoPhoto style={styles.photo}></SVGnoPhoto>
                                                </View>
                                            }
                                        </View>
                                        <View style={styles.nameSelf}>
                                            <Text style={styles.nameTitle}>{item.person.name}</Text>
                                            <Text style={styles.selfTitle} >{item.character.name}</Text>
                                        </View>
                                        <View style={styles.personLink}>
                                            <TouchableOpacity
                                                onPress={() => showAlert(item.person.url)}>
                                                <Feather name="external-link" size={24} color={titleC} />
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    )
                            }
                            
                        </View> : false}
                </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: bgC,
    },
    poster: {
        width: Math.round(posterW),
        height: Math.round(posterH),
        margin: 'auto',
        alignSelf: 'center',
        borderRadius: 15,

    },
    scroll: {
        paddingHorizontal: 10,
        paddingVertical: 37,
    },
    contentWrapper: {
        paddingBottom: 12,
        width: contentW,
        marginHorizontal: 'auto',
    },
    title: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 21,
        fontWeight: "bold",
        color: titleC,
    },
    description: {
        marginTop: 10,
        marginBottom: 10,
        color: textC,
        textAlign: 'justify',
    },
    bold: {
        fontWeight: 'bold',
        color: textC,
    },
    line: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    photo: {
        width: 70,
        height: 100,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    castItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 6,
    },
    avatar: {
        width: '30%',
    },
    nameSelf: {
        width: '58%',
    },
    personLink: {
        width: '10%'
    },
    nameTitle: {
        fontSize: 16,
        color: titleC,
        fontWeight: 'bold',

    },
    selfTitle: {
        color: textC,
    },
    moImWrapper: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 'auto',


    }
});


/**
 *  <FlatList
                                style={{ marginBottom: 40 }}
                                data={film._embedded.cast}
                                keyExtractor={(item) => item.person.id.toString()}
                                renderItem={({ item }) =>
                                    <View style={styles.castItem}>
                                        <View style={styles.avatar}>
                                            {item.person.image ?
                                                <View>
                                                    <Image
                                                        source={{ uri: item.person.image.medium }}
                                                        style={styles.photo}
                                                    />
                                                </View >
                                                : <View style={styles.photo}>
                                                    <SVGnoPhoto style={styles.photo}></SVGnoPhoto>
                                                </View>
                                            }
                                        </View>
                                        <View style={styles.nameSelf}>
                                            <Text style={styles.nameTitle}>{item.person.name}</Text>
                                            <Text style={styles.selfTitle} >{item.character.name}</Text>
                                        </View>
                                        <View style={styles.personLink}>
                                            <TouchableOpacity
                                                onPress={() => showAlert(item.person.url)}>
                                                <Feather name="external-link" size={24} color={titleC} />
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                }
                            >
                            </FlatList>
 */