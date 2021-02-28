import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import {Button,Form,Table,Modal} from 'react-bootstrap';
import {FaEdit} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  let [name,setName] = useState("");
  let [age,setAge] = useState(0);
  let [id,setId] = useState("");
  let [lst_friend,setListFriend] = useState([]);
  let [show,setShow] = useState(false);
  let addFriend=()=>{
    Axios.post('http://localhost:5000/insert',{name:name,age:age}).then(response=>{
      console.log('Response added',response);
      setListFriend([...lst_friend,{name:response.data.name,age:response.data.age,_id:response.data._id}]);
      setName('');
      setAge(0);
    }).catch(err=> console.log('ERR'+err));
  }

  let handleEditFriend=(id)=>{
    console.log('Id to Edit '+id);
    setShow(true);
  }

  let handleClose =()=>setShow(false);

  let handleDelete =(eleid)=>{
    console.log('Id to delete ',eleid);
    Axios.delete(`http://localhost:5000/delete/${eleid}`).then(res=>{
      console.log('deleted id ',res.data);
      let index = lst_friend.findIndex((ele)=>ele._id===res.data);
      console.log('del index'+index);
      lst_friend.splice(index,1);
      setListFriend(lst_friend);
      console.log(lst_friend);
    })
  }

  let handleEdit = ()=>{
    console.log('Id -->'+id);
    Axios.put('http://localhost:5000/update',{id:id,name:name,age:age}).then(res=>{
      console.log('updated',res);
      let friend = lst_friend.find((ele)=>ele._id===res.data._id);
      friend.name = res.data.name;
      friend.age = res.data.age;
      setTimeout(() => {
        setShow(false);
      }, 1000);
    }).catch(err=>{
      console.log('ERR edit ',err);
    })
  };

  useEffect(()=>{
    Axios.get('http://localhost:5000/read').then(res=>{
      console.log('response ',res.data);
      setListFriend(res.data);
    })
  },[]);

  return (
    <div className="App">
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(event)=>setName(event.target.value)}  />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Age</Form.Label>
        <Form.Control type="number" placeholder="Age" value={age} onChange={(event)=>setAge(event.target.value)}/>
      </Form.Group>
      <Button variant="primary" onClick={addFriend}>
        Add
      </Button>
  </Form>

<div className="scrolly mt-3">
  <Table striped bordered hover>
    <thead >
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
    {lst_friend.map((ele)=>{
      return <tr key={ele._id}>
              <td>{ele.name}</td>
              <td>{ele.age}</td>
              <td><FaEdit size="1.5em" onClick={()=>{
                handleEditFriend(ele._id)
                setName(ele.name);
                setAge(ele.age);
                setId(ele._id);
                }}/></td>
              <td><MdDelete size="1.5em" color="rgb(241, 72, 50)" onClick={()=>handleDelete(ele._id)}/></td>
             </tr>
    })}
    </tbody>
   </Table>
  </div>
  <div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(event)=>setName(event.target.value)}  />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" placeholder="Age" value={age} onChange={(event)=>setAge(event.target.value)}/>
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
    </Modal>
  </div>
</div>
  );
}
export default App;
