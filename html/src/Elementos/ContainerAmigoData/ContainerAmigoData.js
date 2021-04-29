import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Card} from '@material-ui/core';
import {CardContent} from '@material-ui/core';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root : {
        maxWidth: 360,
        maxHeight : 360,
    },
    img : {
        minWidth : 360,
        maxHeight : 200,
        borderRadius : 30,
    }
}))
const url_avatar = 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c9/c91d3e9cddde247d99de430936e0a1879f94aced_full.jpg'


//Compoenent del perfil de los amigos
export default function ContainerAmigoData(){

    const classes = useStyles();

    return(
        <>
            <Card className={classes.root}>
                <img src={url_avatar} className={classes.img}/>
                <CardContent >
                    <Typography>asdasd</Typography>
                </CardContent>
            </Card>
        </>
    )
}
/*width="360px" height="200px"*/