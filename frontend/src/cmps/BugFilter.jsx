import { useEffect, useState } from "react";

export function BugFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    // onSetFilterBy(filterByToEdit);
    setFilterByToEdit(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value || "";
        break;

      case "checkbox":
        value = target.checked;
        break;

      default:
        break;
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilterBy(filterByToEdit);
  }

  const { txt, seveiryVal } = filterByToEdit;
  return (
    <div>
      <section className="Bug-filter">
        <h2>Filter Our Bugs</h2>
        <form onSubmit={onSubmitFilter}>
          <div>
            <label htmlFor="txt">Title: </label>
            <input
              value={txt}
              onChange={handleChange}
              type="text"
              placeholder="By Title"
              id="txt"
              name="txt"
            />
          </div>
          <div>
            <label htmlFor="severity">Severity: </label>
            <input
              value={seveiryVal}
              onChange={handleChange}
              type="txt"
              placeholder="By severity"
              id="severity"
              name="severity"
            />
          </div>
          <button>Set Filter</button>
        </form>
      </section>
    </div>

    //     <button>Set Filter</button>
    //   </form>
    // </section>
  );
}
