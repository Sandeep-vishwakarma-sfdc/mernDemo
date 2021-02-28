import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
function App() {
  let [name,setName] = useState("");
  let [age,setAge] = useState(0);
  let [lst_friend,setListFriend] = useState([]);
  let addFriend=()=>{
    Axios.post('http://localhost:5000/insert',{name:name,age:age}).then(response=>{
      console.log('Response added',response);
      setListFriend([...lst_friend,{name:response.data.name,age:response.data.age,_id:response.data._id}]);
    }).catch(err=> console.log('ERR'+err));
  }

  let handleEditFriend=(event)=>{
    console.log(event.target.key);
  }

  useEffect(()=>{
    Axios.get('http://localhost:5000/read').then(res=>{
      console.log('response ',res.data);
      setListFriend(res.data);
    })
  },[]);

  return (
    <div className="App">
    <div className="inputContainer">
      <div className="input">
        <input name="name" type="text" placeholder="Enter name" onChange={(event)=>setName(event.target.value)}></input>
        <input name="age" type="number" placeholder="Enter Age" onChange={(event)=>setAge(event.target.value)}></input>
      </div>
      <button onClick={addFriend}>Add Friend</button>
    </div>

      <div className="friendsList">
      {lst_friend.map(ele=>{
        return <div className="friendrow" key={ele._id}>
          <h3>Name {ele.name}</h3>
          <h3>Age {ele.age}</h3>
        </div>
      })}
      </div>
    </div>
  );
}
export default App;
