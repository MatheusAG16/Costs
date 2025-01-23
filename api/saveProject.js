const fs = require("fs");
const path = require("path");

export default function handler(req, res) {
  if (req.method === "POST") {
    const newProject = req.body;
    const filePath = path.join(process.cwd(), "db.json");

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Erro na leitura dos dados" });
      }

      const db = JSON.parse(data);
      db.projects.push(newProject);

      fs.writeFile(filePath, JSON.stringify(db, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ error: "Erro ao salvar dados" });
        }
        res.status(200).json({ message: "Projeto salvo" });
      });
    });
  } else {
    res.status(405).json({ error: "Metodo não permitido" });
  }
}
