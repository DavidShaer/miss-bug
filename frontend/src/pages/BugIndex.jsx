import { bugService } from "../services/bug.service-remote.js";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { BugList } from "../cmps/BugList.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { BugFilter } from "../cmps/BugFilter.jsx";
import { Pagination } from "../cmps/Pagination.jsx";

export function BugIndex() {
  const [bugs, setBugs] = useState([]);
  const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter());
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadBugs();
  }, [filterBy]);

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
    setFilterBy((prevFilter) => ({ ...prevFilter, pageIdx: newPage }));
  }

  async function loadBugs() {
    const bugs = await bugService.query(filterBy);
    setBugs(bugs);
  }

  async function onRemoveBug(bugId) {
    try {
      await bugService.remove(bugId);
      console.log("Deleted Succesfully!");
      setBugs((prevBugs) => prevBugs.filter((bug) => bug._id !== bugId));
      showSuccessMsg("Bug removed");
    } catch (err) {
      console.log("Error from onRemoveBug ->", err);
      showErrorMsg("Cannot remove bug");
    }
  }

  async function onAddBug() {
    const bug = {
      title: prompt("Bug title?"),
      description: prompt("Bug description?"),
      severity: +prompt("Bug severity?"),
      label: prompt("Bug label? ['critical', 'need-CR', 'dev-branch']"),
    };
    try {
      const savedBug = await bugService.save(bug);
      console.log("Added Bug", savedBug);
      setBugs((prevBugs) => [...prevBugs, savedBug]);
      showSuccessMsg("Bug added");
    } catch (err) {
      console.log("Error from onAddBug ->", err);
      showErrorMsg("Cannot add bug");
    }
  }

  async function onEditBug(bug) {
    const title = prompt("New Bug title?");
    const description = prompt("New Bug description?");
    const severity = +prompt("New severity?");
    const label = prompt(
      "New Bug label? ['critical', 'need-CR', 'dev-branch']"
    );

    const bugToSave = { ...bug, severity, title, description, label };
    try {
      const savedBug = await bugService.save(bugToSave);
      console.log("Updated Bug:", savedBug);
      setBugs((prevBugs) =>
        prevBugs.map((currBug) =>
          currBug._id === savedBug._id ? savedBug : currBug
        )
      );
      showSuccessMsg("Bug updated");
    } catch (err) {
      console.log("Error from onEditBug ->", err);
      showErrorMsg("Cannot update bug");
    }
  }
  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));

    loadBugs();
  }

  if (!bugs) return <h1>loadings....</h1>;
  return (
    <main className="main-layout">
      <h3>Bugs App</h3>
      <div className="filter-bugs-layout">
        <BugFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      </div>
      <main>
        <button onClick={onAddBug}>Add Bug ⛐</button>
        <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
      </main>
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        hasNext={bugs.length > 0}
      />
    </main>
  );
}
