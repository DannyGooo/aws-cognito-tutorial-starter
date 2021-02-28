import React, {useState,useEffect} from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import Timeline from '@material-ui/lab/Timeline';


import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Dropdown from './dropdown'

import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import BlockIcon from '@material-ui/icons/Block';
import DuoIcon from '@material-ui/icons/Duo';


const useRowStyles = makeStyles({
    root: {
        "& > *": {
            borderBottom: "unset"
        }
    },
    button: {
        // height: 85, // setting height/width is optional
    },
    label: {
        // Aligns the content of the button vertically.
        flexDirection: 'column',
        fontSize: "10px"

    },
    icon: {
        fontSize: '20px !important',
        // marginBottom: theme.spacing.unit
    }
});



function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    // const API_URL = config.API_URL+'/rest/';
    // const header = { headers: authHeader('clinician') };
    const [patientData,setPatientData]=useState(null);

    

    // when clinician click on enter room button
    function handleEnterRoom(roomID) {
        const win = window.open(`/room/${roomID + "role:" + "CLINICIAN"}`, '_blank');
        if (win != null) {
            win.focus();
        }
    }



    return (
        <React.Fragment>
            <StyledTableRow className={classes.root}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>


                <TableCell component="th" scope="row" align="center">
                    {row.clinicName}
                </TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.fax}</TableCell>
                <TableCell align="center">{row.director}</TableCell>
                <TableCell align="center">{row.address}</TableCell>



                {/* <TableCell align="center">{new Date(row.startTime).toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric' })}</TableCell>
                <TableCell align="center">{new Date(row.startTime).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                <TableCell align="center">{new Date(row.endTime).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                {patientData ? (<TableCell align="center">{patientData.phone}</TableCell>):(<TableCell align="center">{}</TableCell>)}
                {patientData ? (<TableCell align="center">{patientData.email}</TableCell>):(<TableCell align="center">{}</TableCell>)}
                <TableCell align="center">{row.clinicianName}</TableCell>
                <TableCell align="center">
                    <Tooltip title="copy URL" enterDelay={500} leaveDelay={200}>
                        <Button
                            style={{ outline: "0", color: "rgb(51, 115, 198)", padding: "4px 0", fontWeight: "bold", fontSize: "12px" }}
                            onClick={() => { navigator.clipboard.writeText(window.location.origin + "/room/" + row.sessionId) }}
                        >
                            copy
                        </Button>
                    </Tooltip>
                </TableCell> */}

                <TableCell >

                    {row.expired ?
                        (
                            <Button
                                disabled
                                color="primary"
                                size="small"
                                classes={{ root: classes.button, label: classes.label }}
                            >
                                <BlockIcon className={classes.icon} style={{ color: "red" }} />
                                Room closed
                            </Button>
                        )
                        :
                        (
                            <Button
                                aria-label="expand row"
                                color="primary"
                                size="small"
                                style={{ fontWeight: "bold" }}
                                onClick={() => { handleEnterRoom(row.sessionId) }}
                                classes={{ root: classes.button, label: classes.label }}

                            >
                                <DuoIcon className={classes.icon} style={{ color: "#8BED03" }} />
                                Enter 
                            </Button>
                        )
                    }
                </TableCell>
            </StyledTableRow>
            <StyledTableRow style={{ background: "wheatwhite" }}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Dropdown appointment={row}></Dropdown>
                        </Box>
                    </Collapse>
                </TableCell>
            </StyledTableRow>
        </React.Fragment>
    );
}








export default function Clinics(props) {
    const classes = useStyles();



    return ( 
                <Timeline align="left">
                    {props.clinics.length > 0 ?
                        (<TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead >
                                    <TableRow >
                                        <TableCell />
                                        <TableCell className={classes.headerRow} align="center">Clinic&nbsp;Name</TableCell>
                                        <TableCell className={classes.headerRow} align="center">Type</TableCell>

                                        <TableCell className={classes.headerRow} align="center">Email</TableCell>
                                        <TableCell className={classes.headerRow} align="center">Telephone</TableCell>
                                        <TableCell className={classes.headerRow} align="center">Fax</TableCell>
                                        <TableCell className={classes.headerRow} align="center">Director</TableCell>
                                        <TableCell className={classes.headerRow} align="center">Address</TableCell>

                                        {/* <TableCell className={classes.headerRow} align="center">Patient&nbsp;URL</TableCell> */}
                                        <TableCell align="center"> </TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.clinics.map((row) => (
                                        <Row key={row.ID} row={row} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>)
                        :
                        (
                            <Typography variant="h3" style={{ color: "rgba(0, 0, 0, 0.3)", marginTop: "30%" }}>No rooms today</Typography>
                        )}

                </Timeline>
    
        // </div>

    );
}
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(2n+1)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    headerRow: {
        fontWeight: "bold",
    },


}
));