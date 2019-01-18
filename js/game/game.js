function Game(el, terrains) {
    if (!(terrains instanceof Array)) throw new Error('terrains must be an array');

    this.terrains = terrains;
    this.el = $('#' + el);
    if (!this.el.length) throw new Error('invalid container id');
    this.characters = [];
}

Game.prototype.ready = function (cb) {
    $('body > style').remove();
    this.el.empty();
    this.__buildContainer();
    for (let terrain of this.terrains)
        if (terrain instanceof Terrain)
            this.__buildTerrain(terrain.layers);
    cb();
}

Game.prototype.addCharacter = function (character) {
    this.characters.push(character);
    this.el.append(character.el);
    if (this.characters.length === 1)
        this.selectCharacter(character.el.attr('id'));
}

Game.prototype.addWindow = function (w) {
    $('body').append(w.el);
}

Game.prototype.selectCharacter = function (id) {
    for (let character of this.characters)
        if (character.el.attr('id') === id) {
            this.character = character;
            break;
        }
}

Game.prototype.isCloseEnough = function (target) {
    var diffX = Math.abs(target.offsetLeft - this.character.el.position().left);
    var diffY = Math.abs(target.offsetTop - this.character.el.position().top);
    var dist = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    var hypotenuse = Math.sqrt(Math.pow($statue.el.width(), 2) + Math.pow($statue.el.height(), 2));
    return dist < hypotenuse;
}

Game.prototype.__buildTerrain = function (layer) {
    for (let el of layer) {
        if (el instanceof Array) this.__buildTerrain(el);
        else if (el) this.el.append(el);
    }
}

Game.prototype.__buildContainer = function () {
    var dim = this.terrains[0].containerDimensions();
    this.el.css('position', 'absolute')
        .css('left', -this.terrains[0].dim[0] + 'px')
        .css('top', -this.terrains[0].dim[1] + 'px')
        .css('width', dim[0] + 'px')
        .css('height', dim[1] + 'px');
}
