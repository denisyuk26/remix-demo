import { Link } from "@remix-run/react";
import styles from "../styles/index.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function Index() {
  return (
    <div className="container">
      <h1>Index</h1>
      <Link to={"/beers"}>enter</Link>
    </div>
  );
}
