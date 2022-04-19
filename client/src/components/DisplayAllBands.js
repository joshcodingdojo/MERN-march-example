import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const DisplayAllBands = () => {
  const [bands, setBands] = useState([]);

  // this useeffect will be called only once on original render, as denoted by second empty [] as arg to useeffct
  useEffect(() => {
    console.log("useEffectFired");
    axios
      // axios.get() takes a url
      .get("http://localhost:8000/api/bands")
      // success
      .then((response) => {
        console.log(response);
        setBands(response.data);
      })
      .catch((err) => console.log(err.response));
  }, []);

  // handler to delete band
  // takes in id of band as arg
  const handleDeleteBand = (id) => {
    // "/api/bands/:id"
    axios
      .delete(`http://localhost:8000/api/bands/${id}`)
      .then((res) => {
        console.log(res);
        // use .filter() to filter out the band w;/ id trying to delete
        const filteredBands = bands.filter((band, index) => {
          return band._id !== id;
        });

        console.log(filteredBands);
        setBands(filteredBands);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <h1>DISPLAY</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Year Formed</th>
            <th scope="col">Label</th>
            <th scope="col">Genre</th>
            <th scope="col">Members</th>
            <th scope="col">Picture</th>
            <th scope="col">Active?</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* === BEGIN LOOP === */}
          {bands.map((band, index) => {
            return (
              <tr key={band._id}>
                <td>{band.name}</td>
                <td>{band.yearFormed}</td>
                <td>{band.label}</td>
                <td>{band.genre}</td>
                <td>{band.members}</td>
                <td>
                  <img style={{ height: "200px" }} src={band.picture} alt="" />
                </td>
                {/* 
                  band.active is boolean. react wont render a boolean value. 
                  we check if it is true, if it is render a Yes if false render No
                 */}
                {band.active ? <td>Yes</td> : <td>No</td>}
                <td>{band.active}</td>
                <td className="d-flex">
                  <button>
                    {/* pack id into Link url */}
                    <Link to={`/band/${band._id}/edit`}>EDIT</Link>
                  </button>{" "}
                  <button
                    className="btn btn-danger"
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={() => handleDeleteBand(band._id)}
                  >
                    DELETE
                  </button>{" "}
                  <Link to={`/band/${band._id}`}>details</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayAllBands;
