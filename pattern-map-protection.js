/**
 * パターンマップ保護システム
 * このファイルは絶対に変更してはいけません
 * パターンマップの変更は必ずユーザーの明示的な許可が必要です
 */

// パターンマップの変更履歴を記録
const PATTERN_MAP_HISTORY = [];

// パターンマップのバージョン管理
const PATTERN_MAP_VERSION = "v1.0.0";
const LAST_MODIFIED = "2024-10-18";

// パターンマップの変更を検出する関数
function detectPatternMapChanges() {
    const currentPatternMap = getCurrentPatternMap();
    const lastKnownPatternMap = getLastKnownPatternMap();
    
    if (JSON.stringify(currentPatternMap) !== JSON.stringify(lastKnownPatternMap)) {
        console.error("🚨 警告: パターンマップが変更されました！");
        console.error("変更前:", lastKnownPatternMap);
        console.error("変更後:", currentPatternMap);
        
        // 変更を記録
        PATTERN_MAP_HISTORY.push({
            timestamp: new Date().toISOString(),
            version: PATTERN_MAP_VERSION,
            changes: "パターンマップが変更されました",
            user: "不明"
        });
        
        return true;
    }
    return false;
}

// 現在のパターンマップを取得
function getCurrentPatternMap() {
    // script.jsからパターンマップを取得
    if (typeof patternMap !== 'undefined') {
        return patternMap;
    }
    return null;
}

// 最後に記録されたパターンマップを取得
function getLastKnownPatternMap() {
    // ローカルストレージから取得
    const stored = localStorage.getItem('patternMapBackup');
    return stored ? JSON.parse(stored) : null;
}

// パターンマップをバックアップ
function backupPatternMap(patternMap) {
    localStorage.setItem('patternMapBackup', JSON.stringify(patternMap));
    localStorage.setItem('patternMapVersion', PATTERN_MAP_VERSION);
    localStorage.setItem('patternMapLastModified', LAST_MODIFIED);
}

// パターンマップの整合性をチェック
function validatePatternMap(patternMap) {
    const requiredPatterns = [
        'high-high-high-high', 'high-high-high-low', 'high-high-high-medium',
        'high-high-low-high', 'high-high-low-low', 'high-high-low-medium',
        'high-high-medium-high', 'high-high-medium-low', 'high-high-medium-medium',
        // ... 全81パターン
    ];
    
    for (const pattern of requiredPatterns) {
        if (!patternMap[pattern]) {
            console.error(`❌ パターンが見つかりません: ${pattern}`);
            return false;
        }
    }
    
    return true;
}

// パターンマップの変更を防ぐプロキシ
function createProtectedPatternMap(originalPatternMap) {
    return new Proxy(originalPatternMap, {
        set(target, property, value) {
            console.error("🚨 パターンマップの変更は禁止されています！");
            console.error(`変更しようとしたプロパティ: ${property}`);
            console.error(`変更しようとした値:`, value);
            throw new Error("パターンマップの変更は禁止されています。変更する場合は管理者に連絡してください。");
        },
        deleteProperty(target, property) {
            console.error("🚨 パターンマップの削除は禁止されています！");
            throw new Error("パターンマップの削除は禁止されています。");
        }
    });
}

// 初期化時にパターンマップを保護
document.addEventListener('DOMContentLoaded', function() {
    console.log("🛡️ パターンマップ保護システムを初期化中...");
    
    // パターンマップの変更を検出
    if (detectPatternMapChanges()) {
        alert("⚠️ パターンマップが変更されました！\nこの変更は意図的ですか？");
    }
    
    // パターンマップをバックアップ
    const currentPatternMap = getCurrentPatternMap();
    if (currentPatternMap) {
        backupPatternMap(currentPatternMap);
        console.log("✅ パターンマップをバックアップしました");
    }
});

// エクスポート
window.PatternMapProtection = {
    detectChanges: detectPatternMapChanges,
    backup: backupPatternMap,
    validate: validatePatternMap,
    createProtected: createProtectedPatternMap,
    getHistory: () => PATTERN_MAP_HISTORY
};
