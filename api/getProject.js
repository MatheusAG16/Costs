const fs = require("fs");
const path = require("path");

export default function handler(req, res) {
  const { id } = req.query;
  const filePath = path.join(process.cwd(), "db.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read data" });
    }

    const db = JSON.parse(data);
    const project = db.projects.find((project) => project.id === id);

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  });
}
