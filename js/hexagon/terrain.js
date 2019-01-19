function Terrain(dim, ts) {
    this.dim = dim instanceof Array && dim.length === 2 ? dim : [ 16, 10 ];
    this.tileset = ts instanceof TileSet ? ts : new TileSet();
    this.width = (this.dim[0] * this.tileset.dim[0]) + (this.tileset.dim[0] / 2);
    this.height = (this.dim[1] * this.tileset.dim[1]) - ((this.dim[1] - 1) * 18);
    this.layers = [];
}

Terrain.prototype.addLayer = function (tile, click, mover) {
    if (typeof tile === 'function') {
        mover = click;
        click = tile;
        tile = this.tileset.createGrass();
    }
    let line = 0;
    const layer = [];
    for (let y = 0 ; y < this.dim[1] ; y++) {
        const row = [];
        for (let x = 0 ; x < this.dim[0] ; x++) {
            const el = tile.clone();
            const top = (y * this.tileset.dim[1]) - (y ? y * 18 : 0);
            const left = (x * this.tileset.dim[0]) + (y % 2 ? this.tileset.dim[0] / 2 : 0);
            const coord = [ line, y % 2 ? x * 2 + 1 : x * 2 ];
            el.attr('id', 'L' + this.layers.length + '_' + coord[0] + 'x' + coord[1])
                .css('top', top + 'px').css('left', left + 'px');
            this.tileset.nature(el, '*');
            if (click) el.click(function () {
                click.bind(this)(el);
            });
            if (typeof mover === 'object') {
                if (mover.in) el.mouseover(function () {
                    mover.in(el, this);
                });
                if (mover.out) el.mouseout(function () {
                    mover.out(el, this);
                });
            }
            row.push(el);
        }
        layer.push(row);
        if (y % 2) line++;
    }
    this.layers.push(layer);
}
