function TileSet() {
    this.dim = [ 60, 70 ];
    this.spacing = 5;
    this.img = new Image();
    this.img.src = '/img/hexagon/tiles.png';
}

TileSet.prototype.createGrass = function () {
    return this.createTile(0, 0);
}

TileSet.prototype.createSoil = function () {
    return this.createTile(1, 0);
}

TileSet.prototype.createSand = function () {
    return this.createTile(2, 0);
}

TileSet.prototype.createRedSoil = function () {
    return this.createTile(3, 0);
}

TileSet.prototype.createConcrete = function () {
    return this.createTile(4, 0);
}

TileSet.prototype.border = function (tile, border) {
    if (border === '*') border = Math.floor(Math.random() * 5);
    if (typeof border !== 'number' || border < 0 || border > 4) border = 0;
    tile.css('background-position-x', -((border * this.dim[0]) + (border * this.spacing)) + 'px');
}

TileSet.prototype.nature = function (tile, level) {
    if (level === '*') level = Math.floor(Math.random() * 9) + 5;
    if (typeof level !== 'number' || level < 5 || level > 8) level = 5;
    tile.css('background-position-x', -((level * this.dim[0]) + (level * this.spacing)) + 'px');
}

TileSet.prototype.createTile = function (line, column) {
    return $('<div />')
        .css('position', 'absolute')
        .css('width', this.dim[0] + 'px')
        .css('height', this.dim[1] + 'px')
        .css('left', '-' + Math.pow(this.dim[0], 2) + 'px')
        .css('top', '-' + Math.pow(this.dim[1], 2) + 'px')
        .css('background', this.__texture(line, column));
}

TileSet.prototype.__texture = function (line, column) {
    if (typeof line !== 'number') line = parseInt(Math.random() * this.spacing);
    if (typeof column !== 'number') column = 4;
    const left = (column * this.dim[0]) + (column * this.spacing);
    const top = (line * this.dim[1]) + (line * this.spacing);
    return 'url(' + this.img.src + ') no-repeat -' + left + 'px -' + top + 'px';
}
