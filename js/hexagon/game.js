function Game(el, terrains) {
    if (!(terrains instanceof Array)) throw new Error('terrains must be an array');

    this.el = $('#' + el);
    if (!this.el.length) throw new Error('invalid container id');
    this.terrains = terrains;
}

Game.prototype.ready = function (cb) {
    this.el.empty().css('position', 'absolute').css('float', 'left').hide();
    for (let terrain of this.terrains)
        if (terrain instanceof Terrain) {
            this.__buildTerrain(terrain.layers);
            this.el.append(terrain.tileset._frame);
        }
    this.el.css('width', this.terrains[0].width + 'px')
        .css('height', this.terrains[0].height + 'px')
        .css('left', (window.innerWidth - this.el.width()) / 2)
        .css('top', (window.innerHeight - this.el.height()) / 2)
        .fadeIn('slow');
    if (cb) cb();
}

Game.prototype.__buildTerrain = function (layer) {
    for (let el of layer)
        if (el instanceof Array) this.__buildTerrain(el);
        else if (el) this.el.append(el);
}
