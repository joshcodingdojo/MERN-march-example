import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const EditBand = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [yearFormed, setYearFormed] = useState("");
  const [genre, setGenre] = useState("");
  const [active, setActive] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/bands/${id}`)
      .then((res) => {
        const { data } = res;
        // set state variables
        setName(data.name);
        setYearFormed(data.yearFormed);
        setGenre(data.genre);
        setActive(data.active);
      })
      .catch((err) => console.log(err));
  }, []);

  // edit handler.
  const handleEditBand = (e) => {
    e.preventDefault();
    axios
      // pack in id into url
      .put(`http://localhost:8000/api/bands/${id}`, {
        name,
        yearFormed,
        genre,
        active,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <form onSubmit={handleEditBand}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div>
        <label htmlFor="year">Year Formed</label>
        <input
          id="year"
          type="text"
          onChange={(e) => setYearFormed(e.target.value)}
          value={yearFormed}
        />
      </div>
      <div>
        <label htmlFor="name">Genre</label>
        <input
          id="genre"
          type="text"
          onChange={(e) => setGenre(e.target.value)}
          value={genre}
        />
      </div>
      <div>
        <label htmlFor="active">ACTIVE?</label>
        <input
          type="checkbox"
          id="active"
          checked={active}
          readOnly
          onChange={() => setActive(!active)}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        SUBMIT
      </button>
    </form>
  );
};

export default EditBand;
