import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Avatar } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import { validateEmail } from '../../helpers/helpers'

const Login = () => {
  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordlValue] = useState<string>('')
  const [isEmailCorrect, setIsEmailCorrect] = useState<boolean>(true)
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(true)
  const navigate = useNavigate()
  const LOGIN_TITLE = 'Log In'
  const EMAIL_INCORRECT = 'Emai incorrect'
  const PASSWORD_INCORRECT = 'Password incorrect'

  const generalClass = {
    display: 'flex',
    justifyContent: 'center',
    margin: 20,
  }

  const handleLoginSubmit = () => {
    let isValid = true
    if (emailValue.length > 0 && validateEmail(emailValue)) {
      setIsEmailCorrect(true)
    } else {
      setIsEmailCorrect(false)
      isValid = false
    }
    if (passwordValue.length > 0) {
      setIsPasswordCorrect(true)
    } else {
      setIsPasswordCorrect(false)
      isValid = false
    }
    isValid && navigate('/books')
  }
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value)
  }
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordlValue(event.target.value)
  }

  return (
    <div
      style={{
        paddingTop: '10rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar style={{ backgroundColor: 'red', color: 'white' }}>
          <LockOutlined />
        </Avatar>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: 20,
          fontSize: 23,
          fontWeight: 600,
        }}
      >
        {LOGIN_TITLE}
      </div>
      <div style={generalClass}>
        <TextField
          error={!isEmailCorrect}
          value={emailValue}
          required
          label="Email"
          onChange={handleEmailChange}
          helperText={isEmailCorrect && EMAIL_INCORRECT}
        />
      </div>
      <div style={generalClass}>
        <TextField
          error={!isPasswordCorrect}
          value={passwordValue}
          required
          label="Password"
          type="password"
          onChange={handlePasswordChange}
          helperText={isPasswordCorrect && PASSWORD_INCORRECT}
        />
      </div>
      <div style={generalClass}>
        <Button
          disabled={emailValue.length === 0 || passwordValue.length === 0}
          onClick={handleLoginSubmit}
          variant="contained"
          color="primary"
          style={{ marginTop: '8px', maxWidth: '10rem' }}
        >
          {LOGIN_TITLE}
        </Button>
      </div>
    </div>
  )
}

export default Login
