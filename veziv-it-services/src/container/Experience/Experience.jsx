import "./Experience.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Experienceitem from "../../components/ExperienceItem/Experienceitem";
import { motion } from "framer-motion";

const Experience = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/projects");
        setProjects(response.data);
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

  return (
  <motion.section
    id="experience"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="app__experience">
      <motion.h1
        className="experience__title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Experience
      </motion.h1>
      <div className="app__container app__experience-items">
      {Array.isArray(projects) && projects.length > 0 ? (
            projects.map((item, index) => {
              const stackArray = JSON.parse(item.stack);
              if (!item.hidden) {
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Experienceitem
                      id={item.id}
                      title={item.title}
                      imgUrl={item.imgUrl}
                      stack={stackArray}
                    />
                  </motion.div>
                );
              }
              return null;
            })
          ) : (
            <p>No projects available</p>
          )}
      </div>
    </div>
  </motion.section>
  );
};
export default Experience;
