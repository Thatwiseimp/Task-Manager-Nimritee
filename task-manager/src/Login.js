import React from 'react'
import styled from 'styled-components'
import { auth, provider } from './firebase'

function Login({ setUser }) {

    const signIn = () => {
        auth.signInWithPopup(provider).then((result)=>{
            let user = result.user;
            let newUser = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }
            localStorage.setItem('user', JSON.stringify(newUser))
            setUser(newUser);
        }).catch((error)=>{
            alert(error.message);
        })
    }

    return (
        <Container>
          <Content>
            <h1>Task Manager</h1>
            <h2>Sign in</h2>
            <LoginButton onClick={signIn}>
              Sign in with Google
            </LoginButton>
          </Content>
        </Container>
    )
}

export default Login

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #282c34;
    display: grid;
    place-items: center;
`

const Content = styled.div`
    padding: 100px;
    background-color: #eef1ef;
    border-radius: 15px;
    border: 1px solid #2cf484;
    text-align: center;
`

const LoginButton = styled.button`
    margin-top: 50px;
    background-color: #f0c14b;
    height: 40px;
    border: 2px solid #a88734;
    border-radius: 10px;
    padding: 4px 8px;
    cursor: pointer;
`
