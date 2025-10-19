// 質問データ（15問）
// 各質問は4つの軸（dedication, sacrifice, stress, relationship）に影響
const questionsOriginal = [
    {
        text: "終電の時間でも仕事が終わっていなければ残る",
        axes: { dedication: 1, sacrifice: 1, stress: 0.5, relationship: 0 },
        options: [
            { text: "当然残る", value: 5, emoji: "🔥" },
            { text: "残る", value: 4, emoji: "💼" },
            { text: "たまに残る", value: 3, emoji: "🤔" },
            { text: "基本帰る", value: 2, emoji: "🚶" },
            { text: "秒で帰る", value: 1, emoji: "💨" },
            { text: "終電？定時で帰ります", value: 0, emoji: "😎" }
        ]
    },
    {
        text: "お腹が空いたが午後の仕事に向けてランチを抜く",
        axes: { dedication: 0.8, sacrifice: 1, stress: 0, relationship: 0 },
        options: [
            { text: "当然抜く", value: 5, emoji: "😤" },
            { text: "よく抜く", value: 4, emoji: "😣" },
            { text: "たまに抜く", value: 3, emoji: "🤷" },
            { text: "基本食べる", value: 2, emoji: "🍱" },
            { text: "絶対食べる", value: 1, emoji: "😋" },
            { text: "豪華ランチ必須", value: 0, emoji: "🍽️" }
        ]
    },
    {
        text: "上司からの休日の連絡にすぐ返信する",
        axes: { dedication: 0.7, sacrifice: 0.6, stress: 0, relationship: 1 },
        options: [
            { text: "秒で返信", value: 5, emoji: "⚡" },
            { text: "すぐ返信", value: 4, emoji: "📱" },
            { text: "わりと早く", value: 3, emoji: "✉️" },
            { text: "後で返す", value: 2, emoji: "⏰" },
            { text: "月曜に返す", value: 1, emoji: "📅" },
            { text: "既読スルー", value: 0, emoji: "🙈" }
        ]
    },
    {
        text: "体調が悪くても会社に出勤する",
        axes: { dedication: 0.9, sacrifice: 1, stress: 0.7, relationship: 0 },
        options: [
            { text: "這ってでも出社", value: 5, emoji: "🤒" },
            { text: "絶対出社", value: 4, emoji: "😷" },
            { text: "なんとか出社", value: 3, emoji: "🤧" },
            { text: "悪かったら休む", value: 2, emoji: "🏥" },
            { text: "余裕で休む", value: 1, emoji: "😴" },
            { text: "有給消化チャンス", value: 0, emoji: "🏖️" }
        ]
    },
    {
        text: "同僚が困っていたら自分の仕事を後回しにして手伝う",
        axes: { dedication: 0.3, sacrifice: 0.7, stress: 0, relationship: 1 },
        options: [
            { text: "即座に手伝う", value: 5, emoji: "🦸" },
            { text: "すぐ手伝う", value: 4, emoji: "🤝" },
            { text: "余裕あれば手伝う", value: 3, emoji: "👍" },
            { text: "自分優先", value: 2, emoji: "🙋" },
            { text: "基本手伝わない", value: 1, emoji: "🚫" },
            { text: "見て見ぬふり", value: 0, emoji: "🙈" }
        ]
    },
    {
        text: "会社の飲み会は全て参加する",
        axes: { dedication: 0.5, sacrifice: 0.6, stress: 0, relationship: 1 },
        options: [
            { text: "全参加", value: 5, emoji: "🍻" },
            { text: "ほぼ参加", value: 4, emoji: "🍺" },
            { text: "たまに参加", value: 3, emoji: "🥂" },
            { text: "あまり行かない", value: 2, emoji: "🏠" },
            { text: "ほぼ不参加", value: 1, emoji: "🙅" },
            { text: "飲み会アレルギー", value: 0, emoji: "😫" }
        ]
    },
    {
        text: "有給休暇を取ることに罪悪感を感じる",
        axes: { dedication: 0.8, sacrifice: 0.8, stress: 0.5, relationship: 0.3 },
        options: [
            { text: "すごく感じる", value: 5, emoji: "😰" },
            { text: "感じる", value: 4, emoji: "😥" },
            { text: "少し感じる", value: 3, emoji: "🤔" },
            { text: "あまり感じない", value: 2, emoji: "😌" },
            { text: "全く感じない", value: 1, emoji: "😄" },
            { text: "権利です", value: 0, emoji: "👑" }
        ]
    },
    {
        text: "仕事のことを考えて眠れない夜がある",
        axes: { dedication: 0.7, sacrifice: 0.5, stress: 1, relationship: 0 },
        options: [
            { text: "毎日", value: 5, emoji: "😵" },
            { text: "よくある", value: 4, emoji: "😫" },
            { text: "たまにある", value: 3, emoji: "😪" },
            { text: "ほぼない", value: 2, emoji: "😌" },
            { text: "全くない", value: 1, emoji: "😴" },
            { text: "秒で寝れる", value: 0, emoji: "💤" }
        ]
    },
    {
        text: "家族や友人との約束より仕事を優先する",
        axes: { dedication: 1, sacrifice: 1, stress: 0, relationship: 0 },
        options: [
            { text: "絶対仕事", value: 5, emoji: "💼" },
            { text: "基本仕事", value: 4, emoji: "📊" },
            { text: "たまに仕事", value: 3, emoji: "⚖️" },
            { text: "半々", value: 2, emoji: "🤝" },
            { text: "基本プライベート", value: 1, emoji: "🎉" },
            { text: "絶対プライベート", value: 0, emoji: "🏖️" }
        ]
    },
    {
        text: "会社のために自腹で備品や飲食物を購入することがある",
        axes: { dedication: 0.9, sacrifice: 1, stress: 0, relationship: 0.5 },
        options: [
            { text: "よくある", value: 5, emoji: "💸" },
            { text: "ある", value: 4, emoji: "💰" },
            { text: "たまにある", value: 3, emoji: "🤷" },
            { text: "ほぼない", value: 2, emoji: "🙅" },
            { text: "絶対ない", value: 1, emoji: "❌" },
            { text: "経費でしょ", value: 0, emoji: "💳" }
        ]
    },
    {
        text: "在宅ワークで昼寝をしている人が羨ましい",
        axes: { dedication: 1, sacrifice: 0, stress: 0, relationship: 0 },
        options: [
            { text: "これ私", value: 5, emoji: "😴" },
            { text: "すごく羨ましい", value: 4, emoji: "😍" },
            { text: "羨ましい", value: 3, emoji: "🥺" },
            { text: "無感情", value: 2, emoji: "😐" },
            { text: "ゆるせない", value: 1, emoji: "😠" },
            { text: "決して許せない", value: 0, emoji: "😡" }
        ],
        reverse: true
    },
    {
        text: "金曜日の夕方、やる気が出ない",
        axes: { dedication: 0.8, sacrifice: 0, stress: 0, relationship: 0 },
        options: [
            { text: "これ私", value: 5, emoji: "😩" },
            { text: "すごくそう", value: 4, emoji: "😅" },
            { text: "わりとそう", value: 3, emoji: "😪" },
            { text: "普通に働ける", value: 2, emoji: "😊" },
            { text: "バリバリ働ける", value: 1, emoji: "💪" },
            { text: "金曜が一番燃える", value: 0, emoji: "🔥" }
        ],
        reverse: true
    },
    {
        text: "会議中にスマホをいじったことがある",
        axes: { dedication: 0.7, sacrifice: 0, stress: 0, relationship: 0.5 },
        options: [
            { text: "毎回", value: 5, emoji: "📱" },
            { text: "よくある", value: 4, emoji: "👀" },
            { text: "たまに", value: 3, emoji: "🤭" },
            { text: "ほぼない", value: 2, emoji: "🙅" },
            { text: "絶対しない", value: 1, emoji: "😇" },
            { text: "会議は真剣勝負", value: 0, emoji: "💼" }
        ],
        reverse: true
    },
    {
        text: "締め切り前日にならないとやる気が出ない",
        axes: { dedication: 0.6, sacrifice: 0, stress: 0.3, relationship: 0 },
        options: [
            { text: "これ私", value: 5, emoji: "😭" },
            { text: "完全にそう", value: 4, emoji: "😅" },
            { text: "わりとそう", value: 3, emoji: "🤔" },
            { text: "普通", value: 2, emoji: "😐" },
            { text: "計画的にやる", value: 1, emoji: "📝" },
            { text: "余裕を持ってやる", value: 0, emoji: "✅" }
        ],
        reverse: true
    },
    {
        text: "仕事中にネットサーフィンをする",
        axes: { dedication: 0.9, sacrifice: 0, stress: 0, relationship: 0 },
        options: [
            { text: "常に", value: 5, emoji: "💻" },
            { text: "よくする", value: 4, emoji: "🌐" },
            { text: "たまに", value: 3, emoji: "🤫" },
            { text: "ほぼしない", value: 2, emoji: "🙅" },
            { text: "絶対しない", value: 1, emoji: "🚫" },
            { text: "仕事に集中してる", value: 0, emoji: "💪" }
        ],
        reverse: true
    }
];

// シャッフル用の質問配列
let questions = [];

// 配列をシャッフルする関数
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// resultTypes配列は削除（TYPESオブジェクトのみ使用）

// 状態管理
let currentQuestion = 0;
let scores = {
    dedication: 0,
    sacrifice: 0,
    stress: 0,
    relationship: 0
};

// DOM要素
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const loadingScreen = document.getElementById('loading-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');
const questionText = document.getElementById('question-text');
const currentQuestionNum = document.getElementById('current-question');
const progressFill = document.getElementById('progress-fill');
const optionsContainer = document.getElementById('options-container');
const resultCard = document.getElementById('result-card');

// イベントリスナー（DOMContentLoaded後に設定）
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up event listeners');
    
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const shareBtn = document.getElementById('share-btn');
    const charactersBtn = document.getElementById('characters-btn');
    
    if (startBtn) {
        startBtn.addEventListener('click', startQuiz);
        console.log('Start button event listener added');
    } else {
        console.error('Start button not found');
    }
    
    if (restartBtn) {
        restartBtn.addEventListener('click', resetQuiz);
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', shareResult);
    }
    
    if (charactersBtn) {
        charactersBtn.addEventListener('click', showCharacters);
    }
    
    const nurtureBtn = document.getElementById('nurture-btn');
    if (nurtureBtn) {
        nurtureBtn.addEventListener('click', startNurture);
    }
});

// 診断開始
function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    currentQuestion = 0;
    scores = { dedication: 0, sacrifice: 0, stress: 0, relationship: 0 };
    
    // ローカルAnalyticsに診断開始を記録
    if (window.LocalAnalytics) {
        window.LocalAnalytics.trackDiagnosisStart();
    }
    
    // 質問をシャッフル
    questions = shuffleArray(questionsOriginal);
    
    // bodyの背景を元のピンクに戻す
    document.body.style.background = 'linear-gradient(135deg, #ffeef8 0%, #ffb3d9 50%, #ff85c0 100%)';
    document.body.classList.remove('pink-theme', 'orange-theme', 'green-theme');
    // 浮遊絵文字を削除
    document.querySelectorAll('.floating-emoji').forEach(el => el.remove());
    
    showQuestion();
}

// 質問を表示
function showQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.text;
    currentQuestionNum.textContent = currentQuestion + 1;
    
    // プログレスバー更新
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    
    // 質問番号に応じて背景を変更
    const questionNumber = currentQuestion + 1;
    const quizScreen = document.getElementById('quiz-screen');
    
    // 既存のクラスを削除
    quizScreen.classList.remove('group-pink', 'group-stress', 'group-lifestyle');
    document.body.classList.remove('pink-theme', 'orange-theme', 'green-theme');
    
    // 既存の浮遊絵文字を削除
    document.querySelectorAll('.floating-emoji').forEach(el => el.remove());
    
    if (questionNumber <= 5) {
        // 1-5問目: ピンク系の可愛い背景
        quizScreen.style.background = 'linear-gradient(135deg, #FFF0F5 0%, #FFB6C1 50%, #FF69B4 100%)';
        quizScreen.classList.add('group-pink');
        document.body.classList.add('pink-theme');
        
        // bodyの背景をピンク系に変更
        document.body.style.background = 'linear-gradient(135deg, #ffeef8 0%, #ffb3d9 50%, #ff85c0 100%)';
        
        // ピンクテーマの浮遊絵文字を追加（12個、規則的配置）
        const pinkEmojis = ['⭐', '✨', '💖', '🌸', '💕', '🎀', '🦄', '💝', '🌺', '💗', '🌟', '💫'];
        const positions = [
            {top: '15%', left: '10%'}, {top: '25%', left: '85%'}, {top: '35%', left: '20%'},
            {top: '45%', left: '75%'}, {top: '55%', left: '15%'}, {top: '65%', left: '80%'},
            {top: '75%', left: '25%'}, {top: '85%', left: '70%'}, {top: '20%', left: '50%'},
            {top: '40%', left: '5%'}, {top: '60%', left: '90%'}, {top: '80%', left: '45%'}
        ];
        pinkEmojis.forEach((emoji, index) => {
            const emojiEl = document.createElement('div');
            emojiEl.className = 'floating-emoji';
            emojiEl.textContent = emoji;
            emojiEl.style.top = positions[index].top;
            emojiEl.style.left = positions[index].left;
            document.body.appendChild(emojiEl);
        });
    } else if (questionNumber <= 10) {
        // 6-10問目: ストレス・疲労系の背景（温かいオレンジ系）
        quizScreen.style.background = 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 50%, #FFCC02 100%)';
        quizScreen.classList.add('group-stress');
        document.body.classList.add('orange-theme');
        
        // bodyの背景をオレンジ系に変更
        document.body.style.background = 'linear-gradient(135deg, #FFE0B2 0%, #FFCC02 50%, #FF8F00 100%)';
        
        // オレンジテーマの浮遊絵文字を追加（12個、規則的配置）
        const orangeEmojis = ['🌟', '☀️', '🔥', '💪', '⚡', '🎆', '💥', '🚀', '💢', '🌞', '🎯', '💨'];
        const positions = [
            {top: '12%', left: '12%'}, {top: '22%', left: '88%'}, {top: '32%', left: '22%'},
            {top: '42%', left: '78%'}, {top: '52%', left: '12%'}, {top: '62%', left: '88%'},
            {top: '72%', left: '22%'}, {top: '82%', left: '78%'}, {top: '18%', left: '52%'},
            {top: '38%', left: '8%'}, {top: '58%', left: '92%'}, {top: '78%', left: '42%'}
        ];
        orangeEmojis.forEach((emoji, index) => {
            const emojiEl = document.createElement('div');
            emojiEl.className = 'floating-emoji';
            emojiEl.textContent = emoji;
            emojiEl.style.top = positions[index].top;
            emojiEl.style.left = positions[index].left;
            document.body.appendChild(emojiEl);
        });
    } else {
        // 11-15問目: 自由・ライフスタイル系の背景（爽やかなグリーン）
        quizScreen.style.background = 'linear-gradient(135deg, #F1F8E9 0%, #DCEDC8 50%, #8BC34A 100%)';
        quizScreen.classList.add('group-lifestyle');
        document.body.classList.add('green-theme');
        
        // bodyの背景をグリーン系に変更
        document.body.style.background = 'linear-gradient(135deg, #DCEDC8 0%, #8BC34A 50%, #689F38 100%)';
        
        // グリーンテーマの浮遊絵文字を追加（12個、規則的配置）
        const greenEmojis = ['🌱', '☀️', '🎯', '🌿', '🍀', '🌳', '🦋', '🌈', '🍃', '🌺', '🌸', '🌻'];
        const positions = [
            {top: '18%', left: '15%'}, {top: '28%', left: '82%'}, {top: '38%', left: '18%'},
            {top: '48%', left: '85%'}, {top: '58%', left: '12%'}, {top: '68%', left: '88%'},
            {top: '78%', left: '25%'}, {top: '88%', left: '75%'}, {top: '15%', left: '48%'},
            {top: '35%', left: '5%'}, {top: '55%', left: '95%'}, {top: '75%', left: '35%'}
        ];
        greenEmojis.forEach((emoji, index) => {
            const emojiEl = document.createElement('div');
            emojiEl.className = 'floating-emoji';
            emojiEl.textContent = emoji;
            emojiEl.style.top = positions[index].top;
            emojiEl.style.left = positions[index].left;
            document.body.appendChild(emojiEl);
        });
    }
    
    // 選択肢を動的に生成
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        
        // イラスト（絵文字）とテキストを表示
        if (option.emoji) {
            const emojiSpan = document.createElement('span');
            emojiSpan.className = 'option-emoji';
            emojiSpan.textContent = option.emoji;
            btn.appendChild(emojiSpan);
            
            const textSpan = document.createElement('span');
            textSpan.className = 'option-text';
            textSpan.textContent = option.text;
            btn.appendChild(textSpan);
        } else {
            btn.textContent = option.text;
        }
        
        btn.setAttribute('data-value', option.value);
        btn.addEventListener('click', () => {
            selectAnswer(option.value);
        });
        optionsContainer.appendChild(btn);
    });
    
    // アニメーション再トリガー
    const questionCard = document.querySelector('.question-card');
    questionCard.style.animation = 'none';
    setTimeout(() => {
        questionCard.style.animation = 'slideIn 0.4s ease-out';
    }, 10);
}

// 回答選択
function selectAnswer(value) {
    const question = questions[currentQuestion];
    
    // 通常質問：高い値を選ぶとスコアが上がる
    // 逆転質問：高い値を選ぶとスコアが下がる（社畜度が低い）
    const multiplier = question.reverse ? -1 : 1;
    
    // 各軸にスコアを加算（0-5の値 × 軸の重み × 乗数）
    scores.dedication += value * question.axes.dedication * multiplier;
    scores.sacrifice += value * question.axes.sacrifice * multiplier;
    scores.stress += value * question.axes.stress * multiplier;
    scores.relationship += value * question.axes.relationship * multiplier;
    
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showLoading();
    }
}

// ローディング画面を表示
function showLoading() {
    quizScreen.classList.remove('active');
    loadingScreen.classList.add('active');
    
    // 2.5秒後に結果を表示
    setTimeout(() => {
        showResult();
    }, 2500);
}

// 演出アニメーション（5種類からランダム）
function createCelebration() {
    const types = ['confetti', 'fireworks', 'hearts', 'stars', 'sparkles'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    switch(randomType) {
        case 'confetti':
            createConfetti();
            break;
        case 'fireworks':
            createFireworks();
            break;
        case 'hearts':
            createHearts();
            break;
        case 'stars':
            createStars();
            break;
        case 'sparkles':
            createSparkles();
            break;
    }
}

// 1. 紙吹雪
function createConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    container.className = 'confetti-container';
    
    const colors = ['#ff69b4', '#ff1493', '#ffc0e3', '#ff85c0', '#ffb3d9', '#ffd700', '#00bcd4', '#4caf50'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = ['🎉', '🎊', '✨', '💫'][Math.floor(Math.random() * 4)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';
        container.appendChild(confetti);
    }
    
    setTimeout(() => container.innerHTML = '', 5000);
}

// 2. 花火
function createFireworks() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    container.className = 'confetti-container';
    
    for (let i = 0; i < 50; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.textContent = '🎆';
        firework.style.left = Math.random() * 100 + '%';
        firework.style.top = Math.random() * 100 + '%';
        firework.style.animationDelay = Math.random() * 2 + 's';
        firework.style.fontSize = (Math.random() * 30 + 20) + 'px';
        container.appendChild(firework);
    }
    
    setTimeout(() => container.innerHTML = '', 5000);
}

// 3. ハート
function createHearts() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    container.className = 'confetti-container';
    
    const heartTypes = ['💕', '💖', '💗', '💓', '💝'];
    
    for (let i = 0; i < 80; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 3 + 's';
        heart.style.animationDuration = (Math.random() * 4 + 3) + 's';
        heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
        container.appendChild(heart);
    }
    
    setTimeout(() => container.innerHTML = '', 5000);
}

// 4. 星
function createStars() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    container.className = 'confetti-container';
    
    const starTypes = ['⭐', '🌟', '✨', '💫', '🌠'];
    
    for (let i = 0; i < 70; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = starTypes[Math.floor(Math.random() * starTypes.length)];
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.fontSize = (Math.random() * 25 + 15) + 'px';
        container.appendChild(star);
    }
    
    setTimeout(() => container.innerHTML = '', 5000);
}

// 5. キラキラ
function createSparkles() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    container.className = 'confetti-container';
    
    for (let i = 0; i < 60; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = '✨';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkle.style.fontSize = (Math.random() * 30 + 15) + 'px';
        container.appendChild(sparkle);
    }
    
    setTimeout(() => container.innerHTML = '', 5000);
}

// 結果を表示
function showResult() {
    loadingScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    // ランダムな演出を発動
    setTimeout(() => {
        createCelebration();
    }, 300);
    
    // 各軸の最大・最小スコアを計算
    let maxDedication = 0, minDedication = 0;
    let maxSacrifice = 0, minSacrifice = 0;
    let maxStress = 0, minStress = 0;
    let maxRelationship = 0, minRelationship = 0;
    
    questions.forEach(q => {
        const multiplier = q.reverse ? -1 : 1;
        const dedWeight = q.axes.dedication * multiplier;
        const sacWeight = q.axes.sacrifice * multiplier;
        const strWeight = q.axes.stress * multiplier;
        const relWeight = q.axes.relationship * multiplier;
        
        // 各重みに対して、最大・最小を加算
        // 正の重み：最大=5倍、最小=0倍
        // 負の重み：最大=0倍、最小=5倍（負の数になる）
        maxDedication += Math.max(dedWeight * 5, dedWeight * 0);
        minDedication += Math.min(dedWeight * 5, dedWeight * 0);
        
        maxSacrifice += Math.max(sacWeight * 5, sacWeight * 0);
        minSacrifice += Math.min(sacWeight * 5, sacWeight * 0);
        
        maxStress += Math.max(strWeight * 5, strWeight * 0);
        minStress += Math.min(strWeight * 5, strWeight * 0);
        
        maxRelationship += Math.max(relWeight * 5, relWeight * 0);
        minRelationship += Math.min(relWeight * 5, relWeight * 0);
    });
    
    // スコアを0-100%に正規化
    function normalizeScore(score, min, max) {
        if (max === min) return 50;
        return Math.max(0, Math.min(100, ((score - min) / (max - min)) * 100));
    }
    
    const normalizedScores = {
        dedication: normalizeScore(scores.dedication, minDedication, maxDedication),
        sacrifice: normalizeScore(scores.sacrifice, minSacrifice, maxSacrifice),
        stress: normalizeScore(scores.stress, minStress, maxStress),
        relationship: normalizeScore(scores.relationship, minRelationship, maxRelationship)
    };
    
    // デバッグ用ログ
    console.log('生スコア:', scores);
    console.log('範囲:', { 
        dedication: [minDedication, maxDedication],
        sacrifice: [minSacrifice, maxSacrifice],
        stress: [minStress, maxStress],
        relationship: [minRelationship, maxRelationship]
    });
    console.log('正規化スコア:', normalizedScores);
    
    // ▼▼▼ 以下をそのまま貼り替え ▼▼▼

    // 1) レア判定（極端値のときだけ出す）
    function rareCheck(ax){
      // 閾値は必要に応じて微調整可（例: 80/20）
      if (ax.d>=80 && ax.s>=80 && ax.r>=80 && ax.h>=80) return TYPES.ELITE; // 生粋の社畜
      if (ax.d<=20 && ax.s<=20 && ax.r<=20 && ax.h<=20) return TYPES.FREE;  // 自由人
      return null;
    }

    // 2) 決定的ハッシュ（同一回答→同一結果）
    function hash32(str){
      let h = 2166136261 >>> 0;
      for (let i = 0; i < str.length; i++){
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619) >>> 0; // FNV-1a
      }
      return h >>> 0;
    }

    // 3) 非レア14タイプを固定順で取得（順番は一度決めたら変えない）
    // TYPESオブジェクトの定義後に移動するため、一時的にコメントアウト
    // const NON_RARE_KEYS = Object.keys(TYPES).filter(k => !TYPES[k].rare);

    // 4) 回答から"決定的シグネチャ"を作成
    function buildSignature(ax){
      // 可能なら 15問の素の回答配列を使う（同一回答完全同一に）
      if (Array.isArray(window.answers) && window.answers.length === 15){
        return 'A|' + window.answers.join(',');
      }
      // フォールバック：4軸(0-100)を整数化して使う（これでも十分決定的）
      return `X|${Math.round(ax.d)}|${Math.round(ax.s)}|${Math.round(ax.r)}|${Math.round(ax.h)}`;
    }

    // 5) 非レア14タイプへ"等確率・決定的"にバケツ割り
    function pickNonRareBalanced(ax){
      const sig = buildSignature(ax);
      const h = hash32(sig);
      // TYPESオブジェクトの定義後に移動するため、一時的に簡易実装
      const nonRareKeys = Object.keys(TYPES).filter(k => !TYPES[k].rare);
      const idx = h % nonRareKeys.length; // ★ 14等分
      const key = nonRareKeys[idx];
      return TYPES[key];
    }

    // ===== 代表点（centroid）の再配置 =====
    // 4軸（d=献身, s=犠牲, r=耐性, h=人間関係）空間に均等に散らす。
    // レア2種(ELITE/FREE)はnearestTypeの対象外(rare:true)なので触りません。
    // TYPESオブジェクトの定義後に移動するため、一時的にコメントアウト
    // TYPES.BURNOUT.centroid = { d:80, s:80, r:20, h:20 }; // 高献身・高犠牲・低耐性・低人間
    // TYPESオブジェクトの定義後に移動するため、一時的にコメントアウト
    // TYPES.STOIC.centroid   = { d:80, s:80, r:80, h:40 }; // 高献身・高犠牲・高耐性・中低人間
    // TYPES.LONE.centroid    = { d:80, s:80, r:80, h:20 }; // 高献身・高犠牲・高耐性・低人間
    // TYPES.KIND.centroid    = { d:80, s:20, r:20, h:80 }; // 高献身・低犠牲・低耐性・高人間
    // TYPES.SENSITIVE.centroid = { d:80, s:20, r:20, h:20 }; // 高献身・低犠牲・低耐性・低人間
    // TYPES.TEAM.centroid    = { d:80, s:20, r:80, h:80 }; // 高献身・低犠牲・高耐性・高人間
    // TYPES.PACE.centroid    = { d:80, s:20, r:80, h:40 }; // 高献身・低犠牲・高耐性・中低人間
    // TYPES.YURUFUWA.centroid = { d:20, s:80, r:20, h:80 }; // 低献身・高犠牲・低耐性・高人間
    // TYPES.HIDDEN.centroid  = { d:50, s:50, r:20, h:50 }; // 中庸・低耐性（潜在疲労）
    // TYPES.NICE.centroid    = { d:50, s:50, r:50, h:80 }; // 中庸・人間高（お人好し）
    // TYPES.REAL.centroid    = { d:50, s:50, r:50, h:20 }; // 中庸・人間低（現実派）
    // TYPES.FAMILY.centroid  = { d:20, s:20, r:50, h:80 }; // 低献身・低犠牲・中耐性・人間高
    // TYPES.LWB.centroid     = { d:60, s:20, r:50, h:50 }; // 中高献身・低犠牲・中耐性・中人間
    // TYPES.ABLE.centroid    = { d:80, s:50, r:80, h:50 }; // 高献身・中犠牲・高耐性・中人間

    // ※ ELITE/FREE は rare:true のまま（centroidは参照されません）

    // ▲▲▲ ここまで貼り替え ▲▲▲

    // === タイプ定義（16種類・新名称仕様） ===
    const TYPES = {
      ELITE: { key:"ELITE", name:"生粋の社畜", icon:"🔥",
        desc:"全軸が非常に高い究極の献身者。仕事と一体化し、成果を使命とする存在。", 
        rare:true, tags:["究極の献身","燃え尽き注意"],
        centroid:{d:95,s:95,r:95,h:95},
        level: 100,
        style: "朝は誰よりも早く出社し、夜は最後まで残業。休日も仕事のことを考え、メールチェックは欠かしません。体調が悪くても這ってでも出社し、有給休暇を取ることに罪悪感を感じるほど。あなたの献身的な姿勢は周囲から信頼されています。",
        advice: "時には自分の健康や家族のことも考える時間を持ってください。ワークライフバランスという言葉を思い出し、たまには自分を甘やかすことも大切です。完璧でなくても大丈夫。あなた自身の幸せも仕事と同じくらい大切にしましょう。",
        jobs: "大企業の総合職、コンサルタント、プロジェクトマネージャー、営業職、人事・総務、経営企画",
        compatibility: ["無敗の職人社畜", "心優しき社畜", "共創リーダー社員"] },

      BURNOUT: { key:"BURNOUT", name:"限界突破社畜", icon:"⚠️",
        desc:"献身・犠牲が高く、耐性と人間関係が低い。限界まで挑み続ける頑張り屋タイプ。",
        centroid:{d:80,s:80,r:20,h:20}, tags:["過負荷","要休息"],
        level: 95,
        style: "仕事は完璧にこなそうとするあまり、休息を取ることを忘れがち。深夜まで働き、睡眠不足が続き、食事も不規則に。人間関係のストレスも相まって、精神的な疲労が蓄積しています。",
        advice: "今すぐ適度な休息が必要です。有給休暇を取って旅行に行ったり、趣味の時間を作ったり、カウンセリングを受けることも検討してください。あなたの健康が何よりも大切です。無理をせず、自分を守りましょう。",
        jobs: "クリエイティブ職、研究職、医療従事者、弁護士、会計士、スタートアップ企業",
        compatibility: ["心優しき社畜", "マイペース社員", "バランサー社員"] },

      STOIC: { key:"STOIC", name:"無敗の職人社畜", icon:"🥇",
        desc:"高献身・高犠牲・高耐性。黙々と成果を積み上げるプロ意識の持ち主。",
        centroid:{d:85,s:75,r:85,h:35}, tags:["自己規律","粘り強さ"],
        level: 85,
        style: "孤高の戦士として仕事に打ち込み、困難な課題にも果敢に挑戦。チームワークよりも個人のパフォーマンスを重視し、自分のスキルアップと成果にこだわります。仕事を修行のように捉えています。",
        advice: "常に自分を高めようとする姿勢は素晴らしいですが、時には周囲との協調も意識してみましょう。あなたの強さは本物ですが、人とのつながりも力になることを忘れないでください。",
        jobs: "アスリート、職人、エンジニア、外科医、パイロット、投資家、起業家",
        compatibility: ["生粋の社畜", "孤高の成果主義社畜", "成果最適化社畜"] },

      LONE: { key:"LONE", name:"孤高の成果主義社畜", icon:"🐺",
        desc:"献身・犠牲・耐性は高く、人間関係は控えめ。結果に全てを賭ける孤高の戦士。",
        centroid:{d:85,s:75,r:85,h:15}, tags:["独立独歩","集中力"],
        level: 75,
        style: "自分のペースで黙々と仕事をこなすことを好み、静かな環境で集中して作業することで最高のパフォーマンスを発揮。会議や飲み会などの集団行動は苦手で、できれば避けたいと思っています。",
        advice: "孤独を愛し、自由を求めるあなたのスタイルは、これからの時代にマッチしています。リモートワークが最も適した働き方かも。自分らしさを大切に、信頼できる成果を出し続けてください。",
        jobs: "プログラマー、データサイエンティスト、作家、翻訳家、デザイナー、研究者、フリーランス",
        compatibility: ["無敗の職人社畜", "誠実な観察社員", "マイペース社員"] },

      KIND: { key:"KIND", name:"心優しき社畜", icon:"💐",
        desc:"高献身で人間関係を大切にする温厚タイプ。チームを支える縁の下の力持ち。",
        centroid:{d:75,s:25,r:25,h:85}, tags:["思いやり","共感"],
        level: 65,
        style: "困っている同僚がいればすぐに手を差し伸べ、チームの雰囲気を良くすることに貢献。みんなから慕われる存在です。優しさゆえに自分の気持ちを抑え込んでしまうことがあります。",
        advice: "他人を思いやる心は素晴らしいですが、自分自身のケアも忘れないでください。時には「NO」と言う勇気も必要です。あなたの優しさを保つためには自分を大切にすることが何よりも重要です。",
        jobs: "看護師、保育士、介護士、カウンセラー、教師、人事、カスタマーサポート",
        compatibility: ["共創リーダー社員", "生粋の社畜", "お人好し社員"] },

      SENSITIVE: { key:"SENSITIVE", name:"誠実な観察社員", icon:"🌿",
        desc:"献身は高いが犠牲と耐性は低い。誠実で丁寧、感受性豊かな観察者。",
        centroid:{d:75,s:25,r:25,h:25}, tags:["慎重","誠実"],
        level: 55,
        style: "自分のペースを大切にし、無理をせず、心の余裕を保つことを優先。環境の変化やプレッシャーに敏感で、安定した環境で力を発揮。大勢の人との交流よりも、少数の信頼できる人との深い関係を好みます。",
        advice: "自分の限界をよく理解しており、無理をして体調を崩すことを避ける賢さがあります。あなたの繊細さは弱点ではなく、深い洞察力と丁寧な仕事ぶりの源。自分らしさを大切にしてください。",
        jobs: "アーティスト、編集者、校正者、図書館司書、品質管理、リサーチャー、在宅ワーク職",
        compatibility: ["孤高の成果主義社畜", "マイペース社員", "バランサー社員"] },

      TEAM: { key:"TEAM", name:"共創リーダー社員", icon:"🤝",
        desc:"高献身・高耐性・人間関係高。協働で成果を生み、周囲を導くタイプ。",
        centroid:{d:70,s:40,r:80,h:85}, tags:["協調","信頼"],
        level: 60,
        style: "チームの一員として協力し合うことの大切さを理解し、周囲との調和を保ちながら高いパフォーマンスを発揮。プロジェクトをスムーズに進行させる潤滑油のような役割を果たします。",
        advice: "ストレス管理も上手で、メンタルヘルスを保ちながら長期的に活躍できる素質があります。このバランス感覚は、キャリアの成功において最も重要な要素の一つ。多くの人のロールモデルとなるでしょう。",
        jobs: "営業職、マーケター、イベントプランナー、人事、広報、プロジェクトマネージャー、教師",
        compatibility: ["心優しき社畜", "成果最適化社畜", "生粋の社畜"] },

      PACE: { key:"PACE", name:"マイペース社員", icon:"🧭",
        desc:"献身・耐性が高いが関係性は控えめ。自律して淡々と結果を出す。",
        centroid:{d:70,s:35,r:80,h:35}, tags:["自律","安定"],
        level: 45,
        style: "無理をせず、自分のリズムで仕事を進めることで、長期的に高いパフォーマンスを維持。仕事とプライベートの境界線をしっかり引き、休日はしっかり休むことで心身のバランスを保っています。",
        advice: "効率的に仕事を進め、残業は最小限に抑える工夫が素晴らしいです。この健全な働き方は、燃え尽き症候群を防ぎ、長く楽しく働き続けるための秘訣。自分らしさを失わず、幸せに働き続けてください。",
        jobs: "事務職、経理、総務、公務員、図書館司書、品質保証、バックオフィス業務",
        compatibility: ["誠実な観察社員", "バランサー社員", "現実派社員"] },

      YURUFUWA: { key:"YURUFUWA", name:"ゆるふわ社畜", icon:"🫧",
        desc:"献身は低いが犠牲が高く、人のために動くやさしき奉仕者。自己犠牲に注意。",
        centroid:{d:25,s:80,r:25,h:85}, tags:["優しさ","自己犠牲"],
        level: 35,
        style: "断ることが苦手で、頼まれるとついつい引き受けてしまい、結果的に自分の時間が犠牲に。本当はもっとゆったりと働きたいのに、周囲の期待に応えようとして無理をしてしまいます。",
        advice: "人間関係を大切にする優しさは素晴らしいですが、自分の気持ちも大切にしてください。「NO」と言う練習をして、自分の境界線を守ることが重要。ゆるふわとした雰囲気を保ちながらも、芯の強さを持ちましょう。",
        jobs: "受付、アシスタント、販売員、カフェ店員、事務サポート、インフルエンサー",
        compatibility: ["お人好し社員", "心優しき社畜", "家庭が大事社員"] },

      HIDDEN: { key:"HIDDEN", name:"隠れ疲労社畜", icon:"🌧️",
        desc:"バランス型だが耐性が低い。無自覚に疲れをためがちな頑張り屋。",
        centroid:{d:45,s:45,r:20,h:45}, tags:["回復重視","ストレス管理"],
        level: 40,
        style: "本当は仕事に全力を注ぎたいわけではないのに、責任感や義務感から頑張ってしまい、知らず知らずのうちに疲労が蓄積。周囲に相談できる人が少なく、一人で抱え込んでしまいます。",
        advice: "まずは自分の気持ちと向き合い、本当にやりたいことは何かを考えてみてください。仕事のスタイルや環境を見直し、もっと自分らしく働ける方法を探すことが大切。早めにケアすることで、健康的で充実した人生を取り戻せます。",
        jobs: "在宅ワーク、データ入力、校正、ライター、システム管理、夜勤業務、派遣社員",
        compatibility: ["マイペース社員", "現実派社員", "誠実な観察社員"] },

      NICE: { key:"NICE", name:"お人好し社員", icon:"😊",
        desc:"全体中庸・人間関係が高い。潤滑油として場を整え、支援に長ける。",
        centroid:{d:45,s:45,r:55,h:88}, tags:["調整役","優しさ"],
        level: 30,
        style: "周囲の人々との調和を保つことを優先し、自分のことは後回しにしがち。同僚や上司から頼まれごとをされると、忙しくても断れずに引き受けてしまい、気づけば自分の仕事が山積みに。",
        advice: "人間関係を大切にする姿勢は素晴らしく、周囲から信頼されています。ただし、自分の時間や気持ちも大切にすることを忘れないで。時には自分を優先し、お人好しであることの長所を活かしながら自分も守りましょう。",
        jobs: "サービス業、接客業、秘書、アシスタント、ボランティア、NPO職員、サポートデスク",
        compatibility: ["心優しき社畜", "ゆるふわ社畜", "家庭が大事社員"] },

      REAL: { key:"REAL", name:"現実派社員", icon:"🧱",
        desc:"全体中庸・人間関係控えめ。合理的・実務的で堅実なリアリスト。",
        centroid:{d:55,s:55,r:55,h:15}, tags:["堅実","実務力"],
        level: 25,
        style: "必要以上に入れ込むことはなく、人間関係のしがらみに振り回されることは少なく、ドライに物事を判断。ストレス耐性が高いため、困難な状況でも冷静に対処できます。",
        advice: "感情に流されず、現実的な判断を下せる冷静さが強み。仕事とプライベートを明確に分け、効率的に働くことを心がけています。理想を追い求めるよりも、現実を見据えて着実に進むスタイルは安定した人生を築く上で有利です。",
        jobs: "ITエンジニア、会計士、アナリスト、技術職、工場勤務、ドライバー、警備員",
        compatibility: ["マイペース社員", "隠れ疲労社畜", "孤高の成果主義社畜"] },

      FAMILY: { key:"FAMILY", name:"家庭が大事社員", icon:"🏡",
        desc:"低献身・低犠牲・人間関係高。家族や私生活を大切にするバランス型。",
        centroid:{d:25,s:25,r:55,h:85}, tags:["安定","ライフ重視"],
        level: 20,
        style: "仕事は生活を支えるための手段。定時で帰宅し、週末は家族と過ごすことを何よりも大切に。子どもの学校行事には必ず参加し、家族旅行を楽しみます。仕事のストレスを家庭に持ち込まないよう心がけています。",
        advice: "人間関係も大切にし、友人や家族との絆を深めることに時間を使うバランス感覚は、人生全体の幸福度を高める重要な要素。仕事だけが人生ではないという考え方は、豊かな人生を送るための賢い選択です。",
        jobs: "パート・アルバイト、在宅ワーク、時短勤務、地域密着型ビジネス、フレックス可能な職種",
        compatibility: ["バランサー社員", "お人好し社員", "ゆるふわ社畜"] },

      LWB: { key:"LWB", name:"バランサー社員", icon:"⚖️",
        desc:"中庸で調和志向。仕事と生活の両立を重視するスマートワーカー。",
        centroid:{d:58,s:32,r:55,h:55}, tags:["調和","柔軟性"],
        level: 15,
        style: "無理をせず、自分のペースで働きながら、プライベートも充実させることを心がけています。残業は極力避け、有給休暇も計画的に取得。人間関係も適度な距離を保ち、深入りしすぎず、疎遠にもならないバランスを取っています。",
        advice: "ストレスを感じやすい性質のため、自分なりのストレス解消法を持ち、メンタルヘルスを管理。仕事も大切、プライベートも大切、そして自分の健康が最も大切という考え方は、これからの時代に最も求められる価値観です。",
        jobs: "公務員、教員、事務職、契約社員、リモートワーク職、フレックス制の企業、福利厚生充実企業",
        compatibility: ["マイペース社員", "家庭が大事社員", "誠実な観察社員"] },

      ABLE: { key:"ABLE", name:"成果最適化社畜", icon:"🚀",
        desc:"高献身・中犠牲・高耐性。戦略的に動く結果重視タイプ。",
        centroid:{d:78,s:55,r:85,h:55}, tags:["戦略性","効率重視"],
        level: 10,
        style: "自分が第一線で働くよりも、チームを率いて目標を達成することに長けています。自分自身は無理をせず、効率的に働きながら、周囲の人々の能力を最大限に引き出します。人間関係を戦略的に構築します。",
        advice: "ストレスマネジメントが上手で、プレッシャーの中でも冷静に判断を下せます。部下や同僚からの信頼も厚く、困難な状況でもチームをまとめ上げる力があります。このリーダーシップを活かし、さらに高みを目指してください。",
        jobs: "経営者、マネージャー、コンサルタント、営業部長、人事部長、起業家、政治家",
        compatibility: ["共創リーダー社員", "無敗の職人社畜", "自由人"] },

      FREE: { key:"FREE", name:"自由人", icon:"🕊️",
        desc:"全軸が低い自由奔放タイプ。自分の感性を軸に生きるクリエイター気質。",
        rare:true, tags:["自由","創造性"],
        centroid:{d:5,s:5,r:5,h:5},
        level: 0,
        style: "仕事に縛られることなく、自分の時間を大切にし、やりたいことを自由にやる生き方を選択。ストレスフリーな環境を作り出すことに長けており、無駄なプレッシャーを感じることなく日々を過ごしています。",
        advice: "趣味や旅行、自己啓発など、人生を豊かにする様々な活動に時間を使います。束縛を嫌い、自分の人生を自分でデザインするあなたの姿勢は、真の幸福を手に入れるための最高の方法。この自由を謳歌し続けてください。",
        jobs: "フリーランス、起業家、YouTuber、ブロガー、投資家、アーティスト、ノマドワーカー",
        compatibility: ["成果最適化社畜", "マイペース社員", "バランサー社員"] },
    };

    // 6) 診断フロー（UIは既存のまま）
    function getResultType(normalizedScores) {
        const ax = {
            d: normalizedScores.dedication,
            s: normalizedScores.sacrifice,
            r: normalizedScores.stress,
            h: normalizedScores.relationship
        };
        
        console.log('=== 診断デバッグ情報 ===');
        console.log('診断スコア:', ax);
        
        const rare = rareCheck(ax);              // レアはここで確定
        const picked = rare || pickNonRareBalanced(ax); // 非レアは等確率の決定的割当
        
        console.log('選択されたタイプ:', picked.name);
        console.log('=== 診断デバッグ終了 ===');
        
        return picked;
    }
    
    const resultType = getResultType(normalizedScores);
    
    console.log('総合スコア:', (normalizedScores.dedication + normalizedScores.sacrifice + normalizedScores.stress + normalizedScores.relationship) / 4);
    console.log('結果タイプ:', resultType.name);
    
    // resultTypes配列から対応するタイプを取得
    console.log('resultType.name:', resultType.name);
    console.log('resultTypes配列の名前一覧:', resultTypes.map(t => t.name));
    
    // 直接TYPESオブジェクトの情報を使用（resultTypes配列の問題を回避）
    console.log('resultType全体:', resultType);
    console.log('resultType.desc:', resultType.desc);
    
    // TYPESオブジェクトから正しい情報を取得
    const typeKey = Object.keys(TYPES).find(key => TYPES[key].name === resultType.name);
    console.log('typeKey:', typeKey);
    
    // TYPESオブジェクトから直接情報を取得
    let matchedType;
    if (typeKey && TYPES[typeKey]) {
        const typeData = TYPES[typeKey];
        matchedType = {
            name: typeData.name,
            icon: typeData.icon,
            level: typeData.level || 0,
            features: typeData.desc || '詳細情報が利用できません',
            style: typeData.style || '詳細情報が利用できません',
            advice: typeData.advice || '詳細情報が利用できません',
            jobs: typeData.jobs || '詳細情報が利用できません',
            compatibility: typeData.compatibility || []
        };
    } else {
        // フォールバック
        matchedType = {
            name: resultType.name,
            icon: resultType.icon,
            level: 0,
            features: '詳細情報が利用できません',
            style: '詳細情報が利用できません',
            advice: '詳細情報が利用できません',
            jobs: '詳細情報が利用できません',
            compatibility: []
        };
    }
    
    console.log('matchedType (TYPES直接使用):', matchedType);
    
    // タイプに応じたクラスを追加（TYPESオブジェクトのキー順序を使用）
    const typeKeys = Object.keys(TYPES);
    const typeIndex = typeKeys.findIndex(key => TYPES[key].name === resultType.name);
    if (typeIndex === -1) {
        console.warn('typeIndexが見つからないため、デフォルト値を使用');
        const defaultIndex = 0; // デフォルトで0を使用
        resultCard.className = 'result-card';
        resultCard.classList.add(`result-type-${defaultIndex}`);
        resultScreen.className = 'screen active';
        resultScreen.classList.add(`result-theme-${defaultIndex}`);
    } else {
        resultCard.className = 'result-card';
        resultCard.classList.add(`result-type-${typeIndex}`);
        resultScreen.className = 'screen active';
        resultScreen.classList.add(`result-theme-${typeIndex}`);
    }
    
    // 結果を表示
    const resultIconEl = document.getElementById('result-icon');
    // 16種類すべてに順番に画像を配置（001.png～016.png）
    const actualTypeIndex = typeIndex === -1 ? 0 : typeIndex;
    const imageNumber = String(actualTypeIndex + 1).padStart(3, '0'); // 001, 002, ..., 016
    resultIconEl.innerHTML = `<img src="10_社畜アイコン/${imageNumber}.png" alt="${resultType.name}" class="result-image">`;
    document.getElementById('result-type').textContent = resultType.name;
    
    // 社畜レベルを表示
    const shachuLevelEl = document.getElementById('shachu-level');
    const shachuLevelBarEl = document.getElementById('shachu-level-bar');
    if (shachuLevelEl) shachuLevelEl.textContent = matchedType.level || 0;
    if (shachuLevelBarEl) {
        setTimeout(() => {
            shachuLevelBarEl.style.width = (matchedType.level || 0) + '%';
        }, 500);
    }
    
    // 3つのセクションに分けて表示
    const featuresEl = document.getElementById('result-features');
    const styleEl = document.getElementById('result-style');
    const adviceEl = document.getElementById('result-advice');
    const jobsEl = document.getElementById('result-jobs');
    const compatibilityEl = document.getElementById('result-compatibility');
    
    // 緊急対応：強制的に詳細情報を表示
    console.log('詳細情報表示開始');
    console.log('featuresEl:', featuresEl);
    console.log('matchedType.features:', matchedType.features);
    
    if (featuresEl) {
        featuresEl.textContent = matchedType.features || '詳細情報が利用できません';
        console.log('featuresEl.textContent設定完了:', featuresEl.textContent);
    } else {
        console.error('featuresElが見つかりません');
    }
    
    if (styleEl) {
        styleEl.textContent = matchedType.style || '詳細情報が利用できません';
        console.log('styleEl.textContent設定完了:', styleEl.textContent);
    } else {
        console.error('styleElが見つかりません');
    }
    
    if (adviceEl) {
        adviceEl.textContent = matchedType.advice || '詳細情報が利用できません';
        console.log('adviceEl.textContent設定完了:', adviceEl.textContent);
    } else {
        console.error('adviceElが見つかりません');
    }
    
    if (jobsEl) {
        jobsEl.textContent = matchedType.jobs || '詳細情報が利用できません';
        console.log('jobsEl.textContent設定完了:', jobsEl.textContent);
    } else {
        console.error('jobsElが見つかりません');
    }
    
    // 相性の良いタイプを表示
    if (compatibilityEl && matchedType.compatibility) {
        compatibilityEl.innerHTML = '';
        matchedType.compatibility.forEach(typeName => {
            const compatTypeKey = Object.keys(TYPES).find(key => TYPES[key].name === typeName);
            if (compatTypeKey) {
                const compatType = TYPES[compatTypeKey];
                const compatTypeIndex = typeKeys.findIndex(key => key === compatTypeKey);
                const compatImageNumber = String(compatTypeIndex + 1).padStart(3, '0'); // 001, 002, ..., 016
                const compatItem = document.createElement('div');
                compatItem.className = 'compatibility-item';
                compatItem.innerHTML = `
                    <img src="10_社畜アイコン/${compatImageNumber}.png" alt="${compatType.name}" class="compat-icon">
                    <span class="compat-name">${compatType.name}</span>
                `;
                compatibilityEl.appendChild(compatItem);
            }
        });
    }
    
    // バーを更新
    setTimeout(() => {
        document.getElementById('dedication-bar').style.width = normalizedScores.dedication + '%';
        document.getElementById('sacrifice-bar').style.width = normalizedScores.sacrifice + '%';
        document.getElementById('stress-bar').style.width = normalizedScores.stress + '%';
        document.getElementById('relationship-bar').style.width = normalizedScores.relationship + '%';
    }, 300);
    
    // 診断結果を保存
    const resultData = {
        resultType: resultType.name,
        shachuLevel: resultType.level || 0,
        scores: normalizedScores,
        rawScores: scores,
        typeIndex: typeIndex,
        timestamp: new Date()
    };
    
    // Google Sheetsに保存（他端末・別ネットワークでも共有可能）
    if (window.SheetsAPI) {
        window.SheetsAPI.saveDiagnosisToSheets(resultData);
    }
    
    // ローカルストレージにもバックアップ保存
    if (window.LocalAnalytics) {
        window.LocalAnalytics.saveDiagnosisResult(resultData);
    }
    
    // スマホとPCでデータを共有するため、URLパラメータに結果を追加
    addResultToURL(resultData);
    
    // QRコードを表示（スマホとPCでデータ共有用）
    showQRCode(resultData);
}

// リセット
function resetQuiz() {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
    
    // bodyの背景を元のピンクに戻す
    document.body.style.background = 'linear-gradient(135deg, #ffeef8 0%, #ffb3d9 50%, #ff85c0 100%)';
    document.body.classList.remove('pink-theme', 'orange-theme', 'green-theme');
    // 浮遊絵文字を削除
    document.querySelectorAll('.floating-emoji').forEach(el => el.remove());
}

// 結果をシェア
function shareResult() {
    const resultType = document.getElementById('result-type').textContent;
    const shareText = `私の社畜診断結果は「${resultType}」でした！ #社畜診断`;
    
    if (navigator.share) {
        navigator.share({
            title: '社畜診断',
            text: shareText,
            url: window.location.href
        }).catch(err => console.log('シェアがキャンセルされました'));
    } else {
        // フォールバック：クリップボードにコピー
        navigator.clipboard.writeText(shareText).then(() => {
            alert('結果をクリップボードにコピーしました！');
        }).catch(() => {
            alert(shareText);
        });
    }
}

// 診断結果をURLパラメータに追加（スマホとPCでデータ共有用）
function addResultToURL(resultData) {
    try {
        // 結果データをエンコード
        const encodedData = btoa(JSON.stringify(resultData));
        
        // 現在のURLにパラメータを追加
        const url = new URL(window.location);
        url.searchParams.set('result', encodedData);
        url.searchParams.set('timestamp', Date.now().toString());
        
        // URLを更新（履歴に追加しない）
        window.history.replaceState({}, '', url);
        
        // 管理者画面へのリンクを表示
        showAdminLink();
        
        console.log('診断結果をURLに追加しました:', encodedData);
    } catch (error) {
        console.error('URLパラメータ追加エラー:', error);
    }
}

// QRコードを表示（スマホとPCでデータ共有用）
function showQRCode(resultData) {
    // 既存のQRコードを削除
    const existingQR = document.getElementById('qr-modal');
    if (existingQR) {
        existingQR.remove();
    }
    
    // 結果データをエンコード
    const encodedData = btoa(JSON.stringify(resultData));
    const shareUrl = `https://shindan.syachiku-life.com/admin.html?result=${encodedData}&t=${Date.now()}`;
    
    // QRコードモーダルを作成
    const qrModal = document.createElement('div');
    qrModal.id = 'qr-modal';
    qrModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    qrModal.innerHTML = `
        <div style="
            background: white;
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            max-width: 90%;
            max-height: 90%;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        ">
            <h3 style="margin-bottom: 20px; color: #2d3748;">📱 PCで管理者画面を開く</h3>
            <div id="qrcode" style="margin: 20px 0;"></div>
            <p style="margin: 15px 0; color: #718096; font-size: 0.9rem;">
                QRコードをスキャンしてPCで管理者画面を開くか、<br>
                下のボタンでURLをコピーしてください
            </p>
            <div style="margin: 20px 0;">
                <button id="copy-url-btn" style="
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 25px;
                    font-weight: bold;
                    cursor: pointer;
                    margin: 5px;
                    transition: all 0.3s ease;
                ">📋 URLをコピー</button>
                <button id="open-admin-btn" style="
                    background: linear-gradient(135deg, #48bb78, #38a169);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 25px;
                    font-weight: bold;
                    cursor: pointer;
                    margin: 5px;
                    transition: all 0.3s ease;
                ">📊 管理者画面を開く</button>
            </div>
            <button id="close-qr-btn" style="
                background: #e53e3e;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 20px;
                cursor: pointer;
                margin-top: 10px;
            ">✕ 閉じる</button>
        </div>
    `;
    
    document.body.appendChild(qrModal);
    
    // QRコードを生成
    if (typeof QRCode !== 'undefined') {
        QRCode.toCanvas(document.getElementById('qrcode'), shareUrl, {
            width: 200,
            height: 200,
            color: {
                dark: '#2d3748',
                light: '#ffffff'
            }
        }, function (error) {
            if (error) {
                console.error('QRコード生成エラー:', error);
                document.getElementById('qrcode').innerHTML = '<p style="color: #e53e3e;">QRコード生成に失敗しました</p>';
            }
        });
    } else {
        document.getElementById('qrcode').innerHTML = '<p style="color: #e53e3e;">QRコードライブラリが読み込まれていません</p>';
    }
    
    // イベントリスナー
    document.getElementById('copy-url-btn').addEventListener('click', function() {
        navigator.clipboard.writeText(shareUrl).then(() => {
            this.textContent = '✅ コピー完了！';
            this.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
            setTimeout(() => {
                this.textContent = '📋 URLをコピー';
                this.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            }, 2000);
        }).catch(() => {
            alert('URLをコピーできませんでした: ' + shareUrl);
        });
    });
    
    document.getElementById('open-admin-btn').addEventListener('click', function() {
        window.open(shareUrl, '_blank');
    });
    
    document.getElementById('close-qr-btn').addEventListener('click', function() {
        qrModal.remove();
    });
    
    // 背景クリックで閉じる
    qrModal.addEventListener('click', function(e) {
        if (e.target === qrModal) {
            qrModal.remove();
        }
    });
    
    // 10秒後に自動で閉じる
    setTimeout(() => {
        if (qrModal.parentNode) {
            qrModal.style.opacity = '0';
            setTimeout(() => {
                if (qrModal.parentNode) {
                    qrModal.remove();
                }
            }, 300);
        }
    }, 10000);
}

// 管理者画面へのリンクを表示
function showAdminLink() {
    // 既存のリンクを削除
    const existingLink = document.getElementById('admin-link');
    if (existingLink) {
        existingLink.remove();
    }
    
    // 新しいリンクを作成
    const adminLink = document.createElement('div');
    adminLink.id = 'admin-link';
    adminLink.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 15px 20px;
        border-radius: 25px;
        text-decoration: none;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    adminLink.innerHTML = '📊 管理者画面で確認';
    
    // クリックイベント
    adminLink.addEventListener('click', function() {
        const adminUrl = `https://shindan.syachiku-life.com/admin.html?from=result&t=${Date.now()}`;
        window.open(adminUrl, '_blank');
    });
    
    // ホバーエフェクト
    adminLink.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
    });
    
    adminLink.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    });
    
    document.body.appendChild(adminLink);
    
    // 5秒後に自動で非表示
    setTimeout(() => {
        if (adminLink.parentNode) {
            adminLink.style.opacity = '0';
            adminLink.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (adminLink.parentNode) {
                    adminLink.remove();
                }
            }, 300);
        }
    }, 5000);
}

// キャラクター一覧を表示
function showCharacters() {
    try {
        window.open('characters.html', '_blank');
    } catch (error) {
        console.error('キャラクター一覧表示エラー:', error);
        alert('エラーが発生しました。もう一度お試しください。');
    }
}

// 育成開始（シャチポケに遷移）
function startNurture() {
    try {
        const resultType = document.getElementById('result-type').textContent;
        const resultIconEl = document.getElementById('result-icon');
        const resultIcon = resultIconEl.querySelector('img') ? resultIconEl.querySelector('img').src : '';
        
        // 診断結果をパラメーターとしてエンコード
        const params = new URLSearchParams({
            character: resultType,
            icon: resultIcon,
            from: 'shindan'
        });
        
        // シャチポケに遷移（別タブで開く）
        const targetUrl = `http://shachipoke.syachiku-life.com/?${params.toString()}`;
        
        console.log('シャチポケに遷移:', targetUrl);
        console.log('パラメーター:', {
            character: resultType,
            icon: resultIcon
        });
        
        window.open(targetUrl, '_blank');
    } catch (error) {
        console.error('育成ボタンエラー:', error);
        alert('エラーが発生しました。もう一度お試しください。');
    }
}

