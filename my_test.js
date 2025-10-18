// 自分で1000回テストを実行
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
    { name: "隠れ疲労タイプ", index: 9 },
    { name: "お人好し社員", index: 10 },
    { name: "現実派社員", index: 11 },
    { name: "家庭が大事", index: 12 },
    { name: "ライフワークバランス", index: 13 },
    { name: "デキる社員", index: 14 },
    { name: "自由人", index: 15 }
];

function calculateScores(answers) {
    const scores = { dedication: 0, sacrifice: 0, stress: 0, relationship: 0 };
    
    for (let i = 0; i < answers.length; i++) {
        const answer = answers[i];
        if (answer >= 3) {
            const axes = ['dedication', 'sacrifice', 'stress', 'relationship'];
            const axis = axes[Math.floor(Math.random() * axes.length)];
            scores[axis] += answer;
        }
    }
    
    return scores;
}

function normalizeScores(scores) {
    const maxPossible = 16 * 5;
    return {
        dedication: Math.round((scores.dedication / maxPossible) * 100),
        sacrifice: Math.round((scores.sacrifice / maxPossible) * 100),
        stress: Math.round((scores.stress / maxPossible) * 100),
        relationship: Math.round((scores.relationship / maxPossible) * 100)
    };
}

function getResultType(normalizedScores) {
    const { dedication, sacrifice, stress, relationship } = normalizedScores;
    
    // 生粋の社畜の条件（非常に厳しい - 5%程度）
    if (dedication >= 90 && sacrifice >= 90 && stress >= 90 && relationship >= 90) {
        return resultTypes[0];
    }
    
    // 自由人の条件（非常に厳しい - 5%程度）
    if (dedication <= 10 && sacrifice <= 10 && stress <= 10 && relationship <= 10) {
        return resultTypes[15];
    }
    
    // 残り14種類を平等に分布させる
    function getLevel(score) {
        if (score >= 60) return 'high';
        if (score >= 35) return 'medium';
        return 'low';
    }
    
    const dedicationLevel = getLevel(dedication);
    const sacrificeLevel = getLevel(sacrifice);
    const stressLevel = getLevel(stress);
    const relationshipLevel = getLevel(relationship);
    
    // パターンマップ（14種類を平等に分布）
    const patternMap = {
        'high-high-high-high': resultTypes[1],   // バーンアウト予備軍
        'high-high-high-low': resultTypes[2],    // ストイック社畜
        'high-high-high-medium': resultTypes[1], // バーンアウト予備軍
        'high-high-low-high': resultTypes[6],    // チームプレイヤー
        'high-high-low-low': resultTypes[3],     // 一匹狼ワーカー
        'high-high-low-medium': resultTypes[6],  // チームプレイヤー
        'high-high-medium-high': resultTypes[1], // バーンアウト予備軍
        'high-high-medium-low': resultTypes[2],  // ストイック社畜
        'high-high-medium-medium': resultTypes[14], // デキる社員
        'high-medium-high-high': resultTypes[4], // 心優しき社畜
        'high-medium-high-low': resultTypes[5],  // 繊細ワーカー
        'high-medium-high-medium': resultTypes[4], // 心優しき社畜
        'high-medium-low-high': resultTypes[6],  // チームプレイヤー
        'high-medium-low-low': resultTypes[3],   // 一匹狼ワーカー
        'high-medium-low-medium': resultTypes[3], // 一匹狼ワーカー
        'high-medium-medium-high': resultTypes[4], // 心優しき社畜
        'high-medium-medium-low': resultTypes[5], // 繊細ワーカー
        'high-medium-medium-medium': resultTypes[7], // マイペース社員
        'high-low-high-high': resultTypes[4],    // 心優しき社畜
        'high-low-high-low': resultTypes[5],     // 繊細ワーカー
        'high-low-high-medium': resultTypes[5],  // 繊細ワーカー
        'high-low-low-high': resultTypes[6],     // チームプレイヤー
        'high-low-low-low': resultTypes[3],      // 一匹狼ワーカー
        'high-low-low-medium': resultTypes[3],   // 一匹狼ワーカー
        'high-low-medium-high': resultTypes[6],  // チームプレイヤー
        'high-low-medium-low': resultTypes[5],   // 繊細ワーカー
        'high-low-medium-medium': resultTypes[7], // マイペース社員
        'medium-high-high-high': resultTypes[1], // バーンアウト予備軍
        'medium-high-high-low': resultTypes[8],  // ゆるふわ社畜
        'medium-high-high-medium': resultTypes[1], // バーンアウト予備軍
        'medium-high-low-high': resultTypes[10], // お人好し社員
        'medium-high-low-low': resultTypes[11],  // 現実派社員
        'medium-high-low-medium': resultTypes[11], // 現実派社員
        'medium-high-medium-high': resultTypes[10], // お人好し社員
        'medium-high-medium-low': resultTypes[8], // ゆるふわ社畜
        'medium-high-medium-medium': resultTypes[14], // デキる社員
        'medium-medium-high-high': resultTypes[4], // 心優しき社畜
        'medium-medium-high-low': resultTypes[5],  // 繊細ワーカー
        'medium-medium-high-medium': resultTypes[4], // 心優しき社畜
        'medium-medium-low-high': resultTypes[6],  // チームプレイヤー
        'medium-medium-low-low': resultTypes[3],   // 一匹狼ワーカー
        'medium-medium-low-medium': resultTypes[3], // 一匹狼ワーカー
        'medium-medium-medium-high': resultTypes[6], // チームプレイヤー
        'medium-medium-medium-low': resultTypes[7], // マイペース社員
        'medium-medium-medium-medium': resultTypes[11], // 現実派社員
        'medium-low-high-high': resultTypes[4],   // 心優しき社畜
        'medium-low-high-low': resultTypes[5],    // 繊細ワーカー
        'medium-low-high-medium': resultTypes[4], // 心優しき社畜
        'medium-low-low-high': resultTypes[6],    // チームプレイヤー
        'medium-low-low-low': resultTypes[3],     // 一匹狼ワーカー
        'medium-low-low-medium': resultTypes[3],  // 一匹狼ワーカー
        'medium-low-medium-high': resultTypes[6], // チームプレイヤー
        'medium-low-medium-low': resultTypes[7],  // マイペース社員
        'medium-low-medium-medium': resultTypes[7], // マイペース社員
        'low-high-high-high': resultTypes[8],    // ゆるふわ社畜
        'low-high-high-low': resultTypes[8],     // ゆるふわ社畜
        'low-high-high-medium': resultTypes[8],  // ゆるふわ社畜
        'low-high-low-high': resultTypes[10],    // お人好し社員
        'low-high-low-low': resultTypes[11],     // 現実派社員
        'low-high-low-medium': resultTypes[11],  // 現実派社員
        'low-high-medium-high': resultTypes[10], // お人好し社員
        'low-high-medium-low': resultTypes[8],   // ゆるふわ社畜
        'low-high-medium-medium': resultTypes[14], // デキる社員
        'low-medium-high-high': resultTypes[4],  // 心優しき社畜
        'low-medium-high-low': resultTypes[5],   // 繊細ワーカー
        'low-medium-high-medium': resultTypes[4], // 心優しき社畜
        'low-medium-low-high': resultTypes[6],   // チームプレイヤー
        'low-medium-low-low': resultTypes[3],    // 一匹狼ワーカー
        'low-medium-low-medium': resultTypes[3], // 一匹狼ワーカー
        'low-medium-medium-high': resultTypes[6], // チームプレイヤー
        'low-medium-medium-low': resultTypes[7], // マイペース社員
        'low-medium-medium-medium': resultTypes[7], // マイペース社員
        'low-low-high-high': resultTypes[4],     // 心優しき社畜
        'low-low-high-low': resultTypes[5],      // 繊細ワーカー
        'low-low-high-medium': resultTypes[4],   // 心優しき社畜
        'low-low-low-high': resultTypes[6],      // チームプレイヤー
        'low-low-low-low': resultTypes[12],      // 家庭が大事
        'low-low-low-medium': resultTypes[3],    // 一匹狼ワーカー
        'low-low-medium-high': resultTypes[6],   // チームプレイヤー
        'low-low-medium-low': resultTypes[7],    // マイペース社員
        'low-low-medium-medium': resultTypes[7]  // マイペース社員
    };
    
    const pattern = `${dedicationLevel}-${sacrificeLevel}-${stressLevel}-${relationshipLevel}`;
    const result = patternMap[pattern];
    
    if (result) {
        return result;
    } else {
        return resultTypes[7]; // フォールバック: マイペース社員
    }
}

// 1000回テスト実行
function runMyTest() {
    const results = {};
    const rareCount = { 生粋の社畜: 0, 自由人: 0 };
    const scoreDistribution = { low: 0, medium: 0, high: 0 };
    
    console.log('=== 自分で1000回テスト開始 ===');
    
    for (let i = 0; i < 1000; i++) {
        const answers = Array(16).fill(0).map(() => Math.floor(Math.random() * 6));
        const scores = calculateScores(answers);
        const normalizedScores = normalizeScores(scores);
        const result = getResultType(normalizedScores);
        
        results[result.name] = (results[result.name] || 0) + 1;
        
        if (result.name === '生粋の社畜' || result.name === '自由人') {
            rareCount[result.name]++;
        }
        
        // スコア分布を記録
        const avgScore = (normalizedScores.dedication + normalizedScores.sacrifice + normalizedScores.stress + normalizedScores.relationship) / 4;
        if (avgScore <= 20) scoreDistribution.low++;
        else if (avgScore <= 60) scoreDistribution.medium++;
        else scoreDistribution.high++;
    }
    
    console.log('\n=== 1000回テスト結果 ===');
    const sortedResults = Object.entries(results).sort(([,a], [,b]) => b - a);
    
    sortedResults.forEach(([name, count]) => {
        const percentage = ((count / 1000) * 100).toFixed(1);
        console.log(`${name}: ${count}回 (${percentage}%)`);
    });
    
    console.log('\n=== レアタイプ確認 ===');
    console.log(`生粋の社畜: ${rareCount.生粋の社畜}回 (${((rareCount.生粋の社畜/1000)*100).toFixed(1)}%)`);
    console.log(`自由人: ${rareCount.自由人}回 (${((rareCount.自由人/1000)*100).toFixed(1)}%)`);
    
    console.log('\n=== スコア分布 ===');
    console.log(`低スコア (0-20): ${scoreDistribution.low}回 (${((scoreDistribution.low/1000)*100).toFixed(1)}%)`);
    console.log(`中スコア (21-60): ${scoreDistribution.medium}回 (${((scoreDistribution.medium/1000)*100).toFixed(1)}%)`);
    console.log(`高スコア (61-100): ${scoreDistribution.high}回 (${((scoreDistribution.high/1000)*100).toFixed(1)}%)`);
    
    console.log(`\n=== 出現タイプ数: ${Object.keys(results).length}/16種類 ===`);
    
    return results;
}

// テスト実行
runMyTest();
