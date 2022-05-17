import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState('')

  //-- insert item
  const addItem = async e => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5500/api/item", {
        item: itemText,
      });
      setListItems(prev => [...prev, res.data]); // 加進一個新的
      console.log(res);
      setItemText("");
    } catch (err) {
      console.log(err);
    }
  };

  //-- get items
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/items");
        setListItems(res.data);
        console.log(res.data);
        // > [{…}, {…}, {…}, {…}]
        // > {_id: '62812f8bc045e1f484b7ba17', item: 'this is the 1 todo item', __v: 0}
        // > {_id: '62827c8489f89bcae43e2c82', item: 'hi marco', __v: 0}
      } catch (err) {
        console.log(err);
      }
    };

    getItems();
  }, []);

  //-- delete item
  const deleteItem = async id => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`);
      const newListItems = listItems.filter(item => item._id !== id); // 剔除已刪除的項目
      setListItems(newListItems); // 更新 todo items
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.put(`http://localhost:5500/api/item/${isUpdating}`, {item: updateItemText})
      console.log(res.data)
      const updateItemIndex = listItems.findIndex(item => item._id === isUpdating)
      const updateItem = listItems[updateItemIndex].item = updateItemText
      setUpdateItemText('')
      setIsUpdating('')
    } catch (err) {
      console.log(err)
    }
  }

  //-- before updating item we need do show input field
  const renderUpdateForm = () => (
    <form className='update-form' onSubmit={e => updateItem(e )}>
      <input className='update-new-input' type='text' placeholder='New Item' onChange={e => setUpdateItemText(e.target.value)} value={updateItemText}/>
      <button className='update-new-btn' type='submit'>Update</button>
    </form>
  );

  return (
    <div className='App'>
      <h1>Todo List</h1>

      <form className='form' onSubmit={e => addItem(e)}>
        <input
          type='text'
          placeholder='Add Todo Item'
          value={itemText}
          onChange={e => {
            setItemText(e.target.value);
          }}
        />
        <button type='submit'>Add</button>
      </form>

      <div className='todo-listItems'>
        {
          listItems.map(item => (
            <div className='todo-item'>
              {
                isUpdating === item._id 
                ? renderUpdateForm()
                : <>
                    <p className='item-content'>{item.item}</p>
                    <button className='update-item' onClick={() => {setIsUpdating(item._id);}}>Update</button>
                    <button className='delete-item' onClick={() => deleteItem(item._id)}>Delete</button>
                  </>
              }
            </div>
          ))
        }

        {/* 用 map 取代 item-content */}
        {/* <div className='todo-item'>
          <p className='item-content'>this is the item 1</p>
          <button className='update-item'>Update</button>
          <button className='delete-item'>Delete</button>
        </div>

        <div className='todo-item'>
          <p className='item-content'>this is the item 2</p>
          <button className='update-item'>Update</button>
          <button className='delete-item'>Delete</button>
        </div>

        <div className='todo-item'>
          <p className='item-content'>this is the item 3</p>
          <button className='update-item'>Update</button>
          <button className='delete-item'>Delete</button>
        </div> */}
      </div>
    </div>
  );
}

export default App;
