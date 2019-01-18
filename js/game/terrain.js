function Terrain(cls, dim, theme) {
    this.cls = cls;
    if (theme === undefined && typeof dim === 'string') {
        theme = dim;
        dim = null;
    }
    this.layers = [];
    this.theme = theme;
    this.column = 15;
    if (!(dim instanceof Array) || dim.length !== 2) dim = [64, 32];
    this.dim = dim;
}

Terrain.prototype.addLayer = function (line, fn) {
    if (typeof line === 'function') {
        fn = line;
        line = undefined;
    }
    if (!(line instanceof Array) || line.length < 2) line = [undefined, 100, 15];
    if (line[2]) this.column = line[2];
    var layer = [ [] ], i = 0, w = 0, h = 0, x = 0;
    var dim = this.containerDimensions();
    do {
        var el = null, fill = parseInt(Math.random() * 100) + 1 <= line[1];
        if (fill) {
            el = $('<div />').css('position', 'absolute')
                    .addClass(this.cls)
                    .attr('id', 't_' + x + '_' + i + '_' + this.layers.length)
                    .css('width', this.dim[0] + 'px')
                    .css('height', this.dim[1] + 'px')
                    .css('top', (i * this.dim[1] / 2) + 'px')
                    .css('left', (x * this.dim[0] - (i % 2 ? 0 : this.dim[0] / 2)) + 'px')
                    .css('background', this.texture(line[0]));
            if (fn) el.click(fn);
        }
        layer[i].push(el);
        w += this.dim[0];
        x++;
        if (w >= dim[0]) {
            layer.push([]);
            i++;
            h = i * this.dim[1];
            w = this.dim[0];
            x = 0;
        }
    } while (w <= dim[0] && h <= dim[1]);
    this.layers.push(layer);
}

Terrain.prototype.texture = function (line, column) {
    if (typeof line !== 'number') line = 0;
    if (typeof column !== 'number') column = this.dim[0] * parseInt(Math.random() * this.column);
    return 'url(/img/game/' + this.theme + '.png) no-repeat -' +
        column + 'px -' + parseInt(line * this.dim[1]) + 'px';
}

Terrain.prototype.containerDimensions = function () {
    return [ window.innerWidth * 1.2, window.innerHeight * 2.2 ];
}
