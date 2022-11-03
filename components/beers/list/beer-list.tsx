import type { Beer } from "domain/entities/beer";
import ListItem from "../list-item/list-item";
import styles from "./beer-list.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

function BeerList(props: { beers: Beer[] }) {
  return (
    <div className="list">
      {props.beers.map((item) => (
        <ListItem key={item.id} beer={item} />
      ))}
    </div>
  );
}

export default BeerList;
