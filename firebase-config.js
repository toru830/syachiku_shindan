// ローカルストレージベースのデータ管理システム

// 診断結果をローカルストレージに保存
function saveDiagnosisResult(resultData) {
    try {
        const data = {
            ...resultData,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            screenResolution: `${screen.width}x${screen.height}`,
            language: navigator.language,
            id: Date.now() + '_' + Math.random().toString(36).substring(2, 11)
        };
        
        // 既存のデータを取得
        const existingData = JSON.parse(localStorage.getItem('syachiku_analytics') || '[]');
        
        // 新しいデータを追加
        existingData.push(data);
        
        // 最新1000件のみ保持（メモリ節約）
        const limitedData = existingData.slice(-1000);
        
        // ローカルストレージに保存
        localStorage.setItem('syachiku_analytics', JSON.stringify(limitedData));
        
        console.log('診断結果を保存しました:', data.id);
        return data.id;
    } catch (error) {
        console.error('診断結果の保存に失敗:', error);
        return null;
    }
}

// ページビューを記録
function trackPageView(pageName) {
    try {
        const pageViewData = {
            type: 'page_view',
            pageName: pageName,
            timestamp: new Date().toISOString(),
            url: window.location.href
        };
        
        const existingData = JSON.parse(localStorage.getItem('syachiku_pageviews') || '[]');
        existingData.push(pageViewData);
        
        // 最新500件のみ保持
        const limitedData = existingData.slice(-500);
        localStorage.setItem('syachiku_pageviews', JSON.stringify(limitedData));
    } catch (error) {
        console.error('ページビューの記録に失敗:', error);
    }
}

// ボタンクリックを記録
function trackButtonClick(buttonName, context = '') {
    try {
        const clickData = {
            type: 'button_click',
            buttonName: buttonName,
            context: context,
            timestamp: new Date().toISOString()
        };
        
        const existingData = JSON.parse(localStorage.getItem('syachiku_clicks') || '[]');
        existingData.push(clickData);
        
        // 最新300件のみ保持
        const limitedData = existingData.slice(-300);
        localStorage.setItem('syachiku_clicks', JSON.stringify(limitedData));
    } catch (error) {
        console.error('ボタンクリックの記録に失敗:', error);
    }
}

// 診断開始を記録
function trackDiagnosisStart() {
    try {
        const startData = {
            type: 'diagnosis_started',
            timestamp: new Date().toISOString()
        };
        
        const existingData = JSON.parse(localStorage.getItem('syachiku_events') || '[]');
        existingData.push(startData);
        
        // 最新200件のみ保持
        const limitedData = existingData.slice(-200);
        localStorage.setItem('syachiku_events', JSON.stringify(limitedData));
    } catch (error) {
        console.error('診断開始の記録に失敗:', error);
    }
}

// 診断結果を取得（管理者用）
function getDiagnosisResults(limitCount = 1000) {
    try {
        const data = JSON.parse(localStorage.getItem('syachiku_analytics') || '[]');
        return data.slice(-limitCount).reverse(); // 最新順
    } catch (error) {
        console.error('診断結果の取得に失敗:', error);
        return [];
    }
}

// 統計データを計算
function calculateStatistics(results) {
    const stats = {
        totalDiagnoses: results.length,
        resultTypeDistribution: {},
        averageScores: {
            dedication: 0,
            sacrifice: 0,
            stress: 0,
            relationship: 0
        },
        shachuLevelDistribution: {},
        dailyStats: {},
        hourlyStats: {},
        deviceStats: {
            mobile: 0,
            desktop: 0,
            tablet: 0
        },
        browserStats: {},
        languageStats: {}
    };

    if (results.length === 0) return stats;

    // 結果タイプの分布
    results.forEach(result => {
        const type = result.resultType || '不明';
        stats.resultTypeDistribution[type] = (stats.resultTypeDistribution[type] || 0) + 1;
        
        // 社畜レベルの分布
        const level = result.shachuLevel || 0;
        const levelRange = Math.floor(level / 20) * 20;
        stats.shachuLevelDistribution[`${levelRange}-${levelRange + 19}`] = 
            (stats.shachuLevelDistribution[`${levelRange}-${levelRange + 19}`] || 0) + 1;
        
        // 平均スコア
        if (result.scores) {
            stats.averageScores.dedication += result.scores.dedication || 0;
            stats.averageScores.sacrifice += result.scores.sacrifice || 0;
            stats.averageScores.stress += result.scores.stress || 0;
            stats.averageScores.relationship += result.scores.relationship || 0;
        }
        
        // 日別統計
        const date = new Date(result.timestamp).toDateString();
        stats.dailyStats[date] = (stats.dailyStats[date] || 0) + 1;
        
        // 時間別統計
        const hour = new Date(result.timestamp).getHours();
        stats.hourlyStats[hour] = (stats.hourlyStats[hour] || 0) + 1;
        
        // デバイス統計
        const userAgent = result.userAgent || '';
        if (/Mobile|Android|iPhone/i.test(userAgent)) {
            stats.deviceStats.mobile++;
        } else if (/Tablet|iPad/i.test(userAgent)) {
            stats.deviceStats.tablet++;
        } else {
            stats.deviceStats.desktop++;
        }
        
        // ブラウザ統計
        let browser = 'Unknown';
        if (userAgent.includes('Chrome')) browser = 'Chrome';
        else if (userAgent.includes('Firefox')) browser = 'Firefox';
        else if (userAgent.includes('Safari')) browser = 'Safari';
        else if (userAgent.includes('Edge')) browser = 'Edge';
        stats.browserStats[browser] = (stats.browserStats[browser] || 0) + 1;
        
        // 言語統計
        const language = result.language || 'unknown';
        stats.languageStats[language] = (stats.languageStats[language] || 0) + 1;
    });

    // 平均スコアを計算
    const count = results.length;
    if (count > 0) {
        stats.averageScores.dedication = Math.round(stats.averageScores.dedication / count);
        stats.averageScores.sacrifice = Math.round(stats.averageScores.sacrifice / count);
        stats.averageScores.stress = Math.round(stats.averageScores.stress / count);
        stats.averageScores.relationship = Math.round(stats.averageScores.relationship / count);
    }

    return stats;
}

// グローバルに公開
window.LocalAnalytics = {
    saveDiagnosisResult,
    trackPageView,
    trackButtonClick,
    trackDiagnosisStart,
    getDiagnosisResults,
    calculateStatistics
};
