import { motion } from "framer-motion";
import "./About.scss";

const About = () => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="app__about">
        <motion.h1
          className="title__about"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About me
        </motion.h1>
        <div className="app__container app__about-container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.img src="avatar.svg" width="350px" alt="about-image" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.p className="p-text">
              I&apos;m a passionate creator who turns visions into graphic
              reality. With an obsession for details and a heart filled with
              creativity, I bring stories and ideas to life through design. Each
              stroke and color I apply represents a journey toward perfection,
              aiming to surprise and captivate with every project. I strive to
              strike a balance between functionality and beauty, crafting unique
              and memorable designs. Each creation holds not just work, but a
              story that connects on an emotional level. I draw inspiration from
              various sources, always seeking fresh challenges and
              collaborations to express my creativity and make an impact.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
