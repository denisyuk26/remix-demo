import { Form, useSearchParams, useSubmit } from "@remix-run/react";
import { useState } from "react";

function Filters() {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const [beerName, setBeerName] = useState(searchParams.get("beer_name") || "");
  const [abvGt, setAbvGt] = useState(searchParams.get("abv_gt") || "");
  const [abvLt, setAbvLt] = useState(searchParams.get("abv_lt") || "");
  const [selectedValue, setSelectedValue] = useState(
    `${searchParams.get("abv_gt")}-${searchParams.get("avb_lt")}` || ""
  );

  function handleBeerNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBeerName(event.target.value);
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setSelectedValue(value);
    switch (value) {
      case "3-5":
        setAbvGt("3");
        setAbvLt("5");
        search({ abv_gt: "3", abv_lt: "5", beer_name: beerName });

        return;
      case "5-7":
        setAbvGt("5");
        setAbvLt("7");
        search({ abv_gt: "5", abv_lt: "7", beer_name: beerName });

        return;
      case "7-":
        setAbvGt("7");
        setAbvLt("");
        search({ abv_gt: "7", beer_name: beerName, abv_lt: "" });
        return;
      default:
        setAbvGt("");
        setAbvLt("");
        search({ beer_name: beerName });

        return;
    }
  }
  function search({
    beer_name,
    abv_gt,
    abv_lt,
  }: {
    beer_name?: string;
    abv_gt?: string;
    abv_lt?: string;
  }) {
    if (beer_name) {
      searchParams.set("beer_name", beer_name);
    } else {
      searchParams.delete("beer_name");
    }
    if (abv_gt) {
      searchParams.set("abv_gt", abv_gt);
    } else {
      searchParams.delete("abv_gt");
    }
    if (abv_lt) {
      searchParams.set("abv_lt", abv_lt);
    } else {
      searchParams.delete("abv_lt");
    }

    return submit(searchParams);
  }

  return (
    <Form method="get">
      <div className={"filters"}>
        <div className={"search"}>
          <input
            className={"search-input"}
            name="beer_name"
            value={beerName}
            onChange={handleBeerNameChange}
            placeholder="Search by name"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                search({ beer_name: beerName, abv_gt: abvGt, abv_lt: abvLt });
              }
            }}
          />
          <button
            className={"search-button"}
            onClick={(e) => {
              search({ beer_name: beerName, abv_gt: abvGt, abv_lt: abvLt });
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5353 14.404C11.2378 15.3287 9.65013 15.8726 7.93546 15.8726C3.55283 15.8726 0 12.3194 0 7.93628C0 3.55319 3.55283 0 7.93546 0C12.3181 0 15.8709 3.55319 15.8709 7.93628C15.8709 9.65113 15.3271 11.2389 14.4025 12.5366L19.6164 17.751C20.13 18.2648 20.1258 19.0867 19.6162 19.5963L19.5943 19.6182C19.0861 20.1265 18.2587 20.1279 17.7492 19.6184L12.5353 14.404ZM7.93546 14.0052C11.2869 14.0052 14.0038 11.2881 14.0038 7.93628C14.0038 4.58451 11.2869 1.86736 7.93546 1.86736C4.58403 1.86736 1.86717 4.58451 1.86717 7.93628C1.86717 11.2881 4.58403 14.0052 7.93546 14.0052Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <div className={"select"}>
          <label>Abv: </label>
          <select onChange={handleSelectChange} value={selectedValue}>
            <option value="">All</option>
            <option value="3-5">3-5%</option>
            <option value="5-7">5%-7%</option>
            <option value="7-">7%+</option>
          </select>
        </div>
      </div>
    </Form>
  );
}

export default Filters;
