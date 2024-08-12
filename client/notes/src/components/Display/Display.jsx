import { useEffect, useState } from "react";
import axios from "axios";

export default function Display(){

    const [items, setItems] = useState([]);

    async function fetchContent() {
        let result;
        try {
            const response = await axios.get("http://localhost:5000/read");
            result = response.data;
            setItems(result);
        } catch (error) {
            console.error("Error fetching content:", error); 
        }
    }

    async function handleDelete(id){
        let result;
        try {
            await axios.post(`http://localhost:5000/delete/${id}`);
            const response = await axios.get("http://localhost:5000/read");
            result = response.data;
            setItems(result);
        } catch (error) {
            console.error("Error fetching content:", error); 
        }
    }


    useEffect(() => {
        fetchContent();
    }, []);

    return <div id="portfolio">
                {items.map((item, index) => (
                <div key={index} className="display">
                    <div className="title">
                        <h4>{item.title}</h4>
                    </div>
                    <div className="content">
                        <p>{item.note}</p>
                        <button className="btn btn-warning mx-2 ">Edit</button>
                        <button onClick={()=>handleDelete(item.id)}className="btn btn-danger">Delete</button>
                    </div>
                </div>
            ))}
    </div>
}