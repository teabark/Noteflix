import Express from "express";
import pg from "pg";
import env from "dotenv";
import bodyParser from "body-parser";
import cors from "cors"

env.config();

const db = new pg.Client({
    user : process.env.PG_USER,
    host : process.env.PG_HOST,
    database : process.env.PG_DATABASE,
    password : process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

db.connect();

const app = Express();
const port = 5000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.send("Hello Welcome");
})

app.get("/read", async (req, res)=>{
   const response = await db.query("SELECT * FROM notes");
   res.send(response.rows);
})

app.post("/create", async (req, res)=>{
   const title = req.body.title;
   const note = req.body.note;
   const result = await db.query("INSERT INTO notes(title, note) VALUES($1, $2) RETURNING *", [title, note]);
   res.send(result.rows);
})

app.post("/update", async (req, res)=>{
    const id = req.body.id;
    const title = req.body.title;
    const note = req.body.note;

    const oldVersion = await db.query("SELECT * FROM notes WHERE id=$1", [id]);
    console.log(oldVersion.rows);
    const newVersion = await db.query("UPDATE notes SET title=$1, note=$2 WHERE id=$3 RETURNING *", [title, note, id]);
    console.log(newVersion.rows)
    res.send("Successfuly updated");
});

app.post("/delete/:id", async (req, res)=>{
    const id = req.params.id;

    await db.query("DELETE FROM notes WHERE id=$1", [id])

    const itemLeft = await db.query("SELECT * FROM notes");
    console.log(itemLeft.rows);
    res.send("Successfully deleted");
})

app.listen(port, ()=> {
    console.log(`Server running from port ${port}`);
})