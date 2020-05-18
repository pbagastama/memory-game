// All usefull objects and shortcuts to simplify coding
let objects1 = [
    'bicycle', 'bicycle',
    'leaf', 'leaf'
];

let objects2 = [
    'bicycle', 'bicycle',
    'leaf', 'leaf',
    'paper-plane-o', 'paper-plane-o',
    'bolt', 'bolt'
];

let objects3 = [
    'bicycle', 'bicycle',
    'leaf', 'leaf',
    'paper-plane-o', 'paper-plane-o',
    'bolt', 'bolt',
    'bomb', 'bomb',
    'diamond', 'diamond'
];

// Useful selectors shortened
$container = $('.container');
$matched = $('.matched');
$restart = $('.restart');
$deck = $('.deck');
$deck2 = $('.deck.deck-8');
$deck3 = $('.deck.deck-12');

// Set variables to shorten code
let stageNumber = 1;
let allOpen = [];
let match = 0;
let koin = 0;
let totalKoin = 0;
let finalKoin = 0;
let wait = 420;
let totalCard1 = objects1.length / 2;
let totalCard2 = objects2.length / 2;
let totalCard3 = objects3.length / 2;


// Shuffling function: enables that no two games have the same card arrangement 
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Start the game to begin
function startOne() {
    $('.deck.deck-12').addClass('hidden');
    $('.deck.deck-4').removeClass('hidden');
    let allCards = shuffle(objects1);
    $deck.empty();
    match = 0;
    totalKoin = 0;
    finalKoin = 0;
    $matched.html(match);

    for (let i = 0; i < allCards.length; i++) {
        $deck.append($('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>'))
    }
    addCardListener();
}

function startTwo() {
    $('.deck.deck-4').addClass('hidden');
    $('.deck.deck-8').removeClass('hidden');

    let allCards = shuffle(objects2);
    $deck2.empty();
    koin = match;
    $matched.html(koin);
    console.log('Total Koin Awal Stage 2 = ' + koin);
    match = 0; 

    for (let i = 0; i < allCards.length; i++) {
        $deck2.append($('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>'))
    }
    addCardListener2();
}

function startThree() {
    $('.deck.deck-8').addClass('hidden');
    $('.deck.deck-12').removeClass('hidden');

    let allCards = shuffle(objects3);
    $deck3.empty();
    $matched.html(totalKoin);
    console.log('Total Koin Awal Stage 3 = ' + totalKoin);
    match = 0; 

    for (let i = 0; i < allCards.length; i++) {
        $deck3.append($('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>'))
    }
    addCardListener3();
}

// End Game
function gameOver(match) {
    $('#winnerText').text(`You Win, ${match} Poin. Well done!`);
    $('#winnerModal').modal('toggle');
}

// Reset when click
$restart.bind('click', function (confirmed) {
    if (confirmed) {
        startOne();
        match = 0
        totalKoin = 0;
        finalKoin = 0;
        $('.deck.deck-4').removeClass('hidden');
        $('.deck.deck-8').addClass('hidden');
        $('.deck.deck-12').addClass('hidden');
    }
});


// Add Card On Stage 1
let addCardListener = function () {

    // With the following, the card that is clicked on is flipped
    $deck.find('.card').bind('click', function () {
        let $this = $(this);
        if ($this.hasClass('show') || $this.hasClass('match')) {
            return true;
        }

        let card = $this.context.innerHTML;
        $this.addClass('open show');
        allOpen.push(card);

        if (allOpen.length > 1) {
            if (card === allOpen[0]) {
                $deck.find('.open').addClass('match');
                setTimeout(function () {
                    $deck.find('open').removeClass('open show');
                }, wait);
                match++;
            } else {
                $deck.find('.open').addClass('notmatch');
                setTimeout(function () {
                    $deck.find('.open').removeClass('open show');
                }, wait / 1.5);
            }

            allOpen = [];
            $matched.html(match)
        }

        if (totalCard1 === match) {
            setTimeout(function () {
                gameOver(match);
                // startTwo();
            }, 500);
        }
    });
}

// Add Card On Stage 2
let addCardListener2 = function () {

    // With the following, the card that is clicked on is flipped
    $deck2.find('.card').bind('click', function () {
        let $this = $(this);
        if ($this.hasClass('show') || $this.hasClass('match')) {
            return true;
        }

        let card = $this.context.innerHTML;
        $this.addClass('open show');
        allOpen.push(card);

        if (allOpen.length > 1) {
            if (card === allOpen[0]) {
                $deck.find('.open').addClass('match');
                setTimeout(function () {
                    $deck.find('open').removeClass('open show');
                }, wait);
                match++;
                totalKoin = koin + match;
            } else {
                $deck.find('.open').addClass('notmatch');
                setTimeout(function () {
                    $deck.find('.open').removeClass('open show');
                }, wait / 1.5);
            }

            allOpen = [];
            $matched.html(totalKoin);
        }

        if (totalKoin === 6) {
            console.log('Jumlah Card Stage 2 = ' + totalCard2)
            setTimeout(function () {
                gameOver(totalKoin);
                // startThree();
            }, 500);
        }
    });
}

// Add Card On Stage 3
let addCardListener3 = function () {

    $deck3.find('.card').bind('click', function () {
        let $this = $(this);
        if ($this.hasClass('show') || $this.hasClass('match')) {
            return true;
        }

        let card = $this.context.innerHTML;
        $this.addClass('open show');
        allOpen.push(card);

        if (allOpen.length > 1) {
            if (card === allOpen[0]) {
                $deck.find('.open').addClass('match');
                setTimeout(function () {
                    $deck.find('open').removeClass('open show');
                }, wait);
                match++;
                finalKoin = totalKoin + match;
            } else {
                $deck.find('.open').addClass('notmatch');
                setTimeout(function () {
                    $deck.find('.open').removeClass('open show');
                }, wait / 1.5);
            }

            allOpen = [];
            $matched.html(finalKoin);
        }

        if (finalKoin === 12) {
            console.log('Jumlah Card Stage 2 = ' + totalCard3)
            setTimeout(function () {
                gameOver(finalKoin);
                // startOne();
            }, 500);
        }
    });
}

startOne();
$('.playAgain.stageOne').on('click', function () {
    startTwo();
    $('button.stageOne').addClass('hidden');
    $('button.stageTwo').removeClass('hidden');
    // $('.deck.deck-4').addClass('hidden');
    // $('.deck.deck-8').removeClass('hidden');
})

$('.playAgain.stageTwo').on('click', function () {
    startThree();
    $('button.stageTwo').addClass('hidden');
    $('button.stageThree').removeClass('hidden');
    // $('.deck.deck-8').addClass('hidden');
    // $('.deck.deck-12').removeClass('hidden');
})

$('.playAgain.stageThree').on('click', function () {
    startOne();
    $('button.stageThree').addClass('hidden');
    $('button.stageOne').removeClass('hidden');
    // $('.deck.deck-12').addClass('hidden');
    // $('.deck.deck-4').removeClass('hidden');
})