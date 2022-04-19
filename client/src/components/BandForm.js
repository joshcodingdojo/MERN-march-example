import axios from "axios";
import { useState } from "react";

const BandForm = () => {
  // define state vars
  const [name, setName] = useState("");
  const [picUrl, setPicUrl] = useState("");
  const [yearFormed, setYearFormed] = useState();
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [members, setMembers] = useState("");
  const [genre, setGenre] = useState("");
  const [errors, setErrors] = useState({});
  // handler to call post req to add new band to db
  const handleAddBand = (e) => {
    e.preventDefault();
    console.log({
      name: name,
      picUrl,
      yearFormed,
      label,
      active,
      members,
      genre,
    });
    axios
      .post("http://localhost:8000/api/bands", {
        name: name,
        picture: picUrl,
        yearFormed,
        label,
        active,
        members,
        genre,
      })
      .then((response) => {
        console.log("success", response);
      })
      .catch((err) => {
        console.log("error", err.response);
        setErrors(err.response.data.errors);
      });
  };
  return (
    <div>
      <h1>Add Your Favorite Band</h1>
      <form onSubmit={handleAddBand}>
        <div>
          <label htmlFor="name">Band Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* if the errors {} has a key called name, render a p tag w/ error msg */}
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        <div>
          <label htmlFor="picture">Picture URL</label>
          <input
            type="text"
            id="picture"
            onChange={(e) => setPicUrl(e.target.value)}
          />
        </div>
        {errors.picture && (
          <p style={{ color: "red" }}>{errors.picture.message}</p>
        )}
        <div>
          <label htmlFor="yearFormed">Year Formed</label>
          <input
            type="number"
            id="yearFormed"
            onChange={(e) => setYearFormed(e.target.value)}
          />
        </div>
        {errors.yearFormed && (
          <p style={{ color: "red" }}>{errors.yearFormed.message}</p>
        )}
        <div>
          <label htmlFor="label">Label</label>
          <input
            type="text"
            id="label"
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="active">Still Active (Together)?</label>
          <input
            type="checkbox"
            id="active"
            onChange={(e) => setActive(!active)}
          />
        </div>
        <div>
          <label htmlFor="members">Members</label>
          <input
            type="text"
            id="members"
            onChange={(e) => setMembers(e.target.value)}
          />
        </div>
        {errors.members && (
          <p style={{ color: "red" }}>{errors.members.message}</p>
        )}
        <div>
          {/* DROPDOWN w react */}
          <select name="" id="" onChange={(e) => setGenre(e.target.value)}>
            Genre
            <option>--------</option>
            <option value="Rock">Rock</option>
            <option value="Jazz">Jazz</option>
            <option value="Prog">Prog</option>
            <option value="Hip Hop">Hip Hop</option>
            <option value="RnB">RnB</option>
            <option value="Soul">Soul</option>
            <option value="Classical">Classical</option>
            <option value="Metal">Metal</option>
            <option value="Pop">Pop</option>
            <option value="Techno">Techno</option>
            <option value="Grunge">Grunge</option>
          </select>
        </div>
        {errors.genre ? (
          <p style={{ color: "red" }}>{errors.genre.message}</p>
        ) : null}
        <button type="submit">SUBMIT</button>
        {/* this is how we can loop through keys on error object and display msg */}
        {errors &&
          Object.keys(errors).map((errKey, index) => {
            return (
              <p style={{ color: "red" }} key={index}>
                {errors[errKey].message}
              </p>
            );
          })}
      </form>
    </div>
  );
};

export default BandForm;

const exObj = {
  a: "b",
  c: "d",
};

console.log(Object.keys(exObj));
