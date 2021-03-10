type HairStyle = 'bottom' | 'top';

interface Hair {
  color: string;
  length: number;
  style: HairStyle;
}

type EyeColor = 'black' | 'dark-brown' | 'light-brown' | 'green' | 'blue' | 'gray';

interface Eye {
  color: EyeColor;
  verticalMargin: number;
  horizontalMargin: number;
}

type FaceColor = 'black' | 'dark-brown' | 'brown' | 'light-brown' | 'salmon' | 'yellow' | 'white' | 'red';

interface Face {
  color: FaceColor;
  width: number;
  height: number;
  pointiness: number;
}

interface Mouth {
  width: number;
}

interface Nose {
  width: number;
  height: number;
}

class Avatar {
  private hair: Hair;
  private eye: Eye;
  private face: Face;
  private mouth: Mouth;
  private nose: Nose;
  private resolution: number;
  
  constructor({ eye, hair, face, mouth, nose, resolution }: { eye?: Eye, hair?: Hair, face?: Face, mouth?: Mouth, nose?: Nose, resolution?: number } | undefined) {
    this.hair = hair || {
      color: '#' + Math.floor(Math.random()*16777215).toString(16),
      length: this.randomNumber(0, 10),
      style: Math.random() > 0.5 ? 'top' : 'bottom',
    };
    this.eye = eye || {
      color: this.getRandomEyeColor(),
      verticalMargin: this.randomNumber(-2, 2),
      horizontalMargin: this.randomNumber(0, 2),
    };
    this.face = face || {
      color: this.getRandomFaceColor(),
      width: this.randomNumber(5, 15),
      height: this.randomNumber(5, 15),
      pointiness: this.randomNumber(0, 30),
    };
    this.mouth = mouth || {
      width: this.randomNumber(1, 5),
    };
    this.nose = nose || {
      width: this.randomNumber(0, 3),
      height: this.randomNumber(0, 5),
    };
    this.resolution = resolution || this.randomNumber(1, 10);
    this.adjustFaceSize();
  }

  setHair({ color, length, style }: { color?: string, length?: number, style?: HairStyle }) {
    if (color) {
      this.hair.color = color;
    }
    if (length !== undefined && length >= 0 && length <= 5) {
      this.hair.length = length;
    }
    if (style !== undefined) {
      this.hair.style = style;
    }
  }

  setResolution(resolution: number) {
    if (resolution >= 1 && resolution <= 10) {
      this.resolution = resolution;
    }
  }

  setMouth({ width }: { width?: number }) {
    if (width >= 0 && width <= 5) {
      this.mouth.width = width;
    }
  }

  setNose({ width, height }: { width?: number, height?: number }) {
    if (width !== undefined && width >= 0 && width <= 4) {
      this.nose.width = width;
    }
    if (height !== undefined && height >= 0 && height <= 4) {
      this.nose.height = height;
    }
  }

  setEye({ color, verticalMargin, horizontalMargin }: { color?: EyeColor, verticalMargin?: number, horizontalMargin?: number }) {
    if (color) {
      this.eye.color = color;
    }
    if (verticalMargin !== undefined && verticalMargin >= -5 && verticalMargin <= 5) {
      this.eye.verticalMargin = verticalMargin;
    }
    if (horizontalMargin !== undefined && horizontalMargin >= -5 && horizontalMargin <= 5) {
      this.eye.horizontalMargin = horizontalMargin;
    }
  }

  setFace({ color, width, height, pointiness }: { color?: FaceColor, width?: number, height?: number, pointiness?: number }) {
    if (color) {
      this.face.color = color;
    }
    if (width !== undefined && width >= 5 && width <= 15) {
      this.face.width = width;
    }
    if (height !== undefined && height >= 5 && height <= 15) {
      this.face.height = height;
    }
    if (pointiness !== undefined && pointiness >= 0 && pointiness <= 5) {
      this.face.pointiness = pointiness;
    }
    this.adjustFaceSize();
  }

  private adjustFaceSize() {
    const widthEven = this.face.width % 2 === 0;
    const heightEven = this.face.height % 2 === 0;
    if (widthEven !== heightEven) {
      this.face.width++;
    }
  }

  private getRandomFaceColor(): FaceColor {
    const colors: FaceColor[] = ['black', 'dark-brown', 'brown', 'light-brown', 'salmon', 'yellow', 'white', 'red'];
    return colors[this.randomNumber(0, colors.length - 1)];
  }

  private getRandomEyeColor(): EyeColor {
    const colors: EyeColor[] = ['black', 'dark-brown', 'light-brown', 'green', 'blue', 'gray'];
    return colors[this.randomNumber(0, colors.length - 1)];
  }

  private getEyeColor() {
    switch (this.eye.color) {
      case 'black': return '#000';
      case 'blue': return '#00a';
      case 'dark-brown': return '#5c3836';
      case 'gray': return '#aaa';
      case 'green': return '#0a0';
      case 'light-brown': return '#ad6452';
    }
  }

  private getFaceColor() {
    switch (this.face.color) {
      case 'black': return '#000';
      case 'dark-brown': return '#5c3836';
      case 'brown': return '#704139';
      case 'light-brown': return '#ad6452';
      case 'red': return '#a01900';
      case 'salmon': return '#ffe0bd';
      case 'white': return '#fff5e1';
      case 'yellow': return '#e3cc88';
    }
  }

  private isEven() {
    return this.getImageSize() % 2 === 0;
  }

  private getImageSize(): number {
    return this.face.height > this.face.width ? this.face.height + 4 : this.face.width + 4;
  }

  private getTopY(): number {
    const size = this.getImageSize();
    return Math.floor((size - this.face.height) / 2);
  }

  private getBottomY(): number {
    return this.getTopY() + this.face.height - 1;
  }

  private getLeftX() {
    const size = this.getImageSize();
    return Math.floor((size - this.face.width) / 2);
  }

  private getRightX() {
    return this.getLeftX() + this.face.width - 1;
  }

  private createFace(): string[][] {
    const sideSize = this.getImageSize();
    const isEven = this.isEven();
    const faceBitMap = [];

    const widthStartIndex = this.getLeftX();
    const widthEndIndex = this.getRightX();
    const heightStartIndex = this.getTopY();
    const heightEndIndex = this.getBottomY();

    for (let i = 0; i < sideSize; i++) {
      faceBitMap.push([]);
      for (let j = 0; j < sideSize; j++) {
        if (j < widthStartIndex || j > widthEndIndex || i < heightStartIndex || i > heightEndIndex) {
          faceBitMap[i][j] = '#fff';
          if (i >= heightEndIndex - 1) {
            if (isEven && (j === sideSize / 2 || j === sideSize / 2 - 1)) {
              faceBitMap[i][j] = this.getFaceColor();
            }
            if (!isEven && (j >= Math.floor(sideSize / 2) - 1 && j <= Math.ceil(sideSize / 2))) {
              faceBitMap[i][j] = this.getFaceColor();
            }
          }
        } else {
          faceBitMap[i][j] = this.getFaceColor();
        }
      }
    }

    let pointinessPercentage = Math.floor(this.face.width * this.face.pointiness / 100);
    let indexY = heightEndIndex;
    while (pointinessPercentage > 0) {
      for (let i = 0; i < pointinessPercentage; i++) {
        faceBitMap[indexY][widthStartIndex + i] = '#fff';
      }

      for (let i = 0; i < pointinessPercentage; i++) {
        faceBitMap[indexY][widthEndIndex - i] = '#fff';
      }
      pointinessPercentage--;
      indexY--;
    }

    let topPointinessPercentage = this.face.width < 8 ? 1 : 2;
    let topIndexY = heightStartIndex;
    while (topPointinessPercentage > 0) {
      for (let i = 0; i < topPointinessPercentage; i++) {
        faceBitMap[topIndexY][widthStartIndex + i] = '#fff';
      }

      for (let i = 0; i < topPointinessPercentage; i++) {
        faceBitMap[topIndexY][widthEndIndex - i] = '#fff';
      }
      topPointinessPercentage--;
      topIndexY++;
    }

    return faceBitMap;
  }

  private addHair(face: string[][]): string[][] {
    const heightStartIndex = this.getTopY() - 1;
    const widthStartIndex = this.getLeftX() - 1;
    const widthEndIndex = this.getRightX() + 1;

    const hairLength = this.hair.length;
    const isLargeFace = this.face.width > 7;

    if (this.hair.style === 'top') {
      const currentY = heightStartIndex + 1;
      for (let i = 0; i < hairLength; i++) {
        let startX = widthStartIndex;
        let endX = widthEndIndex + 1;
  
        if (isLargeFace) {
          startX += 3;
          endX -= 3;
        } else {
          startX += 2;
          endX -= 2;
        }

        for (let j = startX; j < endX; j++) {
          if (currentY - i >= 0 && face[currentY - i][j] === '#fff') {
            face[currentY - i][j] = this.hair.color;
          }
        }
      }
    } else {
      for (let i = 0; i < hairLength; i++) {
        let startX = widthStartIndex;
        let endX = widthEndIndex + 1;
        
        if (i === 0) {
          if (isLargeFace) {
            startX += 3;
            endX -= 3;
          } else {
            startX += 2;
            endX -= 2;
          }
        }
        if (i === 1) {
          if (isLargeFace) {
            startX += 2;
            endX -= 2;
          } else {
            startX += 1;
            endX -= 1;
          }
        }
        if (i === 2 && isLargeFace) {
          startX += 1;
          endX -= 1;
        }
        
        for (let j = startX; j < endX; j++) {
          if (face[heightStartIndex + i][j] === '#fff') {
            face[heightStartIndex + i][j] = this.hair.color;
          }
        }
      }
    }
    
    return face;
  }

  private addEyes(face: string[][]): string[][] {
    const eyeYAxis = this.getBottomY() - Math.floor(this.face.height * 75 / 100) + this.eye.verticalMargin;

    let firstEyeXAxis = this.getRightX() - Math.floor(this.face.width * 30 / 100) + this.eye.horizontalMargin;
    const secondEyeXAxis = this.getRightX() - Math.floor(this.face.width * 70 / 100) - this.eye.horizontalMargin;
    while (firstEyeXAxis - secondEyeXAxis < 2) {
      firstEyeXAxis++;
    }

    face[eyeYAxis][firstEyeXAxis] = 'white';
    face[eyeYAxis][firstEyeXAxis+1] = 'white';
    face[eyeYAxis+1][firstEyeXAxis] = 'white';
    face[eyeYAxis+1][firstEyeXAxis+1] = this.getEyeColor();

    face[eyeYAxis][secondEyeXAxis] = 'white';
    face[eyeYAxis][secondEyeXAxis+1] = 'white';
    face[eyeYAxis+1][secondEyeXAxis] = 'white';
    face[eyeYAxis+1][secondEyeXAxis+1] = this.getEyeColor();
    return face;
  }

  private addNose(face: string[][]): string[][] {
    let noseWidth = Math.round(this.face.width * this.nose.width * 10 / 100);
    let noseHeight = Math.round(this.face.height * this.nose.height * 10 / 100);
    const faceWidthIsEven = this.face.width % 2 === 0;
    const noseIsEven = noseWidth % 2 === 0;
    if (faceWidthIsEven !== noseIsEven) {
      noseWidth++;
    }

    const faceCenter = face.length / 2;
    const noseYAxis = this.getBottomY() - Math.floor(this.face.height * 40 / 100);
    const noseXAxis = Math.floor(faceCenter - (noseWidth / 2));

    const color = this.shadeColor(this.getFaceColor(), -30);
    for (let i = 0; i < noseWidth; i++) {
      face[noseYAxis][noseXAxis + i] = color;
    }
    for (let i = 0; i < noseHeight; i++) {
      face[noseYAxis - i][faceCenter] = color;
    }
    return face;
  }

  private addMouth(face: string[][]): string[][] {
    let mouthWidth = Math.round(this.face.width * this.mouth.width * 10 / 100);
    const faceWidthIsEven = this.face.width % 2 === 0;
    const mouthIsEven = mouthWidth % 2 === 0;
    if (faceWidthIsEven !== mouthIsEven) {
      mouthWidth++;
    }
    const mouthYAxis = this.getBottomY() - Math.floor(this.face.height * 20 / 100);
    const mouthXAxis = Math.floor((face.length / 2) - (mouthWidth / 2));

    for (let i = 0; i < mouthWidth; i++) {
      face[mouthYAxis][mouthXAxis + i] = '#ff0000';
    }
    return face;
  }

  getFace(): string[][] {
    let faceBitMap = this.createFace();
    faceBitMap = this.addHair(faceBitMap);
    faceBitMap = this.addMouth(faceBitMap);
    faceBitMap = this.addNose(faceBitMap);
    faceBitMap = this.addEyes(faceBitMap);
    return faceBitMap;
  }

  exportFaceConfig(): string {
    const object = {
      face: this.face,
      hair: this.hair,
      eye: this.eye,
      nose: this.nose,
      mouth: this.mouth,
    }
    return JSON.stringify(object);
  }

  importFaceConfig(config: string) {
    try {
      const avatar = JSON.parse(config);
      this.setFace(avatar.face);
      this.setHair(avatar.hair);
      this.setNose(avatar.nose);
      this.setMouth(avatar.mouth);
      this.setEye(avatar.eye);
    } catch (err) {
      console.error(err);
    }
  }

  getHTML(): string {
    const faceBitmap = this.getFace();
    let innerHTML = '<style>.row {display: flex;} .block{ width: 10px; height: 10px; }</style>';

    for (let i = 0; i < faceBitmap.length; i++) {
      innerHTML += '<div class="row">';
      for (let j = 0; j < faceBitmap[i].length; j++) {
        innerHTML += `<div class="block" style="background-color:${faceBitmap[i][j]}"></div>`;
      }
      innerHTML += '</div>'
    }
    return innerHTML
  }

  getFullHTML(): string {
    const htmlStart = '<html><body>';
    const htmlEnd = '</body></html>';
    const innerHTML = this.getHTML();

    return htmlStart + innerHTML + htmlEnd;
  }

  getSVG(): string {
    const face = this.getFace();
    let innerSVG = '';

    for (let i = 0; i < face.length; i++) {
      for (let j = 0; j < face[i].length; j++) {
        innerSVG += `<rect fill="${face[i][j]}" x="${j}" y="${i}" width="${this.resolution}" height="${this.resolution}" />`;
      }
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 8" shape-rendering="crispEdges">${innerSVG}</svg>`;
  }

  private randomNumber(min: number = 0, max: number = 10) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private shadeColor(color: string, percent: number) {
    if (color === '#000' && percent < 0) return '#222';
    let R: number = parseInt(color.substring(1,3),16);
    let G: number = parseInt(color.substring(3,5),16);
    let B: number = parseInt(color.substring(5,7),16);

    R = Math.round(R * (100 + percent) / 100);
    G = Math.round(G * (100 + percent) / 100);
    B = Math.round(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
  }
}