import {useState,useEffect} from 'react'
import styled from 'styled-components';
import { Dialog, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import {db} from './firebase'

function Infobox({infobox,setinfobox,status,info,subject,time,id,imgUrl}){

  const imglink = imgUrl.filter(image=>image.data.task===info)
  const img = imglink.map((data,id)=>data.data.img)


  const deleteEntry = (e) =>{
      e.preventDefault()
      db.collection('tasks').doc(id).delete()
      setinfobox(false)
  }


  async function pushEntry(){
    const res = await db.collection('tasks').doc(id).get().then(doc=>(doc.data().type))
    if(res=='Backlog'){
      db.collection('tasks').doc(id).update({type: 'In-Progress'})
      console.log(res)
    }else if (res=='In-Progress') {
      db.collection('tasks').doc(id).update({type: 'Done'})
      console.log(res,'second')
    }else{
      alert('Cannot push further from final stage')
    }
    setinfobox(false)
  }

  async function rollback(){
    const res = await db.collection('tasks').doc(id).get().then(doc=>(doc.data().type))
    if(res=='In-Progress'){
      db.collection('tasks').doc(id).update({type: 'Backlog'})
      console.log(res)
    }else if (res=='Done') {
      db.collection('tasks').doc(id).update({type: 'In-Progress'})
      console.log(res,'second')
    }else{
      alert('Cannot rollback from initial stage')
    }
    setinfobox(false)
  }

  return(
      <Dialog open={infobox} onBackdropClick={()=>setinfobox(false)}>

        <InfoContainer>
          <h3>Info: {info}</h3>
          {subject ? <h3>Assigned to: {subject}</h3> : null }      
          <h3>Status: {status}</h3>
          <h4>When: {time} </h4>
          {img ? <img src={img} />: null}
        </InfoContainer>
        <Actions>
          <Button onClick={pushEntry} variant='contained' color='primary'>Push</Button>
          <Button onClick={deleteEntry} variant="contained">Delete</Button>
          <Button onClick={rollback} variant="contained" color="secondary" >RollBack</Button>
        </Actions>

      </Dialog>
  )
}

export default Infobox;

const InfoContainer=styled.div`
  background-color: #101e27;
  margin: 5px 5px 0px 5px ;
  border-radius: 10px 10px 0px 0px;
  padding: 15px;
  display: flex;
  color: #f5f5f5;
  flex-direction: column;
  justify-content: center
  & > h3{
    fontWeight: bold;
    margin-left: 50px;
  }
  & > h4{
    font-style: italic;
    color: #808080
  }
`

const Actions=styled.div`
  display: flex;
  background-color: #676767;
  margin: 0px 5px 5px 5px;
  border-radius: 0px 0px 10px 10px;
  justify-content: space-evenly;


  & > button {
    display: flex;
    min-width: 40px;
    flex-direction: row;
    margin: 20px 40px 20px 40px;
    :hover{
      cursor: pointer;
    }
`
