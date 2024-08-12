import axios from "axios";
import { useState } from "react";

export default function Add() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    async function createNote() {
        try {
            const response = await axios.post("http://localhost:5000/create", {
                title: title,
                note: content,
            });
            console.log("Note created successfully:", response.data);
            // Optionally, you could clear the input fields after a successful submission
            setTitle("");
            setContent("");
        } catch (err) {
            console.log("Error in executing query", err.stack);
        }
    }

    return (
        <form
            className="add"
            onSubmit={(e) => {
                e.preventDefault();
                createNote();
            }}
        >
            <input
                className="title-field"
                type="text"
                placeholder="Enter title ..."
                value={title}
                onChange={(e) => setTitle(e.target.value.title)}
            />
            <input
                className="note-field"
                type="text"
                placeholder="Enter your note ..."
                value={content}
                onChange={(e) => setContent(e.target.value.content)}
            />
            <button className="btn btn-primary" type="submit">
                Add
            </button>
        </form>
    );
}
