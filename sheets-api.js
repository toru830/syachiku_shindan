// Google Sheets API を使用したデータベースシステム
// 他端末・別ネットワークでもデータを共有可能

// Google Sheets API設定
// 実際の運用では以下の設定を更新してください
const SHEETS_CONFIG = {
    // Google Cloud Console で取得したAPIキー
    API_KEY: 'AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // ここに実際のAPIキーを入力
    // Google Sheets のスプレッドシートID（URLの /d/ と /edit の間の文字列）
    SPREADSHEET_ID: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms', // ここに実際のスプレッドシートIDを入力
    RANGE: 'Sheet1!A:Z' // データを保存する範囲
};

// API設定が有効かチェック
function isSheetsAPIConfigured() {
    return SHEETS_CONFIG.API_KEY !== 'AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' && 
           SHEETS_CONFIG.SPREADSHEET_ID !== '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms' &&
           SHEETS_CONFIG.API_KEY.length > 20 &&
           SHEETS_CONFIG.SPREADSHEET_ID.length > 20;
}

// Google Sheets API のベースURL
const SHEETS_API_BASE = 'https://sheets.googleapis.com/v4/spreadsheets';

// 診断結果をGoogle Sheetsに保存
async function saveDiagnosisToSheets(resultData) {
    try {
        // API設定が無効な場合はローカルストレージのみ使用
        if (!isSheetsAPIConfigured()) {
            console.log('Google Sheets APIが設定されていません。ローカルストレージに保存します。');
            if (window.LocalAnalytics) {
                window.LocalAnalytics.saveDiagnosisResult(resultData);
            }
            return false;
        }
        
        console.log('Google Sheetsに保存中...', resultData);
        
        // データをシート用の形式に変換
        const rowData = [
            new Date().toISOString(), // タイムスタンプ
            resultData.resultType || '', // 結果タイプ
            resultData.shachuLevel || 0, // 社畜レベル
            resultData.scores?.dedication || 0, // 献身度
            resultData.scores?.sacrifice || 0, // 犠牲度
            resultData.scores?.stress || 0, // ストレス耐性
            resultData.scores?.relationship || 0, // 人間関係
            resultData.rawScores?.dedication || 0, // 生献身度
            resultData.rawScores?.sacrifice || 0, // 生犠牲度
            resultData.rawScores?.stress || 0, // 生ストレス耐性
            resultData.rawScores?.relationship || 0, // 生人間関係
            resultData.typeIndex || 0, // タイプインデックス
            navigator.userAgent || '', // ユーザーエージェント
            `${screen.width}x${screen.height}`, // 画面解像度
            navigator.language || '', // 言語
            window.location.href || '' // URL
        ];
        
        // Google Sheets APIにPOST
        const response = await fetch(`${SHEETS_API_BASE}/${SHEETS_CONFIG.SPREADSHEET_ID}/values/${SHEETS_CONFIG.RANGE}:append?valueInputOption=RAW&key=${SHEETS_CONFIG.API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                values: [rowData]
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Google Sheetsに保存完了:', result);
        
        // ローカルストレージにもバックアップ保存
        if (window.LocalAnalytics) {
            window.LocalAnalytics.saveDiagnosisResult(resultData);
        }
        
        return true;
    } catch (error) {
        console.error('Google Sheets保存エラー:', error);
        
        // エラー時はローカルストレージに保存
        if (window.LocalAnalytics) {
            window.LocalAnalytics.saveDiagnosisResult(resultData);
        }
        
        return false;
    }
}

// Google Sheetsから診断結果を取得
async function getDiagnosisFromSheets() {
    try {
        // API設定が無効な場合はローカルストレージから取得
        if (!isSheetsAPIConfigured()) {
            console.log('Google Sheets APIが設定されていません。ローカルストレージから取得します。');
            if (window.LocalAnalytics) {
                return window.LocalAnalytics.getDiagnosisResults(1000);
            }
            return [];
        }
        
        console.log('Google Sheetsからデータ取得中...');
        
        const response = await fetch(`${SHEETS_API_BASE}/${SHEETS_CONFIG.SPREADSHEET_ID}/values/${SHEETS_CONFIG.RANGE}?key=${SHEETS_CONFIG.API_KEY}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Google Sheetsから取得したデータ:', data);
        
        if (!data.values || data.values.length <= 1) {
            console.log('データがありません');
            return [];
        }
        
        // ヘッダー行をスキップしてデータを変換
        const results = data.values.slice(1).map((row, index) => ({
            id: `sheets_${index}`,
            timestamp: row[0] || new Date().toISOString(),
            resultType: row[1] || '',
            shachuLevel: parseInt(row[2]) || 0,
            scores: {
                dedication: parseInt(row[3]) || 0,
                sacrifice: parseInt(row[4]) || 0,
                stress: parseInt(row[5]) || 0,
                relationship: parseInt(row[6]) || 0
            },
            rawScores: {
                dedication: parseInt(row[7]) || 0,
                sacrifice: parseInt(row[8]) || 0,
                stress: parseInt(row[9]) || 0,
                relationship: parseInt(row[10]) || 0
            },
            typeIndex: parseInt(row[11]) || 0,
            userAgent: row[12] || '',
            screenResolution: row[13] || '',
            language: row[14] || '',
            url: row[15] || ''
        }));
        
        console.log('変換された診断データ:', results);
        return results;
        
    } catch (error) {
        console.error('Google Sheets取得エラー:', error);
        
        // エラー時はローカルストレージから取得
        if (window.LocalAnalytics) {
            return window.LocalAnalytics.getDiagnosisResults(1000);
        }
        
        return [];
    }
}

// 統計データを計算（既存の関数を拡張）
function calculateStatisticsFromSheets(results) {
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
        languageStats: {},
        sourceStats: {
            sheets: 0,
            local: 0
        }
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
        
        // データソース統計
        if (result.id && result.id.startsWith('sheets_')) {
            stats.sourceStats.sheets++;
        } else {
            stats.sourceStats.local++;
        }
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
window.SheetsAPI = {
    saveDiagnosisToSheets,
    getDiagnosisFromSheets,
    calculateStatisticsFromSheets
};

// デバッグ用：ページ読み込み時にAPIの状態を確認
document.addEventListener('DOMContentLoaded', function() {
    console.log('SheetsAPI 読み込み完了');
    console.log('設定:', SHEETS_CONFIG);
});
