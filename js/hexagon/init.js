let $game, $terrain, $tools;

jQuery(function ($) {
    $('li > a').click(function () {
        const el = $(this), target = $('#' + el.data('target'));
        if (el.hasClass('btn')) {
            el.removeClass('btn').addClass('abtn');
        } else {
            el.removeClass('abtn').addClass('btn');
        }
        target.toggle();
    });

    $tools = new Tools();
    $tools.render($('#tools'));

    $(window).resize(renderGame);
    renderGame();
});

function renderGame() {
    $terrain = new Terrain();
    $terrain.addLayer({
        click: function(el) {
            el.css('background-position-x', $tools.left.css('background-position-x'));
            el.css('background-position-y', $tools.left.css('background-position-y'));
        },
        contextmenu: function(el, event) {
            event.preventDefault();
            el.css('background-position-x', $tools.right.css('background-position-x'));
            el.css('background-position-y', $tools.right.css('background-position-y'));
        }
    });

    $game = new Game('game-container', [ $terrain ]);
    $game.ready(function () {
        console.log('ready');
    });
}
