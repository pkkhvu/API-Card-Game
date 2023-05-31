let deckId = ""

fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    deckId = data.deck_id
  })
  .catch(err => {
    console.log(`error ${err}`)
  });


document.querySelector('button').addEventListener('click', drawTwo)

function drawTwo(){
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.querySelector("#player1").src = data.cards[0].image
        document.querySelector("#player2").src = data.cards[1].image

        let player1card = convertFaceToNum(data.cards[0].value);
        let player2card = convertFaceToNum(data.cards[1].value);
        if(player1card > player2card){
            document.querySelector("h3").innerText = "Player 1 wins!"
        } else if (player1card < player2card){
            document.querySelector("h3").innerText = "Player 2 wins!"
        } else if (player1card == player2card){
            document.querySelector("h3").innerText = "Time for WAR! Draw 4 cards each and flip the fourth!";
            drawThreeCardsEach();
        }
        });
    .catch(err => {
        console.log(`error ${err}`)
    });

}

function convertFaceToNum(val){
  if(val === "ACE"){
    return 14
  } else if (val === "KING"){
    return 13
  } else if (val === "QUEEN"){
    return 12
  } else if (val === "JACK"){
    return 11
  } else {
    return val
  }
} 


function drawThreeCardsEach(){
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=8`)
  .then(res => res.json())
  .then(data => {
    console.log(data)

    let player1WarCard = convertFaceToNum(data.cards[6].value);
    let player2WarCard = convertFaceToNum(data.cards[7].value);
    if(player1WarCard > player2WarCard){
      document.querySelector("h3").innerText = "Player 1 wins this war round!"
    } else if (player1WarCard < player2WarCard){
      document.querySelector("h3").innerText = "Player 2 wins this war round!"
    } else if (player1WarCard == player2WarCard){
      drawThreeCardsEach();
    }

  })
  .catch(err => {
    console.log(`error ${err}`)
  });
}