import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Collapse} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import {ExpandLess} from '@material-ui/icons';
import {ExpandMore} from '@material-ui/icons';

const datos = [
    {
        name : 'Knight',
        url_avatar : 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/6f/6f554c0feb258b76cae01cc5f43c306d502391c0_full.jpg',
    },
    {
        name : 'Gela',
        url_avatar : 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/37/379b707116bcda603c1d576e74aac000788bcd63_full.jpg',
    },
    {
        name : 'Mati',
        url_avatar :'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/2f/2fafb3933ca34f3819a7b794ec2e2bb9ce61ea23_full.jpg' 
    },
    {
        name : 'Migue',
        url_avatar : 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c9/c91d3e9cddde247d99de430936e0a1879f94aced_full.jpg'
    },
    {
        name : 'Sparki',
        url_avatar : 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b4/b4b1b7cc979501ca1b099dcbde6929ea81cabae1_full.jpg'
    },
    {
        name : 'Wolf',
        url_avatar : 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/cc/ccc5e46b258fba2fe5f581c83f76ccf028d22380_full.jpg'
    }
]


const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor : 'inherit',
        color : 'inherit',
        maxWidth : 360,
    },
    nested :{
        paddingLeft: theme.spacing(4),
    },
    img : {
        width: 32,
        height: 32,
        borderRadius : 50,
        marginRight: 5,
    }
}))


export default function Header(){
    const [open, setValue] = React.useState(false);

    const handleClick = () => {
        setValue(!open)
    }
    const classes = useStyles();
    return(
        <div>
            <Button onClick={handleClick} className={classes.root}>
                <ListItemText>
                    <Typography>Friends</Typography>
                </ListItemText>
            {open ? <ExpandLess /> : <ExpandMore />}
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component='div' className={classes.nested}>
                        {datos.length !== 0? datos.map((_) => (
                            <ListItem button className={classes.nested}>
                                <img className={classes.img} src={_.url_avatar}/>
                                <ListItemText>
                                    <Typography>{_.name}</Typography>
                                </ListItemText>
                            </ListItem>
                        )): <h1>Vacio papu</h1>}
                    </List>
                </Collapse>
            </Button>
        </div>
    )
}

