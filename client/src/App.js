import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
function App() {
  let [name,setName] = useState("");
  let [age,setAge] = useState(0);
  let [lst_friend,setListFriend] = useState([]);
  let addFriend=()=>{
    Axios.post('http://localhost:5000/insert',{name:name,age:age}).then(response=>{
      console.log('Response ',response);
      setListFriend(response.data);
    }).catch(err=> console.log('ERR'+err));
  }

  useEffect(()=>{
    Axios.get('http://localhost:5000/read').then(res=>{
      console.log('response ',res.data);
      setListFriend(res.data);
    })
  },[]);

  return (
    <div className="App">
     <div className="input">
      <input name="name" type="text" placeholder="Enter name" onChange={(event)=>setName(event.target.value)}></input>
      <input name="age" type="number" placeholder="Enter Age" onChange={(event)=>setAge(event.target.value)}></input>
      <button onClick={addFriend}>Add Friend</button>
    </div>

    {lst_friend.map(ele=>{
      return <div key={ele._id}>{ele.name} {ele.age}</div>
    })}

    </div>
  );
}
export default App;
