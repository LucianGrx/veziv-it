import "./Single.scss";
import Experienceitem from "../../components/ExperienceItem/Experienceitem";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineHideImage } from "react-icons/md";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Single = () => {
  const [projects, setProjects] = useState([]);
  const [hidden, setHidden] = useState(false);
  const { id } = useParams();
  const projectId = parseInt(id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/projects");
        setProjects(response.data);
        setHidden(response.data.hidden);
      } catch (err) {
        console.log(err);
        return (
          <>
            <h1>loading</h1>
          </>
        );
      }
    };
    fetchData();
  }, []);

  const projectData = projects.find((item) => item.id === projectId);
  if (!projectData) {
    return (
      <div className="app__single-error">
        <img src="/404-Page-Featured-Image.png" alt="error-image" />
      </div>
    );
  }

  const featuresArray = JSON.parse(projectData.features);

  const toggleHidden = async () => {
    try {
      await axios.patch(`http://localhost:8080/projects/${id}`, {
        hidden: !hidden,
      });
      setHidden(!hidden);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/projects/${id}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app__single">
      <div className="app__container app__single-container">
        <div className="app__single-mainpost">
          <div className="app__single-actions">
            <button>
              <Link to={`/update/${projectData.id}`}>
                <FaRegEdit />
                Edit
              </Link>
            </button>
            <button onClick={() => handleDelete(projectData.id)}>
              <AiOutlineDelete />
              Delete
            </button>
            <button onClick={toggleHidden}>
              <MdOutlineHideImage /> {hidden ? "Unhide" : "Hide"}
            </button>
          </div>
          <h1 className="">{projectData.title}</h1>
          <p className="p-text">{projectData.description}</p>
          <img
            src={projectData.imgUrl || "/placeholder-image.jpg"}
            width="900px"
            alt="imagine-test"
          />
          <div className="single__image-container">
            <img
              src={projectData.imgUrl2 || "/placeholder-image.jpg"}
              alt="imagine-test-mica"
            />
            <img
              src={projectData.imgUrl3 || "/placeholder-image.jpg"}
              alt="imagine-test-mica"
            />
          </div>
          <h2>Key Features:</h2>
          {featuresArray.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
          <div className="single__technologies">
            <h2>Technologies Used:</h2>
            <p>{projectData.tech}</p>
          </div>
          <div className="single__link-container">
            <a
              className="single__link"
              rel="noreferrer"
              target="_blank"
              href={projectData.link}
            >
              Visit Site
            </a>
          </div>
        </div>
        <div className="app__single-otherpost">
          {projects.map((item) => {
            const stackArray = JSON.parse(item.stack);
            return (
              <Experienceitem
                key={item.id}
                id={item.id}
                title={item.title}
                imgUrl={item.imgUrl}
                stack={stackArray}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Single;
