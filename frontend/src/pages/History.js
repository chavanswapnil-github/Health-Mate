import React, { useEffect, useState } from "react";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/diet/history", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setHistory(data.history || []));
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-success fw-bold mb-4">Your Saved Diet Plans</h2>

      <div className="row g-4">
        {history.map((item) => (
          <div className="col-md-6" key={item._id}>
            <div className="card shadow border-success p-3 rounded">
              <h6 className="text-secondary">
                {new Date(item.createdAt).toLocaleString()}
              </h6>
              <p
                dangerouslySetInnerHTML={{
                  __html: item.diet_plan.replace(/\n/g, "<br/>"),
                }}
              ></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
