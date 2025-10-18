// 診断分布テストスクリプト
// 1000回ランダム診断を実行して分布を確認

// 質問データ（簡略版）
const questions = [
    { dedication: 1, sacrifice: 0, stress: 0, relationship: 0 },
    { dedication: 0, sacrifice: 1, stress: 0, relationship: 0 },
    { dedication: 0, sacrifice: 0, stress: 1, relationship: 0 },
    { dedication: 0, sacrifice: 0, stress: 0, relationship: 1 },
    { dedication: 1, sacrifice: 1, stress: 0, relationship: 0 },
    { dedication: 1, sacrifice: 0, stress: 1, relationship: 0 },
    { dedication: 1, sacrifice: 0, stress: 0, relationship: 1 },
    { dedication: 0, sacrifice: 1, stress: 1, relationship: 0 },
    { dedication: 0, sacrifice: 1, stress: 0, relationship: 1 },
    { dedication: 0, sacrifice: 0, stress: 1, relationship: 1 },
    { dedication: 1, sacrifice: 1, stress: 1, relationship: 0 },
    { dedication: 1, sacrifice: 1, stress: 0, relationship: 1 },
    { dedication: 1, sacrifice: 0, stress: 1, relationship: 1 },
    { dedication: 0, sacrifice: 1, stress: 1, relationship: 1 },
    { dedication: 1, sacrifice: 1, stress: 1, relationship: 1 },
    { dedication: 0, sacrifice: 0, stress: 0, relationship: 0 }
];

// 結果タイプ（簡略版）
const resultTypes = [
    { name: "生粋の社畜", index: 0 },
    { name: "バーンアウト予備軍", index: 1 },
    { name: "ストイック社畜", index: 2 },
    { name: "一匹狼ワーカー", index: 3 },
    { name: "心優しき社畜", index: 4 },
    { name: "繊細ワーカー", index: 5 },
    { name: "チームプレイヤー", index: 6 },
    { name: "マイペース社員", index: 7 },
    { name: "ゆるふわ社畜", index: 8 },
    { name: "デキる社員", index: 9 },
    { name: "現実派社員", index: 10 },
    { name: "お人好し社員", index: 11 },
    { name: "ライフワークバランス", index: 12 },
    { name: "自由人", index: 13 },
    { name: "普通の社員", index: 14 },
    { name: "その他", index: 15 }
];

// スコア計算関数
function calculateScores(answers) {
    const scores = { dedication: 0, sacrifice: 0, stress: 0, relationship: 0 };
    
    answers.forEach((answer, index) => {
        const question = questions[index % questions.length];
        scores.dedication += question.dedication * answer;
        scores.sacrifice += question.sacrifice * answer;
        scores.stress += question.stress * answer;
        scores.relationship += question.relationship * answer;
    });
    
    return scores;
}

// スコア正規化関数
function normalizeScores(scores) {
    const maxPossible = 16; // 16問 × 最大値1
    return {
        dedication: Math.round((scores.dedication / maxPossible) * 100),
        sacrifice: Math.round((scores.sacrifice / maxPossible) * 100),
        stress: Math.round((scores.stress / maxPossible) * 100),
        relationship: Math.round((scores.relationship / maxPossible) * 100)
    };
}

// レベル判定関数
function getLevel(score) {
    if (score >= 60) return 'high';
    if (score >= 35) return 'medium';
    return 'low';
}

// パターンマップ（現在の実装）
const patternMap = {
    // === HIGH-HIGH ===
    'high-high-high-high': resultTypes[0],   // 生粋の社畜（レア）
    'high-high-high-low': resultTypes[2],    // ストイック社畜
    'high-high-high-medium': resultTypes[0], // 生粋の社畜（レア）
    'high-high-low-high': resultTypes[6],    // チームプレイヤー
    'high-high-low-low': resultTypes[3],     // 一匹狼ワーカー
    'high-high-low-medium': resultTypes[6],  // チームプレイヤー
    'high-high-medium-high': resultTypes[1], // バーンアウト予備軍
    'high-high-medium-low': resultTypes[2],  // ストイック社畜
    'high-high-medium-medium': resultTypes[2], // ストイック社畜
    // === HIGH-MEDIUM ===
    'high-medium-high-high': resultTypes[4], // 心優しき社畜
    'high-medium-high-low': resultTypes[5],  // 繊細ワーカー
    'high-medium-high-medium': resultTypes[4], // 心優しき社畜
    'high-medium-low-high': resultTypes[6],  // チームプレイヤー
    'high-medium-low-low': resultTypes[3],   // 一匹狼ワーカー
    'high-medium-low-medium': resultTypes[3], // 一匹狼ワーカー
    'high-medium-medium-high': resultTypes[4], // 心優しき社畜
    'high-medium-medium-low': resultTypes[5], // 繊細ワーカー
    'high-medium-medium-medium': resultTypes[7], // マイペース社員
    // === HIGH-LOW ===
    'high-low-high-high': resultTypes[4],    // 心優しき社畜
    'high-low-high-low': resultTypes[5],     // 繊細ワーカー
    'high-low-high-medium': resultTypes[4],  // 心優しき社畜
    'high-low-low-high': resultTypes[6],     // チームプレイヤー
    'high-low-low-low': resultTypes[3],      // 一匹狼ワーカー
    'high-low-low-medium': resultTypes[3],   // 一匹狼ワーカー
    'high-low-medium-high': resultTypes[4],  // 心優しき社畜
    'high-low-medium-low': resultTypes[5],   // 繊細ワーカー
    'high-low-medium-medium': resultTypes[7], // マイペース社員
    // === MEDIUM-HIGH ===
    'medium-high-high-high': resultTypes[1], // バーンアウト予備軍
    'medium-high-high-low': resultTypes[2],  // ストイック社畜
    'medium-high-high-medium': resultTypes[1], // バーンアウト予備軍
    'medium-high-low-high': resultTypes[6],  // チームプレイヤー
    'medium-high-low-low': resultTypes[3],   // 一匹狼ワーカー
    'medium-high-low-medium': resultTypes[6], // チームプレイヤー
    'medium-high-medium-high': resultTypes[1], // バーンアウト予備軍
    'medium-high-medium-low': resultTypes[2], // ストイック社畜
    'medium-high-medium-medium': resultTypes[2], // ストイック社畜
    // === MEDIUM-MEDIUM ===
    'medium-medium-high-high': resultTypes[4], // 心優しき社畜
    'medium-medium-high-low': resultTypes[5],  // 繊細ワーカー
    'medium-medium-high-medium': resultTypes[4], // 心優しき社畜
    'medium-medium-low-high': resultTypes[6],  // チームプレイヤー
    'medium-medium-low-low': resultTypes[3],   // 一匹狼ワーカー
    'medium-medium-low-medium': resultTypes[3], // 一匹狼ワーカー
    'medium-medium-medium-high': resultTypes[4], // 心優しき社畜
    'medium-medium-medium-low': resultTypes[5], // 繊細ワーカー
    'medium-medium-medium-medium': resultTypes[7], // マイペース社員
    // === MEDIUM-LOW ===
    'medium-low-high-high': resultTypes[4],   // 心優しき社畜
    'medium-low-high-low': resultTypes[5],    // 繊細ワーカー
    'medium-low-high-medium': resultTypes[4], // 心優しき社畜
    'medium-low-low-high': resultTypes[6],    // チームプレイヤー
    'medium-low-low-low': resultTypes[3],     // 一匹狼ワーカー
    'medium-low-low-medium': resultTypes[3],  // 一匹狼ワーカー
    'medium-low-medium-high': resultTypes[4], // 心優しき社畜
    'medium-low-medium-low': resultTypes[5],  // 繊細ワーカー
    'medium-low-medium-medium': resultTypes[7], // マイペース社員
    // === LOW-HIGH ===
    'low-high-high-high': resultTypes[1],     // バーンアウト予備軍
    'low-high-high-low': resultTypes[2],      // ストイック社畜
    'low-high-high-medium': resultTypes[1],   // バーンアウト予備軍
    'low-high-low-high': resultTypes[6],      // チームプレイヤー
    'low-high-low-low': resultTypes[3],       // 一匹狼ワーカー
    'low-high-low-medium': resultTypes[6],    // チームプレイヤー
    'low-high-medium-high': resultTypes[1],   // バーンアウト予備軍
    'low-high-medium-low': resultTypes[2],    // ストイック社畜
    'low-high-medium-medium': resultTypes[2], // ストイック社畜
    // === LOW-MEDIUM ===
    'low-medium-high-high': resultTypes[4],   // 心優しき社畜
    'low-medium-high-low': resultTypes[5],    // 繊細ワーカー
    'low-medium-high-medium': resultTypes[4], // 心優しき社畜
    'low-medium-low-high': resultTypes[6],    // チームプレイヤー
    'low-medium-low-low': resultTypes[3],     // 一匹狼ワーカー
    'low-medium-low-medium': resultTypes[3],  // 一匹狼ワーカー
    'low-medium-medium-high': resultTypes[4], // 心優しき社畜
    'low-medium-medium-low': resultTypes[5],  // 繊細ワーカー
    'low-medium-medium-medium': resultTypes[7], // マイペース社員
    // === LOW-LOW ===
    'low-low-high-high': resultTypes[4],      // 心優しき社畜
    'low-low-high-low': resultTypes[5],       // 繊細ワーカー
    'low-low-high-medium': resultTypes[4],    // 心優しき社畜
    'low-low-low-high': resultTypes[6],       // チームプレイヤー
    'low-low-low-low': resultTypes[3],        // 一匹狼ワーカー
    'low-low-low-medium': resultTypes[3],     // 一匹狼ワーカー
    'low-low-medium-high': resultTypes[4],    // 心優しき社畜
    'low-low-medium-low': resultTypes[5],     // 繊細ワーカー
    'low-low-medium-medium': resultTypes[7]   // マイペース社員
};

// 診断結果取得関数
function getResultType(normalizedScores) {
    const dedicationLevel = getLevel(normalizedScores.dedication);
    const sacrificeLevel = getLevel(normalizedScores.sacrifice);
    const stressLevel = getLevel(normalizedScores.stress);
    const relationshipLevel = getLevel(normalizedScores.relationship);
    
    const pattern = `${dedicationLevel}-${sacrificeLevel}-${stressLevel}-${relationshipLevel}`;
    const result = patternMap[pattern];
    
    return result || resultTypes[14]; // フォールバック: 普通の社員
}

// 1000回テスト実行
function runTest() {
    const results = {};
    const patternCounts = {};
    
    console.log('=== 1000回診断テスト開始 ===');
    
    for (let i = 0; i < 1000; i++) {
        // ランダムな回答を生成（0-5の値）
        const answers = Array(16).fill(0).map(() => Math.floor(Math.random() * 6));
        
        // スコア計算
        const scores = calculateScores(answers);
        const normalizedScores = normalizeScores(scores);
        
        // 結果取得
        const result = getResultType(normalizedScores);
        
        // カウント
        results[result.name] = (results[result.name] || 0) + 1;
        
        // パターンカウント
        const dedicationLevel = getLevel(normalizedScores.dedication);
        const sacrificeLevel = getLevel(normalizedScores.sacrifice);
        const stressLevel = getLevel(normalizedScores.stress);
        const relationshipLevel = getLevel(normalizedScores.relationship);
        const pattern = `${dedicationLevel}-${sacrificeLevel}-${stressLevel}-${relationshipLevel}`;
        patternCounts[pattern] = (patternCounts[pattern] || 0) + 1;
    }
    
    console.log('=== 結果分布 ===');
    Object.entries(results)
        .sort(([,a], [,b]) => b - a)
        .forEach(([name, count]) => {
            const percentage = ((count / 1000) * 100).toFixed(1);
            console.log(`${name}: ${count}回 (${percentage}%)`);
        });
    
    console.log('\n=== パターン分布（上位10位）===');
    Object.entries(patternCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .forEach(([pattern, count]) => {
            const percentage = ((count / 1000) * 100).toFixed(1);
            console.log(`${pattern}: ${count}回 (${percentage}%)`);
        });
    
    return results;
}

// テスト実行
runTest();
