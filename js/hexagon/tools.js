class Tools {
    constructor() {
        this.dim = [ 60, 70 ];
        this.spacing = 5;
        this.sprite = '/img/hexagon/tiles.png';
        this.left = this.__createTile(0, 0);
        this.right = this.__createTile(0, 0);
    }

    render(container) {
        if (!(container instanceof jQuery))
            throw new Error('container must be a jquery instance');

        container.append(this.left);
        container.append(this.right);
        container.append($('<hr style="border: solid 1px #14396a; clear: both;">'));

        let i = 0;
        for (let y = 0 ; y < 10 ; y++)
            for (let x = 0 ; x < 13 ; x++) {
                const el = this.__createTile(y, x);
                if (i % 4 === 0) el.css('clear', 'left');
                el.click(() => {
                    this.left
                        .css('background-position-x', el.css('background-position-x'))
                        .css('background-position-y', el.css('background-position-y'));
                });
                el.contextmenu(e => {
                    e.preventDefault();
                    this.right
                        .css('background-position-x', el.css('background-position-x'))
                        .css('background-position-y', el.css('background-position-y'));
                });
                container.append(el);
                i++;
            }
    }

    __createTile(line, column) {
        return $('<div />').css('float', 'left')
            .css('width', this.dim[0] + 'px')
            .css('height', this.dim[1] + 'px')
            .css('background', this.__texture(line, column))
            .addClass('tool');
    }

    __texture(line, column) {
        if (typeof line !== 'number') line = parseInt(Math.random() * this.spacing);
        if (typeof column !== 'number') column = 4;
        const left = (column * this.dim[0]) + (column * this.spacing);
        const top = (line * this.dim[1]) + (line * this.spacing);
        return 'url(' + this.sprite + ') no-repeat -' + left + 'px -' + top + 'px';
    }
}
