function TileSet() {
    this.dim = [ 60, 70 ];
    this.spacing = 5;
    this.sprite = '/img/hexagon/tiles.png';
    this._frame = $('<div />').hide()
        .css('position', 'absolute')
        .css('width', this.dim[0] + 'px')
        .css('height', this.dim[1] + 'px')
        .css('left', '-' + Math.pow(this.dim[0], 2) + 'px')
        .css('top', '-' + Math.pow(this.dim[1], 2) + 'px')
        .css('background', 'url(/img/hexagon/frames.png) no-repeat 0 0');
        this._frame.click(() => this._frame.hide());
}

TileSet.prototype.frame = function (pos, on, column) {
    if (typeof on === 'number') {
        column = on;
        on = true;
    }
    if (!on) return this._frame.hide();

    if (column === '*') column = Math.floor(Math.random() * 5);
    if (typeof column !== 'number' || column < 0 || column > 4) column = 0;
    const left = (column * this.dim[0]) + (column * this.spacing);
    this._frame.css('left', pos.left + 'px').css('top', pos.top + 'px')
        .css('background-position-x', -left + 'px');
    this._frame.show();
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

TileSet.prototype.createTile = function (line, column) {
    return $('<div />')
        .css('position', 'absolute')
        .css('width', this.dim[0] + 'px')
        .css('height', this.dim[1] + 'px')
        .css('left', '-' + Math.pow(this.dim[0], 2) + 'px')
        .css('top', '-' + Math.pow(this.dim[1], 2) + 'px')
        .css('background', this.__texture(line, column));
}

TileSet.prototype.border = function (tile, border) {
    if (border === '*') border = Math.floor(Math.random() * 5);
    if (typeof border !== 'number' || border < 0 || border > 4) border = 0;
    tile.css('background-position-x', -((border * this.dim[0]) + (border * this.spacing)) + 'px');
}

TileSet.prototype.nature = function (tile, level) {
    if (level === '*') level = Math.floor(Math.random() * 12) + 5;
    if (typeof level !== 'number' || level < 5 || level > 11) level = 5;
    tile.css('background-position-x', -((level * this.dim[0]) + (level * this.spacing)) + 'px');
}

TileSet.prototype.__texture = function (line, column) {
    if (typeof line !== 'number') line = parseInt(Math.random() * this.spacing);
    if (typeof column !== 'number') column = 4;
    const left = (column * this.dim[0]) + (column * this.spacing);
    const top = (line * this.dim[1]) + (line * this.spacing);
    return 'url(' + this.sprite + ') no-repeat -' + left + 'px -' + top + 'px';
}
