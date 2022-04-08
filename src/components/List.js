import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function List({team, setTeam}) {
  const [teammatesList, setTeammatesList] = useState([]);

  //To display the list of potential teammates
  useEffect(() => {
    axios.get('https://reqres.in/api/users?page=2')
      .then(response => {
        setTeammatesList(response.data.data)
      })
      .catch(error => console.log('err', error))
  }, []);

  return (
    <section className="section-users-list">
      <div className="list">
        <h2>Teammates Selection</h2>
        <div className="list-container">
          <h3>Select your teammates before the zombie invasion ! ( 3 max )</h3>
          <ul>
            {teammatesList.map(el => {
              //Check if the user is a teammate to display a special style
              const checked = !!team.find(item => item.id === el.id);
              return(
                <li key={(el.id)} className={checked ? 'checked' : ''}>
                  <Link to={`/${el.id}`}>
                    <div className="avatar-link">
                      <img src={el.avatar} alt="avatar"/>
                    </div>
                  </Link>
                  <p>
                    {el.first_name}
                  </p>
                  <label className="switch">
                    <input
                      className="switch__input"
                      type="checkbox"
                      name="select"
                      checked={checked}
                      disabled={team.length >= 3 && !checked}
                      onClick={event => {
                        if (event.target.checked === true ) {
                          setTeam([...team, el])
                        } else {
                          let teamCopy = [...team];
                          teamCopy = teamCopy.filter(item => item.id !== el.id)
                          setTeam(teamCopy)
                        }
                      }}
                    />
                    <i class="switch__icon"></i>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default List;