const fs = require("fs");
const path = require("path");

export default function handler(req, res) {
  if (req.method === "PATCH") {
    const updatedProject = req.body;
    const filePath = path.join(process.cwd(), "db.json");

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Failed to read data" });
      }

      const db = JSON.parse(data);
      const projectIndex = db.projects.findIndex(
        (project) => project.id === updatedProject.id
      );

      if (projectIndex !== -1) {
        db.projects[projectIndex] = updatedProject;
        fs.writeFile(filePath, JSON.stringify(db, null, 2), (err) => {
          if (err) {
            return res.status(500).json({ error: "Failed to save data" });
          }
          res.status(200).json(updatedProject);
        });
      } else {
        res.status(404).json({ error: "Project not found" });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
