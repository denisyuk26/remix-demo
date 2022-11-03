import { Link } from "@remix-run/react";
import type { Beer } from "domain/entities/beer";

import styles from "./list-item.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

function ListItem(props: { beer: Beer }) {
  return (
    <Link className="link" to={props.beer.id.toString()}>
      <div className={"item"}>
        <img className={"img"} src={props.beer.image_url} alt="beer" />
        <div className={"info"}>
          <h3 className={"name"}>{props.beer.name} </h3>
          <p className={"abv"}>
            ABV: <span className={"abvValue"}>{props.beer.abv}%</span>
          </p>
          <p className={"tagline"}>{props.beer.tagline}</p>
          <p className={"yeast"}>{props.beer.ingredients.yeast}</p>
        </div>
      </div>
    </Link>
  );
}

export default ListItem;
