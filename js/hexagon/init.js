let $game, $terrain;

jQuery(function ($) {
    $(window).resize(renderGame);
    renderGame();
});

function renderGame() {
    $terrain = new Terrain();
    $terrain.addLayer({
        click: function(el) {
            $terrain.tileset.frame(el.position(), 4);
        }
    });

    $game = new Game('game-container', [ $terrain ]);
    $game.ready(function () {
        console.log('ready');
    });
}
