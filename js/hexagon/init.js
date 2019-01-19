let $game, $terrain;

jQuery(function ($) {
    $(window).resize(renderGame);
    renderGame();
});

function renderGame() {
    $terrain = new Terrain();
    $terrain.addLayer(function(el) {
        console.log(this.offsetLeft, this.offsetTop);
    }, {
        in: function(el) {
            $terrain.tileset.border(el, 4);
        },
        out: function(el) {
            $terrain.tileset.border(el);
        }
    });

    $game = new Game('game-container', [ $terrain ]);
    $game.ready(function () {
        console.log('ready');
    });
}
