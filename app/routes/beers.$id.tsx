import { useLoaderData } from "@remix-run/react";

import styles from "../styles/beer-details.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const data = await fetch(`https://api.punkapi.com/v2/beers/${params.id}`);

  return await data.json();
};

function BeerDetails() {
  const [beer] = useLoaderData();
  return (
    <div className={"detail-container"}>
      <div className={"bgimg"} />
      <div className={"content"}>
        <div className={"left"}>
          <img src={beer.image_url} alt="img" />
        </div>
        <div className={"right"}>
          <h1>{beer.name}</h1>
          <div className={"block"}>
            <p className={"bold"}>
              ABV: <span>{beer.abv}%</span>
            </p>
            <p className={"bold"}>
              IBU: <span>{beer.ibu}</span>
            </p>
          </div>
          <div className={"yeastBlock"}>
            <div className={"yeastLabel"}>Yeast:</div>{" "}
            <div>{beer.ingredients.yeast}</div>
          </div>
          <p className={"tagline"}>{beer.tagline}</p>

          <div className={"tipsBlock"}>
            <p className={"tipsLabel"}>Tips: </p>
            <p className={"tips"}>{beer.brewers_tips}</p>
          </div>
          <div className={"tastes"}>
            <div className={"tastesLabel"}>Tastes:</div>
            <div className={"tastesItem"}>{beer.food_pairing.join(", ")}</div>
          </div>
          <div className={"description"}>
            <p className={"text"}>{beer.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeerDetails;
