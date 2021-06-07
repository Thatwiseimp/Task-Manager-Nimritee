

import styled from 'styled-components'
import Status from './Status'
import { useState, useEffect } from 'react'
import Popup from './Popup.js'
import { db, auth, provider } from './firebase'
import Login from './Login'


function App() {

  const[user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const[tasks,settasks]=useState([])
  const[popup,setpopup]= useState(false)

  function loadTask(){
    db.collection('tasks').onSnapshot((snapshot) => {
      const tempItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }))
      settasks(tempItems);
    })
  }

  const signOut = () => {
    auth.signOut().then(()=>{
      localStorage.removeItem('user')
      setUser(null)
    })
  }


  useEffect(()=>{
    loadTask()
    console.log('Loading tasks!!')
  },[])
  return (
    <div>
      { !user ? (<Login setUser={setUser} />) :
            (<Container>
                <h1>Task Manager</h1>
                <Signoutbutton onClick={signOut}>Sign Out</Signoutbutton>
                <Main>
                  <Status
                    status='Backlog'
                    tasks={tasks}
                  />
                  <Status
                    status='In-Progress'
                    tasks={tasks}
                  />
                  <Status
                    status='Done'
                    tasks={tasks}
                  />
                </Main>
                <Button onClick={()=>setpopup(true)}>Add Task</Button>
                <Popup popup={popup} setpopup={setpopup} />
              </Container>
            )
        }
    </div>

    );
}

export default App;

const Container = styled.div`
  background-color: #282c34;
  color:white;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  text-align: center;
  overflow: none

`

const Main=styled.div`
  display: flex;
  flex-direction: row;
  align-text: center;
  margin: 0 10vw 0 10vw ;
`

const Button = styled.div`
  background: #f9a4a6;
  border-radius: 5px;
  color: black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  height: 45px;
  margin: 80px auto 0;
  width: 200px;
`;

const Signoutbutton = styled.div`
  background: #ff872c;
  border-radius: 30px;
  color: black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  height: 30px;
  width: 100px;
  margin-left: 90vw;
  margin-top: 20px;
  position: absolute;

`;
