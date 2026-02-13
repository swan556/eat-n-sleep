import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [selectedFriendId, setSFI] = useState(null);
  const [friendList, setFL] = useState(initialFriends);
  const selectedFriend = friendList.filter(
    (friend) => friend.id === selectedFriendId,
  );
  function handleFriendList({ newFriend }) {
    setFL((fl) => [...fl, newFriend]);
  }
  const [showAddFriend, setSAF] = useState(false);
  function handleShow() {
    setSAF((show) => !show);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friendList={friendList}
          cur_id={selectedFriendId}
          setSFI={setSFI}
        />
        {showAddFriend && <FormAddFriend handleFriendList={handleFriendList} />}
        <Button onClick={handleShow}>
          {!showAddFriend ? "Add Friend" : "close"}
        </Button>
      </div>
      <FormSplitBill selectedFriend={selectedFriend} />
    </div>
  );
}

function FriendList({ friendList, cur_id, setSFI }) {
  const friends = friendList;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          cur_id={cur_id}
          setSFI={setSFI}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, cur_id, setSFI }) {
  function setSelected() {
    setSFI((i) => friend.id);
  }
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => setSelected()}>
        Select{friend.id === cur_id ? "ed" : ""}
      </Button>
    </li>
  );
}

function FormAddFriend({ handleFriendList }) {
  const [newFriendName, setNFN] = useState("");
  let random_url = `https://i.pravatar.cc/48?u=${String(Math.round(Math.random() * Math.pow(10, Math.random() * 6)))}`;

  function addFriendFn() {
    const newFriend = {
      id: Date.now(),
      name: newFriendName,
      image: random_url,
      balance: 0,
    };
    handleFriendList({ newFriend });
  }
  return (
    <form
      className="form-add-friend"
      onSubmit={(e) => {
        e.preventDefault();
        addFriendFn();
        setNFN("");
      }}
    >
      <label>Friend Name</label>
      <input
        type="text"
        value={newFriendName}
        onChange={(e) => {
          setNFN(e.target.value);
        }}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ friend }) {
  if(friend.length)
  const [myBill, setMB] = useState(0);
  const [totalBill, setTB] = useState(0);
  const frBill = totalBill - myBill;

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {friend ? friend.name : "a friend"}</h2>
      <labl>Bill value</labl>
      <input
        type="number"
        value={totalBill}
        onChange={() => {
          setTB(totalBill);
        }}
      />

      <label>Your Expense</label>
      <input
        type="number"
        value={myBill}
        onChange={() => {
          setMB(myBill);
        }}
      />

      <label>{friend ? friend.name : "your friend"}'s Expense</label>
      <input type="number" value={frBill} disabled />

      <label>Who is paying the bill</label>
      <select>
        <option>You</option>
        <option>{friend ? friend.name : "your friend"}</option>
      </select>
      <Button>Split</Button>
    </form>
  );
}
