import React from "react";

function PlaylistTile({ image, name, key }) {
  <div id={key}>
    <img src={image} />
    <span>{name}</span>
  </div>;
}

export default PlaylistTile;
