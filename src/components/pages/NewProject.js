import { useNavigate } from "react-router-dom";
import styles from "./NewProject.module.css";
import ProjectForm from "../project/ProjectForm";

function NewProject() {
  const navigate = useNavigate();

  function createPost(project) {
    // initialize cost and services
    project.cost = 0;
    project.services = [];

    fetch("/api/saveProject", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        //redirect
        const state = { message: "Projeto criado com sucesso!" };
        navigate("/projects", { state });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adivionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  );
}

export default NewProject;
