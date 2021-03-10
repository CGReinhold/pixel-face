"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Avatar = /** @class */ (function () {
    function Avatar(config) {
        this.hair = (config === null || config === void 0 ? void 0 : config.hair) || {
            color: '#' + Math.floor(Math.random() * 16777215).toString(16),
            length: this.randomNumber(0, 10),
            style: Math.random() > 0.5 ? 'top' : 'bottom',
        };
        this.eye = (config === null || config === void 0 ? void 0 : config.eye) || {
            color: this.getRandomEyeColor(),
            verticalMargin: this.randomNumber(-2, 2),
            horizontalMargin: this.randomNumber(0, 2),
        };
        this.face = (config === null || config === void 0 ? void 0 : config.face) || {
            color: this.getRandomFaceColor(),
            width: this.randomNumber(5, 15),
            height: this.randomNumber(5, 15),
            pointiness: this.randomNumber(0, 30),
        };
        this.mouth = (config === null || config === void 0 ? void 0 : config.mouth) || {
            width: this.randomNumber(1, 5),
        };
        this.nose = (config === null || config === void 0 ? void 0 : config.nose) || {
            width: this.randomNumber(0, 3),
            height: this.randomNumber(0, 5),
        };
        this.resolution = (config === null || config === void 0 ? void 0 : config.resolution) || this.randomNumber(1, 10);
        this.adjustFaceSize();
    }
    Avatar.prototype.setHair = function (_a) {
        var color = _a.color, length = _a.length, style = _a.style;
        if (color) {
            this.hair.color = color;
        }
        if (length !== undefined && length >= 0 && length <= 5) {
            this.hair.length = length;
        }
        if (style !== undefined) {
            this.hair.style = style;
        }
    };
    Avatar.prototype.setResolution = function (resolution) {
        if (resolution >= 1 && resolution <= 10) {
            this.resolution = resolution;
        }
    };
    Avatar.prototype.setMouth = function (_a) {
        var width = _a.width;
        if (width >= 0 && width <= 5) {
            this.mouth.width = width;
        }
    };
    Avatar.prototype.setNose = function (_a) {
        var width = _a.width, height = _a.height;
        if (width !== undefined && width >= 0 && width <= 4) {
            this.nose.width = width;
        }
        if (height !== undefined && height >= 0 && height <= 4) {
            this.nose.height = height;
        }
    };
    Avatar.prototype.setEye = function (_a) {
        var color = _a.color, verticalMargin = _a.verticalMargin, horizontalMargin = _a.horizontalMargin;
        if (color) {
            this.eye.color = color;
        }
        if (verticalMargin !== undefined && verticalMargin >= -5 && verticalMargin <= 5) {
            this.eye.verticalMargin = verticalMargin;
        }
        if (horizontalMargin !== undefined && horizontalMargin >= -5 && horizontalMargin <= 5) {
            this.eye.horizontalMargin = horizontalMargin;
        }
    };
    Avatar.prototype.setFace = function (_a) {
        var color = _a.color, width = _a.width, height = _a.height, pointiness = _a.pointiness;
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
    };
    Avatar.prototype.adjustFaceSize = function () {
        var widthEven = this.face.width % 2 === 0;
        var heightEven = this.face.height % 2 === 0;
        if (widthEven !== heightEven) {
            this.face.width++;
        }
    };
    Avatar.prototype.getRandomFaceColor = function () {
        var colors = ['black', 'dark-brown', 'brown', 'light-brown', 'salmon', 'yellow', 'white', 'red'];
        return colors[this.randomNumber(0, colors.length - 1)];
    };
    Avatar.prototype.getRandomEyeColor = function () {
        var colors = ['black', 'dark-brown', 'light-brown', 'green', 'blue', 'gray'];
        return colors[this.randomNumber(0, colors.length - 1)];
    };
    Avatar.prototype.getEyeColor = function () {
        switch (this.eye.color) {
            case 'black': return '#000';
            case 'blue': return '#00a';
            case 'dark-brown': return '#5c3836';
            case 'gray': return '#aaa';
            case 'green': return '#0a0';
            case 'light-brown': return '#ad6452';
        }
    };
    Avatar.prototype.getFaceColor = function () {
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
    };
    Avatar.prototype.isEven = function () {
        return this.getImageSize() % 2 === 0;
    };
    Avatar.prototype.getImageSize = function () {
        return this.face.height > this.face.width ? this.face.height + 4 : this.face.width + 4;
    };
    Avatar.prototype.getTopY = function () {
        var size = this.getImageSize();
        return Math.floor((size - this.face.height) / 2);
    };
    Avatar.prototype.getBottomY = function () {
        return this.getTopY() + this.face.height - 1;
    };
    Avatar.prototype.getLeftX = function () {
        var size = this.getImageSize();
        return Math.floor((size - this.face.width) / 2);
    };
    Avatar.prototype.getRightX = function () {
        return this.getLeftX() + this.face.width - 1;
    };
    Avatar.prototype.createFace = function () {
        var sideSize = this.getImageSize();
        var isEven = this.isEven();
        var faceBitMap = [];
        var widthStartIndex = this.getLeftX();
        var widthEndIndex = this.getRightX();
        var heightStartIndex = this.getTopY();
        var heightEndIndex = this.getBottomY();
        for (var i = 0; i < sideSize; i++) {
            faceBitMap.push([]);
            for (var j = 0; j < sideSize; j++) {
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
                }
                else {
                    faceBitMap[i][j] = this.getFaceColor();
                }
            }
        }
        var pointinessPercentage = Math.floor(this.face.width * this.face.pointiness / 100);
        var indexY = heightEndIndex;
        while (pointinessPercentage > 0) {
            for (var i = 0; i < pointinessPercentage; i++) {
                faceBitMap[indexY][widthStartIndex + i] = '#fff';
            }
            for (var i = 0; i < pointinessPercentage; i++) {
                faceBitMap[indexY][widthEndIndex - i] = '#fff';
            }
            pointinessPercentage--;
            indexY--;
        }
        var topPointinessPercentage = this.face.width < 8 ? 1 : 2;
        var topIndexY = heightStartIndex;
        while (topPointinessPercentage > 0) {
            for (var i = 0; i < topPointinessPercentage; i++) {
                faceBitMap[topIndexY][widthStartIndex + i] = '#fff';
            }
            for (var i = 0; i < topPointinessPercentage; i++) {
                faceBitMap[topIndexY][widthEndIndex - i] = '#fff';
            }
            topPointinessPercentage--;
            topIndexY++;
        }
        return faceBitMap;
    };
    Avatar.prototype.addHair = function (face) {
        var heightStartIndex = this.getTopY() - 1;
        var widthStartIndex = this.getLeftX() - 1;
        var widthEndIndex = this.getRightX() + 1;
        var hairLength = this.hair.length;
        var isLargeFace = this.face.width > 7;
        if (this.hair.style === 'top') {
            var currentY = heightStartIndex + 1;
            for (var i = 0; i < hairLength; i++) {
                var startX = widthStartIndex;
                var endX = widthEndIndex + 1;
                if (isLargeFace) {
                    startX += 3;
                    endX -= 3;
                }
                else {
                    startX += 2;
                    endX -= 2;
                }
                for (var j = startX; j < endX; j++) {
                    if (currentY - i >= 0 && face[currentY - i][j] === '#fff') {
                        face[currentY - i][j] = this.hair.color;
                    }
                }
            }
        }
        else {
            for (var i = 0; i < hairLength; i++) {
                var startX = widthStartIndex;
                var endX = widthEndIndex + 1;
                if (i === 0) {
                    if (isLargeFace) {
                        startX += 3;
                        endX -= 3;
                    }
                    else {
                        startX += 2;
                        endX -= 2;
                    }
                }
                if (i === 1) {
                    if (isLargeFace) {
                        startX += 2;
                        endX -= 2;
                    }
                    else {
                        startX += 1;
                        endX -= 1;
                    }
                }
                if (i === 2 && isLargeFace) {
                    startX += 1;
                    endX -= 1;
                }
                for (var j = startX; j < endX; j++) {
                    if (face[heightStartIndex + i][j] === '#fff') {
                        face[heightStartIndex + i][j] = this.hair.color;
                    }
                }
            }
        }
        return face;
    };
    Avatar.prototype.addEyes = function (face) {
        var eyeYAxis = this.getBottomY() - Math.floor(this.face.height * 75 / 100) + this.eye.verticalMargin;
        var firstEyeXAxis = this.getRightX() - Math.floor(this.face.width * 30 / 100) + this.eye.horizontalMargin;
        var secondEyeXAxis = this.getRightX() - Math.floor(this.face.width * 70 / 100) - this.eye.horizontalMargin;
        while (firstEyeXAxis - secondEyeXAxis < 2) {
            firstEyeXAxis++;
        }
        face[eyeYAxis][firstEyeXAxis] = 'white';
        face[eyeYAxis][firstEyeXAxis + 1] = 'white';
        face[eyeYAxis + 1][firstEyeXAxis] = 'white';
        face[eyeYAxis + 1][firstEyeXAxis + 1] = this.getEyeColor();
        face[eyeYAxis][secondEyeXAxis] = 'white';
        face[eyeYAxis][secondEyeXAxis + 1] = 'white';
        face[eyeYAxis + 1][secondEyeXAxis] = 'white';
        face[eyeYAxis + 1][secondEyeXAxis + 1] = this.getEyeColor();
        return face;
    };
    Avatar.prototype.addNose = function (face) {
        var noseWidth = Math.round(this.face.width * this.nose.width * 10 / 100);
        var noseHeight = Math.round(this.face.height * this.nose.height * 10 / 100);
        var faceWidthIsEven = this.face.width % 2 === 0;
        var noseIsEven = noseWidth % 2 === 0;
        if (faceWidthIsEven !== noseIsEven) {
            noseWidth++;
        }
        var faceCenter = face.length / 2;
        var noseYAxis = this.getBottomY() - Math.floor(this.face.height * 40 / 100);
        var noseXAxis = Math.floor(faceCenter - (noseWidth / 2));
        var color = this.shadeColor(this.getFaceColor(), -30);
        for (var i = 0; i < noseWidth; i++) {
            face[noseYAxis][noseXAxis + i] = color;
        }
        for (var i = 0; i < noseHeight; i++) {
            face[noseYAxis - i][faceCenter] = color;
        }
        return face;
    };
    Avatar.prototype.addMouth = function (face) {
        var mouthWidth = Math.round(this.face.width * this.mouth.width * 10 / 100);
        var faceWidthIsEven = this.face.width % 2 === 0;
        var mouthIsEven = mouthWidth % 2 === 0;
        if (faceWidthIsEven !== mouthIsEven) {
            mouthWidth++;
        }
        var mouthYAxis = this.getBottomY() - Math.floor(this.face.height * 20 / 100);
        var mouthXAxis = Math.floor((face.length / 2) - (mouthWidth / 2));
        for (var i = 0; i < mouthWidth; i++) {
            face[mouthYAxis][mouthXAxis + i] = '#ff0000';
        }
        return face;
    };
    Avatar.prototype.getFace = function () {
        var faceBitMap = this.createFace();
        faceBitMap = this.addHair(faceBitMap);
        faceBitMap = this.addMouth(faceBitMap);
        faceBitMap = this.addNose(faceBitMap);
        faceBitMap = this.addEyes(faceBitMap);
        return faceBitMap;
    };
    Avatar.prototype.exportFaceConfig = function () {
        var object = {
            face: this.face,
            hair: this.hair,
            eye: this.eye,
            nose: this.nose,
            mouth: this.mouth,
        };
        return JSON.stringify(object);
    };
    Avatar.prototype.importFaceConfig = function (config) {
        try {
            var avatar = JSON.parse(config);
            this.setFace(avatar.face);
            this.setHair(avatar.hair);
            this.setNose(avatar.nose);
            this.setMouth(avatar.mouth);
            this.setEye(avatar.eye);
        }
        catch (err) {
            console.error(err);
        }
    };
    Avatar.prototype.getHTML = function () {
        var faceBitmap = this.getFace();
        var innerHTML = '<style>.row {display: flex;} .block{ width: 10px; height: 10px; }</style>';
        for (var i = 0; i < faceBitmap.length; i++) {
            innerHTML += '<div class="row">';
            for (var j = 0; j < faceBitmap[i].length; j++) {
                innerHTML += "<div class=\"block\" style=\"background-color:" + faceBitmap[i][j] + "\"></div>";
            }
            innerHTML += '</div>';
        }
        return innerHTML;
    };
    Avatar.prototype.getFullHTML = function () {
        var htmlStart = '<html><body>';
        var htmlEnd = '</body></html>';
        var innerHTML = this.getHTML();
        return htmlStart + innerHTML + htmlEnd;
    };
    Avatar.prototype.getSVG = function () {
        var face = this.getFace();
        var innerSVG = '';
        for (var i = 0; i < face.length; i++) {
            for (var j = 0; j < face[i].length; j++) {
                innerSVG += "<rect fill=\"" + face[i][j] + "\" x=\"" + j + "\" y=\"" + i + "\" width=\"" + this.resolution + "\" height=\"" + this.resolution + "\" />";
            }
        }
        return "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 7 8\" shape-rendering=\"crispEdges\">" + innerSVG + "</svg>";
    };
    Avatar.prototype.randomNumber = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 10; }
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    Avatar.prototype.shadeColor = function (color, percent) {
        if (color === '#000' && percent < 0)
            return '#222';
        var R = parseInt(color.substring(1, 3), 16);
        var G = parseInt(color.substring(3, 5), 16);
        var B = parseInt(color.substring(5, 7), 16);
        R = Math.round(R * (100 + percent) / 100);
        G = Math.round(G * (100 + percent) / 100);
        B = Math.round(B * (100 + percent) / 100);
        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;
        var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
        var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
        var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));
        return "#" + RR + GG + BB;
    };
    return Avatar;
}());
exports.default = Avatar;
