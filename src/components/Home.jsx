import { useState } from "react";

export default function HomePage() {

    const [contacts, setContacts] = useState([]);
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        setContacts(contacts.concat(input));
    }

    return (
        <div className="p-10 flex flex-col">
            <form method="post" onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="name">Name: </label>
                    <input type="text" value={input} onChange={(e) => {setInput(e.target.value)}}/>
                </p>
                <button type="submit" className="btn btn-primary" >Add</button>
            </form>
            <div>
                {
                    contacts.map((contact, index) => {
                        return (
                            <p key={index}>{contact}</p>
                        );
                    })
                }
            </div>
        </div>
    );
}