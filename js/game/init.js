var $game, $dragon, $dialog;

jQuery(function ($) {
    $(window).resize(renderGame);
    renderGame();
});

var $statue = new Statue();
$statue.setClickHandler(function () {
    if (!$game.isCloseEnough(this))
        $dialog.write([
            'You seem to be away from your target',
            'Please get closer then click again'
        ]);
    else
        $dialog.write([
            'Software development has always been my best hobby and also my dream job since I was 14',
            'Now, after more than 14 years as a professional, I can honestly say that dealing with a real-life problem to bring a 2-digits solution in a form of software architecture is a pure passion to me',
            'Not just making it "work", also making it work right and stable',
            'Because of that approach, I always design for what\'s coming instead of what it\'s at the moment',
            'The curiosity and the interest of problem solving which got me into "coding", are still leading my career path but above all that, there is connectivity and the data',
            'That\'s why I have been choosing to be a part of data-oriented projects which require high concurrency such as online advertising, online gaming and finally IoT in my last 5 years',
            'I believe that being a professional requires 2 elements in the core: information and experience',
            'Information part has to keep growing in balance. Because, the technology doesn\'t stop.',
            'And experience part is not about the time you spent in tech business. It\'s mostly what you have collected into your bag from earlier projects',
            'It\'s about what you\'re ready for. And when you have your hobby as a work title, you feel ready for almost anything'
        ]);
});
var $sarcophagus = new Sarcophagus();
$sarcophagus.setClickHandler(function () {
    if (!$game.isCloseEnough(this))
        $dialog.write([
            'You seem to be away from your target',
            'Please get closer then click again'
        ]);
    else
        $dialog.write([
            'Please leave me alone for awhile'
        ]);
});
$dialog = new Dialog();
var $terrain = new Terrain('terrain', 'land');

function renderGame() {
    $dragon = new Dragon();

    $terrain.addLayer(function () {
        $game.character.move([ this.offsetLeft - this.offsetWidth - ($dragon.el.width() / 4),
            this.offsetTop - this.offsetHeight - ($dragon.el.height() / 2) ]);
    });

    var $stuff = new Terrain('stuff', [ 64, 64 ], 'land');
    $stuff.addLayer([ 5, 1, 8 ]);
    $stuff.addLayer([ 4, 1 ]);

    $game = new Game('game-container', [ $terrain, $stuff ]);
    $game.ready(function () {
        $dragon.onReady(function () {
            $dragon.setClickHandler(function () {
                $game.selectCharacter($dragon.el.attr('id'));
            });

            $game.addCharacter($dragon);
            $game.addCharacter($statue);
            $game.addCharacter($sarcophagus)

            // TODO: apply splash screen
            $game.addWindow($dialog);

            $dialog.write([
                'Hello fellow stranger',
                'Welcome to my ancient playground',
                'That little dragon is at your service',
                'Please feel free to move it around'
            ]);

            $game.character.move([ (window.innerWidth - $game.character.dim[0]) / 2,
                (window.innerHeight - $game.character.dim[1]) / 2 ], 0, function () {
                    $game.character.turn(6);
                    $game.character.steady();
                });
        });
    });
}
