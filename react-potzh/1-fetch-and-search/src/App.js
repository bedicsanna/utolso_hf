import { useEffect, useState } from 'react'

const fetchUsers = async () => {
  const response = await fetch(
    "https://randomuser.me/api?results=200&inc=name"
  );
  const jsonData = await response.json();
  return jsonData.results;
};

export function App() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("");

  const handleInput = (e)=> {
    setSearch(e.target.value)
  }

  useEffect(() => {
    fetchUsers()
      .then(results => {

        setUsers(results);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);

  console.log(fetchUsers())
  if (users === undefined) return <div>Loading...</div>
  return (
    <div>
      <h1>Fetch and search</h1>
      <input onInput = {handleInput} placeholder="Search users" value={search} autoFocus={true}/>


      <ul>
      {users.map(e =>
        (`${e.name.title} ${e.name.first} ${e.name.last}`.includes(search) ? <li key={`${e.name.title} ${e.name.first} ${e.name.last}`}>{`${e.name.title} ${e.name.first} ${e.name.last}`}</li> : "")
      )}

      </ul>
    </div>
  );
}
