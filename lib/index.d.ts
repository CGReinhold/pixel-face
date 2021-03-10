declare type HairStyle = 'bottom' | 'top';
interface Hair {
    color: string;
    length: number;
    style: HairStyle;
}
declare type EyeColor = 'black' | 'dark-brown' | 'light-brown' | 'green' | 'blue' | 'gray';
interface Eye {
    color: EyeColor;
    verticalMargin: number;
    horizontalMargin: number;
}
declare type FaceColor = 'black' | 'dark-brown' | 'brown' | 'light-brown' | 'salmon' | 'yellow' | 'white' | 'red';
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
export default class Avatar {
    private hair;
    private eye;
    private face;
    private mouth;
    private nose;
    private resolution;
    constructor(config: {
        eye?: Eye;
        hair?: Hair;
        face?: Face;
        mouth?: Mouth;
        nose?: Nose;
        resolution?: number;
    } | undefined);
    setHair({ color, length, style }: {
        color?: string;
        length?: number;
        style?: HairStyle;
    }): void;
    setResolution(resolution: number): void;
    setMouth({ width }: {
        width: number;
    }): void;
    setNose({ width, height }: {
        width?: number;
        height?: number;
    }): void;
    setEye({ color, verticalMargin, horizontalMargin }: {
        color?: EyeColor;
        verticalMargin?: number;
        horizontalMargin?: number;
    }): void;
    setFace({ color, width, height, pointiness }: {
        color?: FaceColor;
        width?: number;
        height?: number;
        pointiness?: number;
    }): void;
    private adjustFaceSize;
    private getRandomFaceColor;
    private getRandomEyeColor;
    private getEyeColor;
    private getFaceColor;
    private isEven;
    private getImageSize;
    private getTopY;
    private getBottomY;
    private getLeftX;
    private getRightX;
    private createFace;
    private addHair;
    private addEyes;
    private addNose;
    private addMouth;
    getFace(): string[][];
    exportFaceConfig(): string;
    importFaceConfig(config: string): void;
    getHTML(): string;
    getFullHTML(): string;
    getSVG(): string;
    private randomNumber;
    private shadeColor;
}
export {};
