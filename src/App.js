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
  const [friendList, setFL] = useState(initialFriends);
  function handleFriendList(newFriend) {
    setFL((fl) => [...fl, newFriend]);
  }
  const [showAddFriend, setSAF] = useState(false);
  function handleShow() {
    setSAF((show) => !show);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        {showAddFriend && <FormAddFriend handleFriendList={handleFriendList} />}
        <Button onClick={handleShow}>
          {!showAddFriend ? "Add Friend" : "close"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
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

      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend({ handleFriendList }) {
  const [newFriendName, setNFN] = useState("");
  let random_url = `https://i.pravatar.cc/48?u=${String(Math.round(Math.random() * Math.pow(10, Math.random() * 6)))}`;

  function addFriendFn() {
    handleFriendList({
      id: Date.now(),
      name: newFriendName,
      image: random_url,
      balance: 0,
    });
  }
  return (
    <form className="form-add-friend" onSubmit={(e) => e.preventDefault()}>
      <label>Friend Name</label>
      <input
        type="text"
        value={newFriendName}
        onChange={(e) => {
          setNFN(e.target.value);
        }}
      />

      <Button onClick={() => addFriendFn()}>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <labl>Bill value</labl>
      <input type="number" />

      <label>Your Expense</label>
      <input type="number" />

      <label>Xs Expense</label>
      <input type="number" disabled />

      <label>Who is paying the bill</label>
      <select>
        <option>You</option>
        <option>X</option>
      </select>
      <Button>Split</Button>
    </form>
  );
}
