// custom ts types goes here

type TiledBaseLayer = {
  id: number;
  name: string;
  height: number;
  width: number;
  x: number;
  y: number;
  visible: boolean;
  opacity: number;
};

export type TiledTileLayer = TiledBaseLayer & {
  type: "tilelayer";
  data: number[];
  objects: never;
};

export type TiledObjectLayer = TiledBaseLayer & {
  type: "objectgroup";
  data: never;
  objects: TiledObject[];
};

export type TiledLayer = TiledTileLayer | TiledObjectLayer;

export type TiledObject = {
  id: number;
  height: number;
  width: number;
  name: string;
  type: string;
  point: boolean;
  rotation: number;
  visible: boolean;
  x: number;
  y: number;
};
