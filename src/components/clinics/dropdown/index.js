
import React from 'react';
import styled from "styled-components";
import { Button } from '@material-ui/core';


import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Tooltip from '@material-ui/core/Tooltip';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
  iconbuttom: {
    color:"rgb(51, 115, 198)",
    marginLeft:"4px",

  }

}));

export default function DropdownAppointment(props) {
  const classes = useStyles();

  function copy(payload){
    navigator.clipboard.writeText(payload) 
  }

  return (
    <div style={{ background: "white" }}>
      <div style={{
        margin: "0",
        display: 'flex',
        justifyContent: "space-between"
      }}>
        <div>
          <StyledTypographyTitle>
            {"Room ID" + ":"}
          </StyledTypographyTitle>
          <StyledTypographyContent>
            {props.appointment.sessionId}
          </StyledTypographyContent>

        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: "space-between"
      }}>

        <div>
          <StyledTypographyTitle>
            {"Patient Name" + ":"}
          </StyledTypographyTitle>
          <StyledTypographyContent>
            {props.appointment.patientName}
          </StyledTypographyContent>
        </div>

        {/* <div>
                <StyledTypographyTitle>
                  {"patient url"+":"}
                </StyledTypographyTitle>
                <StyledTypographyContent>
                  {window.location.origin+"/room/"+props.appointment.sessionId}
                </StyledTypographyContent>
               
              </div> */}

      </div>

      <div style={{
        display: 'flex',
        justifyContent: "space-between"
      }}>



        <div>
          <StyledTypographyTitle>
            {"Patient URL" + ":"}
          </StyledTypographyTitle>
          <StyledTypographyContent>
            {window.location.origin + "/room/" + props.appointment.sessionId}
          </StyledTypographyContent>
          <IconButton aria-label="delete" size="small" className={classes.iconbuttom} style={{outline:"0"}} onClick={()=>copy(window.location.origin + "/room/" + props.appointment.sessionId)}>
            <FileCopyIcon fontSize="inherit" />
          </IconButton>

        </div>

      </div>

      <div style={{
        display: 'flex',
        justifyContent: "space-between"
      }}>

        <div>
          <StyledTypographyTitle>
            {"Clinician Name" + ":"}
          </StyledTypographyTitle>
          <StyledTypographyContent>
            {props.appointment.clinicianName}
          </StyledTypographyContent>
        </div>
        {/* <div>
                <StyledTypographyTitle>
                  {"clinician url"+":"}
                </StyledTypographyTitle>
                <StyledTypographyContent>
                  {window.location.origin+"/room/"+props.appointment.sessionId+"role:" + "CLINICIAN"}
                </StyledTypographyContent>
              
              </div> */}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: "space-between"
      }}>


        <div>
          <StyledTypographyTitle>
            {"Clinician URL" + ":"}
          </StyledTypographyTitle>
          <StyledTypographyContent>
            {window.location.origin + "/room/" + props.appointment.sessionId + "role:" + "CLINICIAN"}
          </StyledTypographyContent>


          <IconButton aria-label="delete" size="small" className={classes.iconbuttom} style={{outline:"0"}} onClick={()=>copy(window.location.origin + "/room/" + props.appointment.sessionId + "role:" + "CLINICIAN")}>
            <FileCopyIcon fontSize="inherit" />
          </IconButton>

        </div>
      </div>



    </div>

  );
}

const StyledTypographyTitle = styled(Typography)`
  display:inline-block;
  font-weight:bold;
  font-size: 15px;
  color:rgba(0, 0, 0, 0.6);

`

const StyledTypographyContent = styled(StyledTypographyTitle)`
  font-weight:normal;
  font-size: 14px;
  padding-left:10px;
  color:black;

`