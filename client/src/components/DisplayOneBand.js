import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const DisplayOneBand = () => {
  const { id } = useParams();
  console.log(id);
  // must use
  const navigate = useNavigate();
  const [band, setBand] = useState({});
  const handleDeleteBand = (id) => {
    axios
      .delete(`http://localhost:8000/api/bands/${id}`)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  // this useeffect will be called on 1st render only denoted by empty [] as 2nd arg
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/bands/${id}`)
      .then((res) => {
        // destructure data key from res object
        const { data } = res;
        console.log(res);
        setBand(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <p>NAME: {band.name}</p>
      <p>GENRE: {band.genre}</p>

      {/* if band.active is true render a YES */}
      {band.active ? <p>ACTIVE? YES</p> : <p>ACTIVE? NO</p>}
      <p>
        PICTURE: <img style={{ height: "250px" }} src={band.picture} alt="" />
      </p>
      <p>LABEL: {band.label}</p>
      <button
        className="btn btn-danger"
        onClick={() => handleDeleteBand(band._id)}
      >
        DELETE
      </button>
    </div>
  );
};

export default DisplayOneBand;
