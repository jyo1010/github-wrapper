import React,{useState} from 'react';
import './App.css';

function App() {

  const [username,setUsername]=useState('');
  const [resData,setResData]=useState('');


  const handleUsernameInput=(event)=>{
      setUsername(event.target.value);
  }

  const handleSubmit=(event) => {
    event.preventDefault();
    console.log(username);
    fetch('https://api.github.com/users/'+ username)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setResData(data);
    });

    setUsername('');

  }




  return (
    <>
      <div className='container'>

        <h1 className='heading'>Git hub profile finder 🔎</h1>
        <form onSubmit={handleSubmit} className='formCard' >
          <input type="text" placeholder='github ID name' onChange={handleUsernameInput} value={username}/>
          <button>Submit</button>
        </form>
       

        {resData.message}
        {resData && (resData.message!='Not found')&&(
            <div className='userDetailCard'>

             
              <div className='userDetailBody'>
                   <p className='name'>{resData.name}</p>
                   <em className='username'> User Id: {resData.login}</em>

                  <div className='follow'>
                    <p>Followers 👥: {resData.followers}</p>
                    <p>Following 👥: {resData.following}</p>
                    
                  </div>

                  <div className='profDetail'>
                    <p>💼 {resData.company}</p>
                    <p>📋{resData.bio}</p>
                    <p>📑 Public repositoties:{resData.public_repos}</p>

                    
                  </div>
              </div> 

              <div className='userImage'>     
                 <img  src={resData.avatar_url}></img>
              </div>  
             

              
            </div>



          )
        }
     
      </div>
 
    </>
  );
    
}

export default App;
