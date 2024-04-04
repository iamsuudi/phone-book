import { useState } from "react";

export default function HomePage() {

    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        if (contacts.find(contact => contact.name === name)) {
            alert(`${name} is already added to phonebook`);
        }
        else {
            setContacts(contacts.concat({name, number}));
            setName('');
            setNumber('');
        }
    }

    return (
        <div className="p-10 flex flex-col">
            <form method="post" onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="name">Name: </label>
                    <input id="name" type="text" value={name} onChange={(e) => {setName(e.target.value)}}/>
                </p>
                <p>
                    <label htmlFor="number">Number: </label>
                    <input id="number" type="number" value={number} onChange={(e) => {setNumber(e.target.value)}}/>
                </p>
                <button type="submit" className="btn btn-primary" >Add</button>
            </form>
            <div>
                {
                    contacts.map((contact, index) => {
                        return (
                            <p key={index}>{contact.name}: {contact.number}</p>
                        );
                    })
                }
            </div>
        </div>
    );
}