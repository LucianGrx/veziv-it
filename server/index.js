import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

//Configurare baza de date MySQL

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: "password",
  port: "3306",
});

//Configurare server

app.use(express.json());
app.use(cors());

db.connect((err) => {
  if (err) {
    console.error("Eroare la conectare:", err);
    throw err;
  } else {
    console.log("Conectat la baza de date MYSQL!");
  }
});

//Creare tabele

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    imgUrl VARCHAR(255),
    imgUrl2 VARCHAR(255),
    imgUrl3 VARCHAR(255),
    features TEXT,
    stack TEXT,
    tech VARCHAR(255),
    link VARCHAR(255),
    hidden TINYINT(1) DEFAULT 0
)
`;

const createContactTableQuery = `
    CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT
)
`;

db.query(createTableQuery, (err, result) => {
  if (err) {
    console.error("Eroare la crearea tabelului: ", err);
    throw err;
  }
  console.log("Tabelul a fost creat sau deja exista!");
});

app.get("/", (req, res) => {
  res.json("Hello from the backend!");
});

db.query(createContactTableQuery, (err, result) => {
  if (err) {
    console.error("Eroare la crearea tabelului de contacte: ", err);
    throw err;
  }
  console.log("Tabelul de contacte a fost creat sau deja exista!");
});

//Adaugare date in tabele pentru popularea paginii

const insertProjectsQuery = `
    INSERT INTO projects (title, description, imgUrl, imgUrl2, imgUrl3, features, stack, tech, link)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const graphicDesignerProject = [
  "Neuron English",
  "I created a captivating graphic animation for a company specializing in teaching English to children. This interactive promotional advertisement is dedicated to both parents and children, providing them with an entertaining and educational experience. Through the animation, we conveyed an atmosphere full of enthusiasm and the benefits of learning English in an engaging and accessible manner, encouraging young ones to explore and learn interactively, fostering a joyful learning experience.",
  "/Neuron_English-1.png",
  "/Neuron_English-2.png",
  "/Neuron_English-3.png",
  JSON.stringify([
    "The ad is interactive and engaging, involving users in an active manner.",
    "Showcases two cat characters as mascots, creating an emotional connection with children.",
    " Includes a mini-tutorial on how to find the Neuron English webpage and its address on the internet, facilitating access to information.",
    "Presents clear benefits of the offered courses, emphasizing the progress and advantages for participants.",
  ]),
  JSON.stringify(["Photoshop", "Illustrator", "Premiere Pro"]),
  "Adobe Photoshop, Adobe Illustrator, Adobe Premiere Pro",
  "https://www.neuronenglish.ro/",
];

const videoEditorProject = [
  "DenverGym",
  "I created a short advertisement for an application that allows users to scan gym equipment and experience augmented reality demonstrations of how to properly use each machine. This interactive feature provides users with a visually immersive understanding of how to utilize the gym equipment effectively.",
  "/denvergym1.png",
  "/denvergym2.png",
  "/denvergym3.png",
  JSON.stringify([
    "Created a demonstration showcasing how the application would look and function.",
    "Developed 3D models of smartphones to present a more engaging rendering.",
    "Displayed various sections of the application, offering a comprehensive view of its functionalities.",
  ]),
  JSON.stringify(["Premiere Pro", "After Effects", "Photoshop"]),
  "Adobe Premiere Pro, Adobe After Effects, Adobe Photoshop",
  "https://www.youtube.com/watch?v=GoHY2FRFhUE&ab_channel=LucianGrr",
];

const adsEditorProject = [
  "Ovidius Innovation Center",
  "I have created a captivating advertisement for an innovative project at Ovidius University that transforms students into budding entrepreneurs. This advertisement promotes the project and highlights its essential benefits, providing a clear picture of the location where it will take place. Through this, we emphasize the exceptional opportunity to develop entrepreneurial skills, equipping students with the necessary tools and resources to materialize their ideas into successful ventures. The project's location offers a conducive environment for innovation and collaboration, thereby fostering an entrepreneurial spirit and creating a vibrant space for the growth and development of students' creative ideas.",
  "/Oicsas1.png",
  "/Oicsas2.png",
  "/Oicsas3.png",
  JSON.stringify([
    "Incorporated short video sequences to showcase the project's activities in action, providing a glimpse of how things operate within the project.",
    "Emphasized teamwork by showcasing how everyone collaborates effectively within the project.",
    "Utilized an AI-generated voiceover to create a professional advertising-like background voice, enhancing the promotional aspects of the project.",
    "I utilized background music and sounds with free copyright for the project."
  ]),
  JSON.stringify(["Premiere Pro", "Photoshop"]),
  "Adobe Premiere Pro, Adobe Photoshop",
  "https://www.youtube.com/watch?v=BtjqvaDLCoo&ab_channel=LucianGrr",
];

db.query(insertProjectsQuery, graphicDesignerProject, (err, data) => {
  if (err) {
    console.error("Eroare la adăugarea proiectului: ", err);
  } else {
    console.log("Proiect adăugat cu succes!");
  }
});

db.query(insertProjectsQuery, videoEditorProject, (err, data) => {
  if (err) {
    console.error("Eroare la adăugarea proiectului: ", err);
  } else {
    console.log("Proiect adăugat cu succes!");
  }
});

db.query(insertProjectsQuery, adsEditorProject, (err, data) => {
  if (err) {
    console.error("Eroare la adăugarea proiectului: ", err);
  } else {
    console.log("Proiect adăugat cu succes!");
  }
});


//Preluare date din tabele

app.get("/projects", (req, res) => {
  const sqlSelect = "SELECT * FROM projects";
  db.query(sqlSelect, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Adaugare date in tabele

app.post("/projects", (req, res) => {
  const sqlInsert =
    "INSERT INTO projects (`title`, `description`, `imgUrl`, `imgUrl2`, `imgUrl3`, `features`, `stack`, `tech`, `link`) VALUE (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.imgUrl,
    req.body.imgUrl2,
    req.body.imgUrl3,
    JSON.stringify(req.body.features),
    JSON.stringify(req.body.stack),
    req.body.tech,
    req.body.link,
  ];
  db.query(sqlInsert, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("successfully added new project");
  });
});

//Actualizare date in tabele

app.put("/projects/:id", (req, res) => {
  const projectId = req.params.id;
  const sqlUpdate =
    "UPDATE projects SET title = ?, description = ?, imgUrl = ?, imgUrl2 = ?, imgUrl3 = ?, features = ?, stack = ?, tech = ?, link = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.description,
    req.body.imgUrl,
    req.body.imgUrl2,
    req.body.imgUrl3,
    JSON.stringify(req.body.features),
    JSON.stringify(req.body.stack),
    req.body.tech,
    req.body.link,
  ];
  db.query(sqlUpdate, [...values, projectId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Proiect actualizat cu succes!");
  });
});

//Stergere date din tabele

app.delete("/projects/:id", (req, res) => {
  const projectId = req.params.id;
  const sqlDelete = "DELETE FROM projects WHERE id = ?";
  db.query(sqlDelete, [projectId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Proiect sters cu succes!");
  });
});

//Actualizare vizibilitate proiecte

app.patch("/projects/:id", (req, res) => {
  const projectId = req.params.id;
  const { hidden } = req.body;
  const sqlUpdate = "UPDATE projects SET hidden = ? WHERE id = ?";
  db.query(sqlUpdate, [hidden, projectId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Proiect vizibil/invizibil actualizat cu succes!");
  });
});

//Preluare date din tabele

app.get("/contacts", (req, res) => {
  const sqlSelect = "SELECT * FROM contacts";
  db.query(sqlSelect, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Adaugare date in tabele

app.post("/contacts", (req, res) => {
  const { name, email, message } = req.body;
  const sqlInsert =
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  const values = [name, email, message];

  db.query(sqlInsert, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Mesajul a fost trimis cu succes");
  });
});

//Port-ul pe care este rulat serverul

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
