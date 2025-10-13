// 診断ロジックのテスト - 1000回ランダム実行して分布を確認

// 質問データ（script.jsから抽出）
const questionsOriginal = [
    {
        text: "終電の時間でも仕事が終わっていなければ残る",
        axes: { dedication: 1, sacrifice: 1, stress: 0.5, relationship: 0 }
    },
    {
        text: "お腹が空いたが午後の仕事に向けてランチを抜く",
        axes: { dedication: 0.8, sacrifice: 1, stress: 0, relationship: 0 }
    },
    {
        text: "上司からの休日の連絡にすぐ返信する",
        axes: { dedication: 0.7, sacrifice: 0.6, stress: 0, relationship: 1 }
    },
    {
        text: "体調が悪くても会社に出勤する",
        axes: { dedication: 0.9, sacrifice: 1, stress: 0.7, relationship: 0 }
    },
    {
        text: "同僚が困っていたら自分の仕事を後回しにして手伝う",
        axes: { dedication: 0.3, sacrifice: 0.7, stress: 0, relationship: 1 }
    },
    {
        text: "会社の飲み会は全て参加する",
        axes: { dedication: 0.5, sacrifice: 0.6, stress: 0, relationship: 1 }
    },
    {
        text: "有給休暇を取ることに罪悪感を感じる",
        axes: { dedication: 0.8, sacrifice: 0.8, stress: 0.5, relationship: 0.3 }
    },
    {
        text: "仕事のことを考えて眠れない夜がある",
        axes: { dedication: 0.7, sacrifice: 0.5, stress: 1, relationship: 0 }
    },
    {
        text: "家族や友人との約束より仕事を優先する",
        axes: { dedication: 1, sacrifice: 1, stress: 0, relationship: 0 }
    },
    {
        text: "会社のために自腹で備品や飲食物を購入することがある",
        axes: { dedication: 0.9, sacrifice: 1, stress: 0, relationship: 0.5 }
    },
    {
        text: "在宅ワークで昼寝をしている人が羨ましい",
        axes: { dedication: 1, sacrifice: 0, stress: 0, relationship: 0 },
        reverse: true
    },
    {
        text: "金曜日の夕方、やる気が出ない",
        axes: { dedication: 0.8, sacrifice: 0, stress: 0, relationship: 0 },
        reverse: true
    },
    {
        text: "会議中にスマホをいじったことがある",
        axes: { dedication: 0.7, sacrifice: 0, stress: 0, relationship: 0.5 },
        reverse: true
    },
    {
        text: "締め切り前日にならないとやる気が出ない",
        axes: { dedication: 0.6, sacrifice: 0, stress: 0.3, relationship: 0 },
        reverse: true
    },
    {
        text: "仕事中にネットサーフィンをする",
        axes: { dedication: 0.9, sacrifice: 0, stress: 0, relationship: 0 },
        reverse: true
    }
];

const resultTypes = [
    { name: "生粋の社畜", index: 0 },
    { name: "バーンアウト予備軍", index: 1 },
    { name: "ストイック社畜", index: 2 },
    { name: "デキる社員", index: 3 },
    { name: "自己犠牲型", index: 4 },
    { name: "ゆるふわ社畜", index: 5 },
    { name: "仕事中毒", index: 6 },
    { name: "バランス型社畜", index: 7 },
    { name: "普通の社員", index: 8 },
    { name: "コミュニケーション重視", index: 9 },
    { name: "効率重視", index: 10 },
    { name: "カウンセラー系", index: 11 },
    { name: "アナリスト系", index: 12 },
    { name: "普通の人", index: 13 },
    { name: "自由人", index: 14 },
    { name: "ワークライフバランス重視", index: 15 }
];

// ランダムな回答を生成（0-5のランダム値）
function getRandomAnswer() {
    return Math.floor(Math.random() * 6);
}

// スコア計算
function calculateScores(answers) {
    const scores = { dedication: 0, sacrifice: 0, stress: 0, relationship: 0 };
    
    questionsOriginal.forEach((q, i) => {
        const value = answers[i];
        const multiplier = q.reverse ? -1 : 1;
        
        scores.dedication += q.axes.dedication * value * multiplier;
        scores.sacrifice += q.axes.sacrifice * value * multiplier;
        scores.stress += q.axes.stress * value * multiplier;
        scores.relationship += q.axes.relationship * value * multiplier;
    });
    
    return scores;
}

// 正規化
function normalizeScores(scores, questions) {
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
        
        maxDedication += Math.max(dedWeight * 5, dedWeight * 0);
        minDedication += Math.min(dedWeight * 5, dedWeight * 0);
        
        maxSacrifice += Math.max(sacWeight * 5, sacWeight * 0);
        minSacrifice += Math.min(sacWeight * 5, sacWeight * 0);
        
        maxStress += Math.max(strWeight * 5, strWeight * 0);
        minStress += Math.min(strWeight * 5, strWeight * 0);
        
        maxRelationship += Math.max(relWeight * 5, relWeight * 0);
        minRelationship += Math.min(relWeight * 5, relWeight * 0);
    });
    
    function normalizeScore(score, min, max) {
        if (max === min) return 50;
        return Math.max(0, Math.min(100, ((score - min) / (max - min)) * 100));
    }
    
    return {
        dedication: normalizeScore(scores.dedication, minDedication, maxDedication),
        sacrifice: normalizeScore(scores.sacrifice, minSacrifice, maxSacrifice),
        stress: normalizeScore(scores.stress, minStress, maxStress),
        relationship: normalizeScore(scores.relationship, minRelationship, maxRelationship)
    };
}

// レベル判定
function getLevel(score) {
    if (score >= 60) return 'high';
    if (score >= 35) return 'medium';
    return 'low';
}

// パターンマップ（script.jsから抽出）
const patternMap = {
    'high-high-high-high': 0, 'high-high-high-medium': 0, 'high-high-high-low': 2,
    'high-high-medium-high': 0, 'high-high-medium-medium': 6, 'high-high-medium-low': 6,
    'high-high-low-high': 3, 'high-high-low-medium': 3, 'high-high-low-low': 3,
    'high-medium-high-high': 2, 'high-medium-high-medium': 7, 'high-medium-high-low': 7,
    'high-medium-medium-high': 7, 'high-medium-medium-medium': 6, 'high-medium-medium-low': 10,
    'high-medium-low-high': 10, 'high-medium-low-medium': 10, 'high-medium-low-low': 10,
    'high-low-high-high': 4, 'high-low-high-medium': 4, 'high-low-high-low': 4,
    'high-low-medium-high': 10, 'high-low-medium-medium': 10, 'high-low-medium-low': 10,
    'high-low-low-high': 10, 'high-low-low-medium': 10, 'high-low-low-low': 10,
    'medium-high-high-high': 1, 'medium-high-high-medium': 8, 'medium-high-high-low': 8,
    'medium-high-medium-high': 11, 'medium-high-medium-medium': 8, 'medium-high-medium-low': 11,
    'medium-high-low-high': 11, 'medium-high-low-medium': 11, 'medium-high-low-low': 11,
    'medium-medium-high-high': 9, 'medium-medium-high-medium': 9, 'medium-medium-high-low': 12,
    'medium-medium-medium-high': 9, 'medium-medium-medium-medium': 8, 'medium-medium-medium-low': 10,
    'medium-medium-low-high': 13, 'medium-medium-low-medium': 10, 'medium-medium-low-low': 10,
    'medium-low-high-high': 12, 'medium-low-high-medium': 12, 'medium-low-high-low': 12,
    'medium-low-medium-high': 10, 'medium-low-medium-medium': 10, 'medium-low-medium-low': 10,
    'medium-low-low-high': 10, 'medium-low-low-medium': 10, 'medium-low-low-low': 15,
    'low-high-high-high': 5, 'low-high-high-medium': 11, 'low-high-high-low': 13,
    'low-high-medium-high': 5, 'low-high-medium-medium': 11, 'low-high-medium-low': 11,
    'low-high-low-high': 13, 'low-high-low-medium': 13, 'low-high-low-low': 15,
    'low-medium-high-high': 13, 'low-medium-high-medium': 13, 'low-medium-high-low': 13,
    'low-medium-medium-high': 13, 'low-medium-medium-medium': 13, 'low-medium-medium-low': 15,
    'low-medium-low-high': 15, 'low-medium-low-medium': 15, 'low-medium-low-low': 14,
    'low-low-high-high': 15, 'low-low-high-medium': 15, 'low-low-high-low': 15,
    'low-low-medium-high': 15, 'low-low-medium-medium': 15, 'low-low-medium-low': 14,
    'low-low-low-high': 14, 'low-low-low-medium': 14, 'low-low-low-low': 14
};

// 診断実行
function diagnose(answers) {
    const rawScores = calculateScores(answers);
    const normalizedScores = normalizeScores(rawScores, questionsOriginal);
    
    const pattern = `${getLevel(normalizedScores.dedication)}-${getLevel(normalizedScores.sacrifice)}-${getLevel(normalizedScores.stress)}-${getLevel(normalizedScores.relationship)}`;
    
    const resultIndex = patternMap[pattern];
    return resultIndex !== undefined ? resultIndex : 8;
}

// 1000回テスト
console.log('=== 1000回ランダムテスト開始 ===\n');

const results = new Array(16).fill(0);
const patternCounts = {};
const allResults = [];

for (let i = 0; i < 1000; i++) {
    const answers = Array.from({ length: 15 }, () => getRandomAnswer());
    const rawScores = calculateScores(answers);
    const normalizedScores = normalizeScores(rawScores, questionsOriginal);
    const pattern = `${getLevel(normalizedScores.dedication)}-${getLevel(normalizedScores.sacrifice)}-${getLevel(normalizedScores.stress)}-${getLevel(normalizedScores.relationship)}`;
    const resultIndex = diagnose(answers);
    
    results[resultIndex]++;
    patternCounts[pattern] = (patternCounts[pattern] || 0) + 1;
    
    allResults.push({
        test: i + 1,
        pattern: pattern,
        scores: normalizedScores,
        result: resultTypes[resultIndex].name
    });
}

// 全1000回の詳細を出力
console.log('=== 全1000回の詳細結果 ===\n');
allResults.forEach(r => {
    console.log(`Test ${r.test.toString().padStart(4)}: ${r.pattern.padEnd(25)} → ${r.result.padEnd(20)} (D:${r.scores.dedication.toFixed(1)}, S:${r.scores.sacrifice.toFixed(1)}, St:${r.scores.stress.toFixed(1)}, R:${r.scores.relationship.toFixed(1)})`);
});

console.log('\n\n=== 結果分布 ===\n');
resultTypes.forEach((type, index) => {
    const count = results[index];
    const percentage = (count / 1000 * 100).toFixed(1);
    const bar = '█'.repeat(Math.floor(count / 10));
    console.log(`${index.toString().padStart(2)}. ${type.name.padEnd(20)} | ${count.toString().padStart(4)}回 (${percentage.padStart(5)}%) ${bar}`);
});

console.log('\n=== パターン分布（上位20） ===\n');
const sortedPatterns = Object.entries(patternCounts).sort((a, b) => b[1] - a[1]).slice(0, 20);
sortedPatterns.forEach(([pattern, count]) => {
    const resultIndex = patternMap[pattern];
    const resultName = resultTypes[resultIndex]?.name || 'Unknown';
    console.log(`${pattern.padEnd(25)} → ${resultName.padEnd(20)} | ${count.toString().padStart(3)}回`);
});

console.log('\n=== 問題のある結果 ===');
console.log(`No.5 ゆるふわ社畜: ${results[5]}回 (期待値: 約25回 = 2.5%)`);
console.log(`No.10 効率重視: ${results[10]}回 (期待値: 約220回 = 22%)`);

// 異常値チェック
if (results[5] > 100) {
    console.log('\n❌ ゆるふわ社畜が異常に多い！');
} else {
    console.log('\n✅ ゆるふわ社畜は正常範囲');
}
if (results[10] < 100) {
    console.log('\n❌ 効率重視が異常に少ない！');
} else {
    console.log('\n✅ 効率重視は正常範囲');
}

