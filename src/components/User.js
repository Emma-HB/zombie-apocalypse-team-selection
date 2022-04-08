import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function User({team, setTeam}) {
  const [user, setUser] = useState({});

  //To display the info of the selected user
  const { id } = useParams();
  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`)
      .then(response => {
        setUser(response.data.data)
      })
      .catch(error => console.log('err', error))        
  }, []);
  
  //Check if the user is a teammate to display a special style
  const checked = !!team.find(item => item.id === user.id);

  return (
   <section className="section-user">
      <h2>User Infos</h2>
      <div className={`user-container ${checked ? 'checked' : ''}`}>
        <Link to={'/'} className="home-link">←</Link>
        <div className="avatar">
          <img src={user.avatar} alt="avatar"/>
        </div>
        <p className="user-name">
          {user.first_name} {user.last_name}
        </p>
        <p className="user-mail">
          {user.email}
        </p>
        <label className="switch">
          <input
            className="switch__input"
            type="checkbox"
            name="select"
            checked={checked}
            disabled={team.length >= 3 && !checked}
            onClick={event => {
              if (event.target.checked === true) {
                setTeam([...team, user])
              } else {
                let teamCopy = [...team];
                teamCopy = teamCopy.filter(item => item.id !== user.id)
                setTeam(teamCopy)
              }
            }}
          />
          <i class="switch__icon"></i>
        </label>
      </div>
   </section>
  );
}

export default User;
