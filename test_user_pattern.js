// ユーザーの実際の回答パターンをシミュレート
// ランダムではなく、人間らしい回答（中間値を選びやすい）

const questionsOriginal = [
    { axes: { dedication: 1, sacrifice: 1, stress: 0.5, relationship: 0 } },
    { axes: { dedication: 0.8, sacrifice: 1, stress: 0, relationship: 0 } },
    { axes: { dedication: 0.7, sacrifice: 0.6, stress: 0, relationship: 1 } },
    { axes: { dedication: 0.9, sacrifice: 1, stress: 0.7, relationship: 0 } },
    { axes: { dedication: 0.3, sacrifice: 0.7, stress: 0, relationship: 1 } },
    { axes: { dedication: 0.5, sacrifice: 0.6, stress: 0, relationship: 1 } },
    { axes: { dedication: 0.8, sacrifice: 0.8, stress: 0.5, relationship: 0.3 } },
    { axes: { dedication: 0.7, sacrifice: 0.5, stress: 1, relationship: 0 } },
    { axes: { dedication: 1, sacrifice: 1, stress: 0, relationship: 0 } },
    { axes: { dedication: 0.9, sacrifice: 1, stress: 0, relationship: 0.5 } },
    { axes: { dedication: 1, sacrifice: 0, stress: 0, relationship: 0 }, reverse: true },
    { axes: { dedication: 0.8, sacrifice: 0, stress: 0, relationship: 0 }, reverse: true },
    { axes: { dedication: 0.7, sacrifice: 0, stress: 0, relationship: 0.5 }, reverse: true },
    { axes: { dedication: 0.6, sacrifice: 0, stress: 0.3, relationship: 0 }, reverse: true },
    { axes: { dedication: 0.9, sacrifice: 0, stress: 0, relationship: 0 }, reverse: true }
];

const resultTypes = [
    "生粋の社畜", "バーンアウト予備軍", "ストイック社畜", "デキる社員", "自己犠牲型",
    "ゆるふわ社畜", "仕事中毒", "バランス型社畜", "普通の社員", "コミュニケーション重視",
    "効率重視", "カウンセラー系", "アナリスト系", "普通の人", "自由人", "ワークライフバランス重視"
];

// 人間らしい回答パターン（中間値に偏る）
function getHumanLikeAnswer() {
    const rand = Math.random();
    if (rand < 0.15) return 0;  // 15%
    if (rand < 0.30) return 1;  // 15%
    if (rand < 0.50) return 2;  // 20%
    if (rand < 0.75) return 3;  // 25%
    if (rand < 0.90) return 4;  // 15%
    return 5;                   // 10%
}

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

function normalizeScores(scores) {
    let maxDedication = 0, minDedication = 0;
    let maxSacrifice = 0, minSacrifice = 0;
    let maxStress = 0, minStress = 0;
    let maxRelationship = 0, minRelationship = 0;
    
    questionsOriginal.forEach(q => {
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

function getLevel(score) {
    if (score >= 60) return 'high';
    if (score >= 35) return 'medium';
    return 'low';
}

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

// テスト実行
console.log('=== 人間らしい回答パターンで1000回テスト ===\n');

const results = new Array(16).fill(0);
const patternCounts = {};

for (let i = 0; i < 1000; i++) {
    const answers = Array.from({ length: 15 }, () => getHumanLikeAnswer());
    const rawScores = calculateScores(answers);
    const normalizedScores = normalizeScores(rawScores);
    const pattern = `${getLevel(normalizedScores.dedication)}-${getLevel(normalizedScores.sacrifice)}-${getLevel(normalizedScores.stress)}-${getLevel(normalizedScores.relationship)}`;
    const resultIndex = patternMap[pattern] !== undefined ? patternMap[pattern] : 8;
    
    results[resultIndex]++;
    patternCounts[pattern] = (patternCounts[pattern] || 0) + 1;
}

console.log('結果分布:\n');
resultTypes.forEach((type, index) => {
    const count = results[index];
    const percentage = (count / 1000 * 100).toFixed(1);
    const bar = '█'.repeat(Math.floor(count / 10));
    console.log(`${index.toString().padStart(2)}. ${type.padEnd(20)} | ${count.toString().padStart(4)}回 (${percentage.padStart(5)}%) ${bar}`);
});

console.log('\n=== パターン分布（上位20） ===\n');
const sortedPatterns = Object.entries(patternCounts).sort((a, b) => b[1] - a[1]).slice(0, 20);
sortedPatterns.forEach(([pattern, count]) => {
    const resultIndex = patternMap[pattern];
    const resultName = resultTypes[resultIndex] || 'Unknown';
    console.log(`${pattern.padEnd(25)} → ${resultName.padEnd(20)} | ${count.toString().padStart(3)}回`);
});

console.log('\n=== 問題分析 ===');
console.log(`No.3 デキる社員: ${results[3]}回`);
console.log(`No.4 自己犠牲型: ${results[4]}回`);
console.log(`No.5 ゆるふわ社畜: ${results[5]}回`);
console.log(`No.8 普通の社員: ${results[8]}回`);
console.log(`No.10 効率重視: ${results[10]}回`);

const zeroCount = results.filter(r => r === 0).length;
console.log(`\n0回のタイプ数: ${zeroCount}個`);

