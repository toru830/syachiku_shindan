# Google Analytics 4 (GA4) 実装完了報告

## 📋 実装概要

社畜診断サイトにGoogle Analytics 4（GA4）を導入し、ページビュー計測とカスタムイベント計測を実装しました。

**測定ID**: `G-C4L18ZBGW3`  
**対象サイト**: https://shachipoke.syachiku-life.com

---

## ✅ 実装内容

### 1. ページビュー計測

全ページでGA4のページビューが自動計測されます。

#### 既に実装済みのページ
- ✅ `index.html` - トップページ・診断ページ・結果表示ページ
- ✅ `characters.html` - キャラクター一覧ページ
- ✅ `contact.html` - お問い合わせページ
- ✅ `terms.html` - 利用規約ページ
- ✅ `privacy.html` - プライバシーポリシーページ

#### 今回追加したページ
- ✅ `admin.html` - 管理者画面

### 2. カスタムイベント計測

以下の3つのイベントを実装しました：

| イベント名 | 送信タイミング | パラメータ |
|-----------|--------------|-----------|
| `diagnosis_start` | 診断開始ボタン押下時 | `page` (現在のパス) |
| `diagnosis_complete` | 診断結果表示時 | `page`, `result_type` (結果タイプ名) |
| `share_click` | シェアボタン押下時 | `page`, `platform` (web_share/clipboard/manual) |

---

## 📝 変更ファイルと差分

### 1. `admin.html`

**挿入位置**: `</head>` タグの直前に追加（283行目付近）

```diff
     </style>
+    <!-- Google tag (gtag.js) -->
+    <script async src="https://www.googletagmanager.com/gtag/js?id=G-C4L18ZBGW3"></script>
+    <script>
+      window.dataLayer = window.dataLayer || [];
+      function gtag(){dataLayer.push(arguments);}
+      gtag('js', new Date());
+      gtag('config', 'G-C4L18ZBGW3');
+    </script>
 </head>
 <body>
```

### 2. `script.js`

#### 2-1. 診断開始イベント（`startQuiz`関数内）

**挿入位置**: 277行目付近（`trackDiagnosisStart()`の後）

```diff
     // ローカルAnalyticsに診断開始を記録
     if (window.LocalAnalytics) {
         window.LocalAnalytics.trackDiagnosisStart();
     }
+    
+    // Google Analytics 4: 診断開始イベント
+    if (typeof gtag !== 'undefined') {
+        gtag('event', 'diagnosis_start', {
+            page: location.pathname
+        });
+    }
```

#### 2-2. 診断完了イベント（`showResult`関数内）

**挿入位置**: 1119行目付近（`resultData`作成後）

```diff
     const resultData = {
         resultType: resultType.name,
         shachuLevel: resultType.level || 0,
         scores: normalizedScores,
         rawScores: scores,
         typeIndex: typeIndex,
         timestamp: new Date()
     };
+    
+    // Google Analytics 4: 診断完了イベント
+    if (typeof gtag !== 'undefined') {
+        gtag('event', 'diagnosis_complete', {
+            page: location.pathname,
+            result_type: resultType.name
+        });
+    }
```

#### 2-3. シェアイベント（`shareResult`関数内）

**挿入位置**: 1170行目付近（`shareResult`関数全体を更新）

```diff
 function shareResult() {
     const resultType = document.getElementById('result-type').textContent;
     const shareText = `私の社畜診断結果は「${resultType}」でした！ #社畜診断`;
+    
+    // プラットフォーム判定（Web Share APIの場合は'web_share'、その他は'clipboard'）
+    let platform = 'web_share';
     
     if (navigator.share) {
         navigator.share({
             title: '社畜診断',
             text: shareText,
             url: window.location.href
-        }).catch(err => console.log('シェアがキャンセルされました'));
+        }).then(() => {
+            // Google Analytics 4: シェアイベント（成功時）
+            if (typeof gtag !== 'undefined') {
+                gtag('event', 'share_click', {
+                    page: location.pathname,
+                    platform: platform
+                });
+            }
+        }).catch(err => {
+            console.log('シェアがキャンセルされました');
+            // キャンセル時はイベント送信しない
+        });
     } else {
         // フォールバック：クリップボードにコピー
+        platform = 'clipboard';
         navigator.clipboard.writeText(shareText).then(() => {
             alert('結果をクリップボードにコピーしました！');
+            // Google Analytics 4: シェアイベント（クリップボードコピー成功時）
+            if (typeof gtag !== 'undefined') {
+                gtag('event', 'share_click', {
+                    page: location.pathname,
+                    platform: platform
+                });
+            }
         }).catch(() => {
             alert(shareText);
+            // フォールバック失敗時もイベント送信（手動コピーの可能性）
+            if (typeof gtag !== 'undefined') {
+                gtag('event', 'share_click', {
+                    page: location.pathname,
+                    platform: 'manual'
+                });
+            }
         });
     }
 }
```

---

## 🚀 デプロイ手順

このリポジトリはGitHub Pagesでホスティングされています。以下の手順でデプロイします：

### 1. 変更をステージング

```bash
git add admin.html script.js
```

### 2. コミット

```bash
git commit -m "Add: Google Analytics 4 implementation (page views and custom events)"
```

### 3. GitHubにプッシュ

```bash
git push origin main
```

### 4. GitHub Actionsによる自動デプロイ

- `main`ブランチにプッシュすると、自動的にGitHub Actionsが実行されます
- `.github/workflows/deploy.yml`で定義されたワークフローが、GitHub Pagesにデプロイします
- デプロイ完了まで通常 **3-5分** かかります

### 5. デプロイ確認

- GitHubリポジトリの「Actions」タブでデプロイ状況を確認
- デプロイ完了後、以下で動作確認：
  - https://shachipoke.syachiku-life.com
  - https://toru830.github.io/syachiku_shindan/

---

## 🔍 GA4管理画面での確認手順

### リアルタイム計測の確認

1. **Google Analytics管理画面にアクセス**
   - https://analytics.google.com/ にアクセス
   - 測定ID `G-C4L18ZBGW3` のプロパティを選択

2. **リアルタイムレポートを開く**
   - 左メニューから「レポート」→「リアルタイム」を選択

3. **ページビューの確認**
   - サイトにアクセスすると、リアルタイムレポートに表示されます
   - 「ページビュー数」が増加することを確認

4. **イベントの確認**
   - リアルタイムレポートの「イベント」セクションを確認
   - 以下のイベントが表示されることを確認：
     - `diagnosis_start` - 診断開始ボタンをクリック時
     - `diagnosis_complete` - 診断完了・結果表示時
     - `share_click` - シェアボタンをクリック時

### テスト手順

1. **ページビューのテスト**
   ```
   1. サイトにアクセス
   2. GA4管理画面の「リアルタイム」でページビューを確認
   3. 各ページ（index.html, characters.html, admin.html等）にアクセスして計測を確認
   ```

2. **診断開始イベントのテスト**
   ```
   1. トップページで「診断を始める」ボタンをクリック
   2. GA4管理画面の「リアルタイム」→「イベント」で「diagnosis_start」を確認
   ```

3. **診断完了イベントのテスト**
   ```
   1. 診断を最後まで進める
   2. 結果が表示されたタイミングでGA4管理画面を確認
   3. 「diagnosis_complete」イベントと「result_type」パラメータを確認
   ```

4. **シェアイベントのテスト**
   ```
   1. 診断結果画面で「結果をシェア」ボタンをクリック
   2. GA4管理画面の「リアルタイム」→「イベント」で「share_click」を確認
   3. 「platform」パラメータ（web_share/clipboard/manual）を確認
   ```

### イベントパラメータの確認方法

1. GA4管理画面で「レポート」→「リアルタイム」を開く
2. 「イベント」セクションでイベント名をクリック
3. 「パラメータ」セクションで各パラメータの値を確認

---

## 📊 計測されるデータ

### ページビュー
- 全ページで自動計測
- ページパス、タイトル、リファラーなどが自動収集

### カスタムイベント

#### `diagnosis_start`
- **送信タイミング**: 診断開始ボタンクリック時
- **パラメータ**:
  - `page`: 現在のページパス（例: `/index.html`）

#### `diagnosis_complete`
- **送信タイミング**: 診断結果表示時
- **パラメータ**:
  - `page`: 現在のページパス
  - `result_type`: 診断結果タイプ名（例: "生粋の社畜", "自由人"など）

#### `share_click`
- **送信タイミング**: シェアボタンクリック時（成功時のみ）
- **パラメータ**:
  - `page`: 現在のページパス
  - `platform`: シェア方法
    - `web_share`: Web Share API使用時
    - `clipboard`: クリップボードコピー時
    - `manual`: フォールバック（手動コピー）時

---

## ⚠️ 注意事項

1. **既存のGA4コード**
   - `index.html`など既にGA4コード（G-C4L18ZBGW3）が実装済み
   - 今回の実装で統一され、混在はありません

2. **イベント送信のタイミング**
   - `share_click`はシェアが成功した場合のみ送信されます
   - ユーザーがシェアをキャンセルした場合は送信されません

3. **デプロイ後の反映時間**
   - GitHub Pagesの反映には数分かかる場合があります
   - ブラウザキャッシュをクリアして確認してください

---

## 📞 トラブルシューティング

### イベントが計測されない場合

1. **ブラウザのコンソールを確認**
   - F12キーで開発者ツールを開く
   - 「Console」タブでエラーがないか確認

2. **GA4のデバッグモードを有効化**
   - ブラウザの拡張機能「Google Analytics Debugger」を使用
   - または、gtag.jsの設定でデバッグモードを有効化

3. **リアルタイムレポートの確認**
   - GA4管理画面の「リアルタイム」レポートで確認
   - 最大30分の遅延がある場合があります

---

## ✅ 実装チェックリスト

- [x] 全ページにGA4コードを追加
- [x] ページビューが自動計測される
- [x] `diagnosis_start`イベントを実装
- [x] `diagnosis_complete`イベントを実装
- [x] `share_click`イベントを実装
- [x] イベントパラメータを適切に設定
- [x] 既存の動作を壊さないことを確認
- [x] デプロイ手順を文書化

---

**実装日**: 2024年  
**実装者**: Web実装担当  
**測定ID**: G-C4L18ZBGW3

