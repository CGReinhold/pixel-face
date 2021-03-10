# Pixel Face Generator

Package to generate pixel faces

![Faces](/assets/faces.png)

## Installation

`npm install pixel-face`

## Usage

```js
import PixelFace from 'pixel-face';

const pixelFace = new PixelFace();

const faceBitMap = pixelFace.getFace();
const svgFace = pixelFace.getSVG();
const htmlFace = pixelFace.getHTML();
```