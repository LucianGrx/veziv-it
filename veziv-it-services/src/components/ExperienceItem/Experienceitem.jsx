import "./Experienceitem.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Experienceitem = ({id, title, imgUrl, stack}) => {
  if(!id || !title || !imgUrl || !stack) return null;

  return (
    <div className="app__experienceitem">
      <Link to={`/post/${id}`}>
      <img src={imgUrl || '/placeholder-image.jpg'} alt="portofolio" className="app__item-img" />
      <div className="app__item-card">
        <h3 className="app__item-title">{title}</h3>
        <p className="p-text">
          {stack.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
        </p>
      </div>
      </Link>
    </div>
  );
};

Experienceitem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  stack: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Experienceitem;
