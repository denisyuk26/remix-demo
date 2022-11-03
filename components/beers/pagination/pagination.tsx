import { useSearchParams, useSubmit } from "@remix-run/react";

import styles from "./pagination.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

function Pagination() {
  const submit = useSubmit();
  const [params] = useSearchParams();

  const arr = new Array(10).fill(0).map((_, i) => i);

  function handleSubmit(page: number) {
    params.set("page", page.toString());

    return submit(params);
  }

  return (
    <div className={"pagination"}>
      {arr.map((item) => {
        const active =
          Number(params.get("page")) === item + 1 ||
          (params.get("page") === null && item === 0);

        return (
          <button
            className={`paginationItem ${active && "paginationItemActive"}`}
            key={item}
            onClick={() => handleSubmit(item + 1)}
          >
            {item + 1}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
