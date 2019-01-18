var directions = [ 0, 1, 2, 3, 4, 5, 6, 7 ];

function Dragon() {
    this.unit = 400;
    this.direction = 6;
    this.column = 56;
    this.dim = [128, 128];
    this.img = new Image();
    this.img.src = '/img/game/dragon.png';
    this.img.onload = this.onAssetLoaded.bind(this);
}

Dragon.prototype.onAssetLoaded = function () {
    var css = '';
    for (let dir of directions) {
        var top = dir * this.dim[0];
        css += '@-webkit-keyframes dragonSteady' + dir + ' { 0% { background-position: 0px -' +
            top + '; } 100% { background-position: -1024px -' + top + 'px; } }';
        css += '@keyframes dragonSteady' + dir + ' { 0% { background-position: 0px -' +
            top + 'px; } 100% { background-position: -1024px -' + top + 'px; } }';

        css += '@-webkit-keyframes dragonFly' + dir + ' { 0% { background-position: -1024px -' +
            top + '; } 100% { background-position: -2048px -' + top + 'px; } }';
        css += '@keyframes dragonFly' + dir + ' { 0% { background-position: -1024px -' +
            top + 'px; } 100% { background-position: -2048px -' + top + 'px; } }';

        css += '@-webkit-keyframes dragonLand' + dir + ' { 0% { background-position: -2048px -' +
            top + '; } 100% { background-position: -3072px -' + top + 'px; } }';
        css += '@keyframes dragonLand' + dir + ' { 0% { background-position: -2048px -' +
            top + 'px; } 100% { background-position: -3072px -' + top + 'px; } }';
    }
    $('body').append($('<style type="text/css" />').text(css));
    this.__render();
}

Dragon.prototype.setClickHandler = function (fn) {
    this.clickHandler = fn;
}

Dragon.prototype.onReady = function (fn) {
    this.readyHandler = fn;
}

Dragon.prototype.turn = function (dir) {
    if (!dir || directions.indexOf(dir) < 0)
        dir = directions[ Math.floor(Math.random() * directions.length) ];
    this.direction = dir;
}

Dragon.prototype.steady = function (duration) {
    if (!duration) duration = 1;
    this.el
        .css('animation', 'dragonSteady' + this.direction + ' ' + duration + 's steps(8) infinite')
        .css('display', 'block');
}

Dragon.prototype.fly = function (duration) {
    if (!duration) duration = 1;
    this.el
        .css('animation', 'dragonFly' + this.direction + ' ' + duration + 's steps(8) infinite')
        .css('display', 'block');
}

Dragon.prototype.land = function (duration) {
    if (!duration) duration = 1;
    this.el
        .css('animation', 'dragonLand' + this.direction + ' ' + duration + 's steps(8) infinite')
        .css('display', 'block');
}

Dragon.prototype.move = function (to, duration, cb) {
    if (!(to instanceof Array) || to.length !== 2) return;

    this.__turnByCoordinates(to);
    if (!duration) duration = this.__calculateDuration(to);
    this.locked = true;
    var self = this;
    setTimeout(function() { self.locked = false }, duration * 1000);
    self.fly();
    self.el.animate({ left: to[0] + 'px', top: to[1] + 'px' }, duration * 1000,
        function () {
            self.land();
            setTimeout(function () {
                self.steady();
                if (cb) cb();
            }, 800);
        });
}

Dragon.prototype.texture = function (line, column) {
    if (typeof line !== 'number') line = 0;
    if (typeof column !== 'number') column = parseInt(Math.random() * this.column);
    return 'url(' + this.img.src + ') no-repeat -' +
        parseInt(column * this.dim[0]) + 'px -' + parseInt(line * this.dim[1]) + 'px';
}

Dragon.prototype.__calculateDuration = function (to) {
    var diffX = Math.abs(to[0] - this.el.position().left);
    var diffY = Math.abs(to[1] - this.el.position().top);
    var dist = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    var duration = parseFloat((dist / this.unit).toFixed(2));
    return duration > 0.5 ? duration : 0.5;
}

Dragon.prototype.__turnByCoordinates = function (to) {
    if (!(to instanceof Array) || to.length !== 2) return;

    var thresholdX = this.el.width() * 3;
    var thresholdY = this.el.height() * 3;
    var diffX = to[0] - this.el.position().left, absX = Math.abs(diffX);
    var diffY = to[1] - this.el.position().top, absY = Math.abs(diffY);
    if (diffY > 0) { // South
        if (absY > thresholdY) {
            if (diffX > 0) { // East
                if (absX > thresholdX) this.turn(5);
                else this.turn(4);
            } else if (diffX < 0) { // West
                if (absX > thresholdX) this.turn(7);
                else this.turn(0);
            } else this.turn(6);
        } else this.turn(6);
    } else if (diffY < 0) { // North
        if (absY > thresholdY) {
            if (diffX > 0) { // East
                if (absX > thresholdX) this.turn(3);
                else this.turn(4);
            } else if (diffX < 0) { // West
                if (absX > thresholdX) this.turn(1);
                else this.turn(0);
            } else this.turn(2);
        } else this.turn(2);
    } else {
        if (diffX > 0) this.turn(4);
        else if (diffX < 0) this.turn(0);
    }
}

Dragon.prototype.__render = function () {
    const self = this;
    this.el = $('<div />').css('position', 'absolute')
        .attr('id', 'd_' + Math.random().toString().replace('0.', '').trim())
        .css('top', -this.dim[1] + 'px')
        .css('left', -this.dim[0] + 'px')
        .css('width', this.dim[0] + 'px')
        .css('height', this.dim[1] + 'px')
        .css('background', 'url(' + self.img.src + ')')
        .css('display', 'none')
        .css('z-index', '999999999')
        .addClass('dragon');
    this.el.click(function () {
        if (self.clickHandler) self.clickHandler.bind(this)();
    });
    if (self.readyHandler) self.readyHandler();
}
