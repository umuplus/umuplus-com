function Statue() {
    this.dim = [128, 128];
    this.img = new Image();
    this.img.src = '/img/game/statue.png';
    this.img.onload = this.__render.bind(this);
}

Statue.prototype.setClickHandler = function (fn) {
    this.clickHandler = fn;
}

Statue.prototype.onReady = function (fn) {
    this.readyHandler = fn;
}

Statue.prototype.__render = function () {
    const self = this;
    this.el = $('<div />').css('position', 'absolute')
        .attr('id', 'st_' + Math.random().toString().replace('0.', '').trim())
        .css('top', (window.innerHeight - this.dim[1] * 2) * Math.random() + 'px')
        .css('left', (window.innerWidth - this.dim[0] * 2) * Math.random() + 'px')
        .css('width', this.dim[0] + 'px')
        .css('height', this.dim[1] + 'px')
        .css('background', 'url(' + self.img.src + ')')
        .css('z-index', '999999990')
        .addClass('building');
    this.el.click(function () {
        if (self.clickHandler) self.clickHandler.bind(this)();
    });
    if (self.readyHandler) self.readyHandler();
}
