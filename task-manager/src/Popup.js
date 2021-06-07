import styled from 'styled-components';
import { Dialog, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import {useState} from 'react'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { db, firebase } from './firebase'
import { makeStyles } from '@material-ui/core/styles';

function Popup(props){
  const {popup,setpopup}=props

  const[input,setinput]=useState('')
  const[assignee,setassignee]=useState('')
  const[image,setimage]=useState()
  let store={}

  function addentry(){
    db.collection('tasks').doc().set({
      type: 'Backlog',
      info: input,
      subject: assignee,
      createdAt: new Date()
    })
    setinput('')
    setassignee('')
    setimage('')

    if(image){
      db.collection('images').doc().set({
        task: store[-1].key,
        img: store[-1].value
      })
    }


  }

  async function fileUpload(e){
    const file= e.target.files[0];
    const storageRef =firebase.storage().ref()
    const fileRef= storageRef.child(file.name)
    await fileRef.put(file).then(file=>console.log(file,'stored'))
    db.collection('images').doc().set({
      task: input,
      img: await fileRef.getDownloadURL()
    })
  }

  return(
      <Dialog autoFocus open={popup} onBackdropClick={()=>setpopup(false)}>
        <InputContainer>
          <h2>Enter task details</h2>
          <input
            value={input}
            type="text"
            placeholder='Enter task info'
            onChange={e => setinput(e.target.value)}
          />
          <input
            value={assignee}
            type="text"
            placeholder='Assigned to..'
            onChange={e => setassignee(e.target.value)}
          />
        <div><input value={image} type='file' onChange={fileUpload} /></div>
          <Button disabled={!input} onClick={addentry} variant='contained' color='primary' type='submit'>Save</Button>
        </InputContainer>
      </Dialog>
  )
}

export default Popup;


const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: 0.8;
  text-align: center;
  min-width: 400px;
  min-height: 300px;

  & > upload {
    border: none
  }

  & > div {
    background-color:#101e27;
    color: white;
    margin: 10px 40px 10px 40px;
    padding: 10px;
    border-radius: 10px;
  }


  & > input {
    border: 1px solid red;
    border-radius: 0.25rem;
    margin: 10px;
    outline: none;
    padding: 12px 3px 12px 15px;
    font-size: 16px;
    transition: all 0.2s ease;
    z-index: 500;
  }

  & > button {
    display: flex;
    min-width: 40px;
    flex-direction: row;
    margin: 10px 40px 10px 40px;
    :hover{
      cursor: pointer;
    }
  }
`
