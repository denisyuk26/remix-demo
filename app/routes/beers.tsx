import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BeerList from "components/beers/list/beer-list";
import type { Beer } from "domain/entities/beer";

import { links as listItemStyles } from "components/beers/list-item/list-item";
import { links as beerListStyles } from "components/beers/list/beer-list";
import { links as paginationStyles } from "components/beers/pagination/pagination";

import Filters from "components/beers/filters/filters";
import Pagination from "components/beers/pagination/pagination";
import { UrlBuilder } from "helpers/url-builder";
import styles from "../styles/beers.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css",
    },
    ...beerListStyles(),
    ...listItemStyles(),
    ...paginationStyles(),
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const perPage = url.searchParams.get("per_page") || "25";
  const abvGt = url.searchParams.get("abv_gt") || "0";
  const abvLt = url.searchParams.get("abv_lt") || "";
  const beerName = url.searchParams.get("beer_name") || "";

  const builder = new UrlBuilder("https://api.punkapi.com/v2/beers");
  builder.addSearchParam("page", page);
  builder.addSearchParam("per_page", perPage);
  builder.addSearchParam("abv_gt", abvGt);
  builder.addSearchParam("abv_lt", abvLt);
  builder.addSearchParam("beer_name", beerName);

  const response = await fetch(builder.toString());

  return await response.json();
};

function BeersPage() {
  const beers: Beer[] = useLoaderData<typeof loader>();

  return (
    <div className="container">
      <Filters />
      <BeerList beers={beers} />
      {beers.length === 25 ? <Pagination /> : null}
    </div>
  );
}

export default BeersPage;
