import React from 'react';

class SignUp extends React.Component {
  render () {
    return (
<<<<<<< HEAD
      <div className='signUpBox'>
       <form>
        <h2> Sign up</h2>
=======
      <div className='formView'>
       <form>

        <div className="title">  Sign up </div>
>>>>>>> front_end_edits
         <input type='text' name='userName' placeholder='Your username'/>
         <input type='email' name='email' placeholder='Your email'/>
         <input type='password' name='password' placeholder='Your password'/>
         <input type='submit' value = 'Sign Up'/>
       </form>
      </div>
    )
  }
}

export default SignUp
