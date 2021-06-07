import react from 'react'
import styled from 'styled-components'
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import {useState} from 'react'
import Infobox from './Infobox'
import {db} from './firebase'

function Task({status,info,subject,time,id}){
  const[hover,sethover]=useState(false)
  const[infobox,setinfobox]=useState(false)
  const[imgUrl,setimgUrl]=useState([])

  async function prep(info){
    db.collection('images').onSnapshot((snapshot)=>{
      const tempItems = snapshot.docs.map((doc) =>({
        id: doc.id,
        data: doc.data()
      }))
      setimgUrl(tempItems)
    })

    setinfobox(true)
  }

  return (
    <TaskContainer onMouseEnter={()=>sethover(true)} onMouseLeave={()=>sethover(false)}>
      <h3>{info}</h3>
      {hover ? <div><BorderColorOutlinedIcon onClick={prep} /></div> : null }
      <Infobox id={id} imgUrl={imgUrl} status={status} info={info} subject={subject} time={time.toDate().toString()} infobox={infobox} setinfobox={setinfobox}></Infobox>
    </TaskContainer>
  )
}

export default Task;

const TaskContainer=styled.div`
  backgroung-color:#282c34;
  border-bottom: 1px solid grey;
  border-radius: 5px;
  max-height: 7vh;
  width: 90%;
  display: flex;
  justify-content: space-evenly;
  cursor: default;
  white-space: nowrap;

  & > div {
    color: #f9a4a6;
    align-items: center;
    display: flex;
    cursor: pointer;
    margin-top: 10px;
  }
`
