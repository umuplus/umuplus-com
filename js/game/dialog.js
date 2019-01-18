function Dialog() {
    this.dim = [640, 96];
    this.img = new Image();
    this.img.src = '/img/game/dialog.png';
    this.img.onload = this.__render.bind(this);
}

Dialog.prototype.setClickHandler = function (fn) {
    this.clickHandler = fn;
}

Dialog.prototype.onReady = function (fn) {
    this.readyHandler = fn;
}

Dialog.prototype.write = function (txt, delay, cb) {
    if (this.locked) return;

    if (typeof delay === 'function') {
        cb = delay;
        delay = 1200;
    }

    if (typeof delay !== 'number' || typeof cb === 'function') {
        delay = 1200;
        cb = function () {};
    }

    this.locked = true;
    this.__text(txt, delay, cb);
}

Dialog.prototype.__text = function (txt, delay, cb) {
    if (!txt || !txt.length) {
        this.el.fadeOut('slow');
        this.locked = false;
        return cb();
    }

    this.el.empty().html($('<div />').addClass('ml13').text(txt.shift())).fadeIn('slow');

    $('.ml13').each(function(){
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    var self = this;
    anime.timeline({loop: false})
        .add({
            targets: '.ml13 .letter',
            translateY: [ 100, 0 ],
            translateZ: 0,
            opacity: [ 0, 1 ],
            easing: 'easeOutExpo',
            duration: 1400,
            delay: function(el, i) {
                return 300 + 30 * i;
            }
        })
        .add({
            targets: '.ml13 .letter',
            opacity: [ 1, 1 ],
            duration: delay
        })
        .add({
            targets: '.ml13 .letter',
            translateY: [ 0, -100 ],
            opacity: [ 1, 0 ],
            easing: 'easeInExpo',
            duration: 1200,
            delay: function(el, i) {
                return 100 + 30 * i;
            },
            complete: function () {
                self.__text(txt, delay, cb);
            }
        });
}

Dialog.prototype.__render = function () {
    const self = this;
    this.el = $('<div />').css('position', 'absolute')
        .attr('id', 'w_' + Math.random().toString().replace('0.', '').trim())
        .css('bottom', '40px')
        .css('left', '20px')
        .css('width', this.dim[0] + 'px')
        .css('height', this.dim[1] + 'px')
        .css('background', 'url(' + self.img.src + ')')
        .css('z-index', '9999999999')
        .addClass('dialog');
    this.el.hide();
    this.el.click(function () {
        if (self.clickHandler) self.clickHandler.bind(this)();
    });
    if (self.readyHandler) self.readyHandler();
}
