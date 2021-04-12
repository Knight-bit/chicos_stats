import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root:{
        backgroundColor : 'black',
        color : 'white',
    }
    
})


export default function Header(){
    const [value, setValue] = React.useState(0);


    const checkDefault = (e) => {
        console.log(e);
    }

    const classes = useStyles();
    return(
        <div>
            <AppBar position='static' className={classes.root}>
                <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
                    <Tab label="Gela"/>
                </Tabs>
            </AppBar>
        </div>
    )
}

const Panel = (props) => {
    const {children, value, ...other} = props;
    return(
        <>
        <h1>{children} {value}</h1>
        </>
    )
}