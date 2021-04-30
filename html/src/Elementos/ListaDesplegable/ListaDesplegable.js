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
import {Grid} from '@material-ui/core'
import axios from 'axios';


import ContainerAmigoData from '../ContainerAmigoData/ContainerAmigoData';
import CharHeroe from '../CharHeroe/CharHeroe';

const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor : 'inherit',
        color : 'inherit',
        minHeight : 500
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

const getStats = async () => {
    const stats = await axios.get('http://127.0.0.1:5000/api/perfil');
    if(stats == undefined) throw new Error('Problemas consiguiendo los perfiles');

    return stats.data
}

export default function Header(){
    const [open, setValue] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [chico, setChico] = React.useState('gela')

    React.useEffect(async () =>{ 
        const data = await getStats();
        setData(data);
    },[])

    const handleClick = () => {
        setValue(!open);
    }

    const handleItem = (e) => { 
        console.log(e.currentTarget.getAttribute('name'));
        try{
            document.getElementById('perfil').removeChild(document.getElementById('perfil').firstChild)
        }catch(e){
            
        }
    }

    const classes = useStyles();
    return(
        <div>
            <Grid container spacing={2} className={classes.root}>



                <Grid item xs={6} sm={4} id='perfil'>
                     <ContainerAmigoData />
                </Grid>




                <Grid item xs={6} sm={4} id='chart'>
                    <CharHeroe name={chico}/>
                </Grid>
                
                <Grid item xs={6} sm={4}>
                <Button onClick={handleClick} >
                    <ListItemText>
                        <Typography>Friends</Typography>
                    </ListItemText>
                {open ? <ExpandLess /> : <ExpandMore />}
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component='div' className={classes.nested}>
                            {data.length !== 0? data.map((_) => (
                                <ListItem button className={classes.nested} key={_._id} name={_.name} onClick={handleItem}>
                                    <img className={classes.img} src={_.avatar}/>
                                    <ListItemText>
                                        <Typography>{_.personaname}</Typography>
                                    </ListItemText>
                                </ListItem>
                            )): <h1>Vacio papu</h1>}
                        </List>
                    </Collapse>
                </Button>
                </Grid>
            </Grid>
        </div>
    )
}

/*
<Button onClick={handleClick} className={classes.root}>
    <ListItemText>
        <Typography>Friends</Typography>
    </ListItemText>
{open ? <ExpandLess /> : <ExpandMore />}
    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component='div' className={classes.nested}>
            {data.length !== 0? data.map((_) => (
                <ListItem button className={classes.nested}>
                    <img className={classes.img} src={_.avatar}/>
                    <ListItemText>
                        <Typography>{_.personaname}</Typography>
                    </ListItemText>
                </ListItem>
            )): <h1>Vacio papu</h1>}
        </List>
    </Collapse>
</Button>
*/
