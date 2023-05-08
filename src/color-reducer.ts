import { rgb } from 'color-convert';

type HexColor = `#${string}`;
type RGBString = `rgb(${number}, ${number}, ${number})`;

// check if the string fits the structure; if it does, assign it the type HexColor
const isHexColor = (s: string): s is HexColor => {
  return s.startsWith('#');
};

type ColorFormats = 'rgb' | 'hex' | 'hsl' | 'hsv';
type ActionTypes = `update-${ColorFormats}-color`;

type UpdateHexColorAction = {
  type: 'update-hex-color';
  payload: {
    hexColor: string;
  };
};

type UpdateRGBColorAction = {
  type: 'update-rgb-color';
  payload: {
    rgb: [number, number, number];
  };
};

export type AdjustColorActions = UpdateHexColorAction | UpdateRGBColorAction;

type ColorState = {
  hexColor: string;
};

export const initialState: ColorState = {
  hexColor: '#bada55',
};

export const colorReducer = (
  state: ColorState = initialState,
  action: AdjustColorActions,
) => {
  if (action.type === 'update-hex-color') {
    const { hexColor } = action.payload;
    return { ...state, hexColor };
  }
  if (action.type === 'update-rgb-color') {
    const hexColor = '#' + rgb.hex(action.payload.rgb);
    return { ...state, hexColor };
  }
  return state;
};
