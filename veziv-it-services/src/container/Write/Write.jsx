import "./Write.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Write = () => {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    imgUrl: "",
    imgUrl2: "",
    imgUrl3: "",
    features: [],
    stack: [],
    tech: "",
    link: "",
  });

  //Incarcare Imagine

  const [imagesSelected, setImagesSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  //Folosim Cloudinary pentru a stoca imaginile iar in baza de date vom stoca doar link-ul catre ele.
  
  const uploadImages = async () => {
    setIsLoading(true);
    const promises = imagesSelected.map((image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ad3lhltj");

      return axios.post(
        "https://api.cloudinary.com/v1_1/dsdgc2jsy/image/upload",
        formData
      );
    });

    try {
      const responses = await Promise.all(promises);
      const imageUrls = responses.map((response) => response.data.url);

      setPostData({
        ...postData,
        imgUrl: imageUrls[0] || "",
        imgUrl2: imageUrls[1] || "",
        imgUrl3: imageUrls[2] || "",
      });
      console.log("Imagini încărcate cu succes:", imageUrls);
    } catch (error) {
      console.error("Eroare la încărcarea imaginilor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  //Adaugare caracteristici si tehnologii separate deoarece in baza de date vom stoca un array cu acestea.

  const handleFeatureChange = (e, idx) => {
    const newFeatures = [...postData.features];
    newFeatures[idx] = e.target.value;
    setPostData({ ...postData, features: newFeatures });
  };

  const handleStackChange = (e, idx) => {
    const newStack = [...postData.stack];
    newStack[idx] = e.target.value;
    setPostData({ ...postData, stack: newStack });
  };

  const addFeatureInput = () => {
    setPostData({ ...postData, features: [...postData.features, ""] });
  };

  const addStackInput = () => {
    setPostData({ ...postData, stack: [...postData.stack, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (postData.features.length === 0 || postData.stack.length === 0) {
      alert("Please add at least one feature and one technology.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/projects", postData);
      navigate("/");
    } catch (err) {
      console.error("Eroare la adăugarea postării:", err);
      alert("The error has occurred. Please try again later.");
    }
  };

  return (
    <div className="app__write">
      <h1>Create NEW Post</h1>
      <div className="app__container app__write-container">
        <form onSubmit={handleSubmit}>
          <label className="bold-text" htmlFor="title">
            Title*
          </label>
          <input
            type="text"
            name="title"
            placeholder="Title post"
            value={postData.title}
            onChange={handleChange}
            required
          />
          <label htmlFor="Description" className="bold-text">
          Description*
          </label>
          <textarea
            name="description"
            placeholder="Description post"
            value={postData.description}
            onChange={handleChange}
            rows={5}
            required
          ></textarea>
          <label htmlFor="imgUrl" className="bold-text">
          Select 3 images you have, the first one is the main one.*
          </label>
          <input
            type="file"
            multiple
            onChange={(event) => {
              const selectedFiles = Array.from(event.target.files);
              setImagesSelected(selectedFiles);
            }}
          />
          <button onClick={uploadImages}>Upload Images*</button>

          <p>{isLoading ? 'Loading...' : 'Upload Images'}</p>

          <label htmlFor="features" className="bold-text">
            Features*
          </label>
          {postData.features.map((feature, idx) => (
            <input
              key={idx}
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(e, idx)}
              required
            />
          ))}
          <button type="button" onClick={addFeatureInput}>
            Add Feature*
          </button>

          <label htmlFor="stack" className="bold-text">
          Technology on main-page*
          </label>
          {postData.stack.map((tech, idx) => (
            <input
              key={idx}
              type="text"
              value={tech}
              onChange={(e) => handleStackChange(e, idx)}
              required
            />
          ))}
          <button type="button" onClick={addStackInput}>
            Add Tech*
          </button>

          <label htmlFor="tech" className="bold-text">
            Tech*
          </label>
          <input
            type="text"
            name="tech"
            placeholder="Technology"
            value={postData.tech}
            onChange={handleChange}
            required
          />
          <label htmlFor="link" className="bold-text">
            Url Link*
          </label>
          <input
            type="text"
            name="link"
            placeholder="Link"
            value={postData.link}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Post</button>
        </form>
        <div className="write__img">
          <img src="/avatar.svg" alt="contact-image" />
        </div>
      </div>
    </div>
  );
};

export default Write;
