
import styled from 'styled-components';
import Task from './Task'


function Status(props){
  const{ status, tasks }=props
  console.log(tasks)
  const taskList = tasks.filter(task=>task.data.type===status)
  const setList = taskList.map((doc,id) => ({
    id: doc.id,
    content: doc.data
  }))
  console.log(setList)

  return(
    <StatusContainer>
        <Header>{status.toUpperCase()}</Header>
        {setList.map((data)=>{
          return<Task
            status={status}
            id={data.id}
            info={data.content.info}
            subject={data.content.subject}
            time={data.content.createdAt}
          />
        })}
    </StatusContainer>
  )
}

export default Status;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  color: white;
  min-height: 100px;
  height: 100%;
  width: 100%;
  margin: 2px;
  border: 2px solid #2cf484;
  border-radius: 10px;
`

const Header = styled.div`
  background-color:  #2cf484;
  font-size: 18px;
  font-weight: 700;
  width: 92%;
  padding: 15px;
  border-radius: 8px 8px 0px 0px;
  color: black;
  max-height: 6vh;

`
