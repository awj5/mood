import { createContext } from "react";

export type DimensionsType = {
  width: number;
  height: number;
};

export type DimensionsContextType = {
  dimensions: DimensionsType;
  setDimensions: (dimensions: DimensionsType) => void;
};

export const DimensionsContext = createContext<DimensionsContextType>({
  dimensions: { width: 0, height: 0 },
  setDimensions: () => undefined,
});
