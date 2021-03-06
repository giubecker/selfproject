import React, { useState, useEffect } from "react";
import "./Schedule.css";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../System/Sidebar";

export const NewSchedule = () => {
  const initialValue = {
    type: "",
    date: "",
    hour: "",
  };
  const history = useHistory();
  const [values, setValues] = useState({});
  const [dropdown, setDropdown] = useState("Selecione");
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState([initialValue]);

  useEffect(() => {
    axios.get("http://localhost:9002/agendamentos").then((response) => {
      setDates(response.data);
    });
  }, []);

  function onChange(event) {
    const { name, value} = event.target;
    setDropdown(event.target.value);
    setValues({ ...values, [name]: value });
  }

  function onSubmit(event) {
    event.preventDefault();
    axios.post("http://localhost:9002/reservados", values).then((response) => {
      history.push("/success");
    });  
  }


  return (
    <>
      <Sidebar />
      <div className="container">
        <div className="box schedule">
          <div className="content">
            <h1 className="title">Novo Agendamento</h1>
            <form onSubmit={onSubmit}>
              {date.map((date, index) => (
                <div key={date.id} className="form">
                  <h2></h2>
                  <label>Tipo: </label>
                  <select
                    className="input"
                    name="type"
                    value={dropdown}
                    onChange={onChange} //onChange={(e) =>{setDropdown(e.target.value)}}
                  >
                    <option value="Rotina">Rotina</option>
                    <option value="Urgência">Urgência</option>
                    <option value="Outros">Outros</option>
                  </select>
                  <br />
                  <label>Horários:</label>
                  <select
                    className="input"
                    value={dropdown}
                    name="date"
                    onChange={onChange}
                  >
                    {dates.map((date, index) => (
                      <option value={date.dateTime} onChange={onChange}>
                        {date.dateTime}
                      </option>
                    ))}
                  </select>
                  <br />

                  <br />
                  <label>Observações: </label>
                  <textarea
                    className="input"
                    name="notes"
                    onChange={onChange}
                  ></textarea>
                  <br />
                </div>
              ))}
              <Link to="/scheduling">
                {" "}
                <button className="button" type="">
                  Voltar
                </button>
              </Link>{" "}
              <button className="button" type="submit">
                Salvar
              </button>
            </form>
            <br />
          </div>
        </div>
      </div>
    </>
  );
};
export default NewSchedule;
