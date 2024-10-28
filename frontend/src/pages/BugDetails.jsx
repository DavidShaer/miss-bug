import { useState } from "react";
// import { bugService } from '../services/bug.service.js'
import { bugService } from "../services/bug.service-remote.js";
import { showErrorMsg } from "../services/event-bus.service.js";
import { useParams } from "react-router";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function BugDetails() {
  const [bug, setBug] = useState(null);
  const { bugId } = useParams();

  useEffect(() => {
    loadBug();
  }, []);

  async function loadBug() {
    try {
      const bug = await bugService.getById(bugId);
      setBug(bug);
    } catch (err) {
      showErrorMsg("Cannot load bug");
    }
  }

  if (!bug) return <h1>loadings....</h1>;
  return (
    <div className="bug-details main-layout">
      <div className="bug-details-layout">
        <h3>Bug Details 🐛</h3>
        <h4>Title:{bug.title}</h4>
        <p>
          {" "}
          Description: <span>{bug.description}</span>{" "}
        </p>
        <p>
          {" "}
          Severity: <span>{bug.severity}</span>{" "}
        </p>
        <p>
          {" "}
          Label: <span>{bug.label}</span>{" "}
        </p>
        <p>
          {" "}
          Created at: <span>{bug.createdAt}</span>{" "}
        </p>
        <p className="back-to-list">
          {" "}
          <Link to="/bug">Back to List</Link>
        </p>
      </div>
    </div>
  );
}
