let score = 0; // 점수 초기화

// HTML 요소 참조
const scoreElement = document.getElementById('score');
const shareButton = document.getElementById('shareTwitter');

// 화살표 데이터를 설정하는 예시 (게임에서 생성한 화살표 객체)
const arrows = [
    { direction: 'left', type: 'left' },
    { direction: 'right', type: 'right' },
    // 더 많은 화살표 추가 가능
];

// 팔 방향 감지 함수
function checkDirection(userDirection, arrowDirection) {
    return userDirection === arrowDirection;
}

// 게임 로직
function gameLoop() {
    const currentArrow = arrows[0];
    const arrowDirection = currentArrow.direction;

    const userLeftArmDirection = detectArmDirection(leftWrist, leftElbow);
    const userRightArmDirection = detectArmDirection(rightWrist, rightElbow);

    if (currentArrow.type === 'left' && checkDirection(userLeftArmDirection, arrowDirection)) {
        score += 1;
    } else if (currentArrow.type === 'right' && checkDirection(userRightArmDirection, arrowDirection)) {
        score += 1;
    }

    scoreElement.textContent = `Score: ${score}`;

    arrows.shift();
    if (arrows.length > 0) {
        requestAnimationFrame(gameLoop);
    } else {
        endGame();
    }
}

function detectArmDirection(wrist, elbow) {
    const xDiff = wrist.x - elbow.x;
    const yDiff = wrist.y - elbow.y;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        return xDiff > 0 ? 'right' : 'left';
    } else {
        return yDiff > 0 ? 'down' : 'up';
    }
}

function endGame() {
    alert(`Game Over! Your score is ${score}`);
    shareButton.style.display = 'block'; // 트위터 공유 버튼 표시

    const tweetText = `I scored ${score} points in the motion game! Can you beat my score? 🕹️🎯`;
    const twitterShareURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&hashtags=MotionGame,FunChallenge`;

    shareButton.addEventListener('click', () => {
        window.open(twitterShareURL, '_blank');
    });

    arrows = [];
}

document.getElementById('startGame').addEventListener('click', () => {
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    startGame();
});
