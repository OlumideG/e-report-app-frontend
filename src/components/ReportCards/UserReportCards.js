import React, { useState } from 'react';
import "../UserDashboard/UserDashboard.css"


const Accordion = ({ title, children }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <div className="accordion-wrapper">

        <div
          className={`accordion-title ${isOpen ? "open" : ""}`}
          onClick={() => setOpen(!isOpen)}
        >
          {title}
        </div>
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>

  );
};


const UserReportCards = ({ info, index, deleteReport, pendingColor }) => (
  <div className="todo">
    <div className="wrapper">
      <div className={pendingColor ? "card-body card-yellow" : "card-body"}>
        <div className="card-body-title">
          <h5 className="card-title font-weight-bold text-uppercase form-font">
            {info.category} at {info.address}
          </h5>
          <h5 className="card-title font-weight-bold text-uppercase form-font">
            {" "}
            {info.localgovernment}
          </h5>
        </div>

        <div className="accordion-body">
          <Accordion className="my-title" title="View details">
            <div className="myview">
              <div>
                <img
                  className="card-img"
                  src={info.imageurl}
                  alt=""
                  style={{ width: "300px", height: "200px" }}
                />
              </div>
              <div className="accordion-details">
                <h5 className="card-title font-weight-bold text-uppercase form-font">
                  Private Report: {info.privatereport.toString()}
                </h5>
                <h5 className="card-title font-weight-bold text-uppercase form-font">
                  Report Status: {info.status}
                </h5>
                <h5 className="card-title font-weight-bold text-uppercase form-font">
                  Report Date: {info.date}
                </h5>
                <h5 className="card-title font-weight-bold text-uppercase form-font">
                  {" "}
                  Report Time: {info.time}
                </h5>
                <h5 className="card-title font-weight-bold text-uppercase form-font">
                  Report Local Government: {info.localgovernment}
                </h5>
                <div className="word-break">
                  <h5 className="card-title font-weight-bold text-uppercase form-font">
                    {" "}
                    Report Details: {info.details}
                  </h5>
                </div>
              </div>
            </div>
          </Accordion>
        </div>

        <div>{info.time}</div>

        <div className="delete-container">
          <button
            className="delbutton"
            onClick={() => deleteReport(index, info)}
          >
            {" "}
            <i className="fa fa-trash fa-1.5x"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
);


export default UserReportCards;