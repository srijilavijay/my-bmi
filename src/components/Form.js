import { useState } from "react";

function Form({ getData }) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [alert, setAlert] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (isNaN(height) || isNaN(weight)) {
      console.log("Not a valid input");
      setAlert(true);
    } else {
      setAlert(false);
      getData(height, weight);
      setHeight("");
      setWeight("");
    }
  };
  return (
    <div className="col-sm-4 shadow rounded px-5">
      <h1 className="text-center pt-3 text-secondary h2">BMI CALCULATOR</h1>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col col-sm-6">
            <div className="my-3">
              <label>Height(m):</label>
              <input
                placeholder="eg: 1.70"
                type="text"
                required
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>
          <div className="col col-sm-6">
            <div className="my-3">
              <label>Weight(kg):</label>
              <input
                placeholder="eg: 70"
                type="text"
                required
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>
        </div>
        <input className="btn btn-primary" type="submit" value="GetBMI" />
      </form>

      {/* {alert? <div class="alert alert-danger" role="alert">*Please enter valid data</div> : null} */}
      {alert && (
        <div className="alert alert-danger" role="alert">
          Please enter valid data
        </div>
      )}
    </div>
  );
}

export default Form;
