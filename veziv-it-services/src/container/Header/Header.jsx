import { motion } from "framer-motion";
import "./Header.scss";

const Header = () => {
  return (
    <div className="app__home">
      <div className="app__container">
        <motion.img
          className="img__home"
          src="avatar.svg"
          alt="avatar-photo"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />
        <motion.p
          className="p-text p__home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Hello, I&apos;m
        </motion.p>
        <motion.h1
          className="head-text title__home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Biolan Lucian
        </motion.h1>
        <motion.p
          className="p-text p__home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Welcome! I&apos;m Biolan Lucian, a passionate visual creator devoted
          to transforming concepts into vibrant and impactful visuals. Fueled by
          innovation, I merge shapes, colors, and text to convey compelling
          messages through graphic design.
        </motion.p>
      </div>
    </div>
  );
};

export default Header;
