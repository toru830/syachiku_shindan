# Google Sheets API 設定手順

## 概要
社畜診断アプリの本格的な運用では、Google Sheets APIを使用して全ユーザーの診断データをリアルタイムで収集・分析します。

## 設定手順

### 1. Google Cloud Console でプロジェクトを作成

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 「プロジェクトを選択」→「新しいプロジェクト」
3. プロジェクト名: `syachiku-shindan` (任意)
4. 「作成」をクリック

### 2. Google Sheets API を有効化

1. 左側メニューから「APIとサービス」→「ライブラリ」
2. 「Google Sheets API」を検索
3. 「Google Sheets API」をクリック
4. 「有効にする」をクリック

### 3. API キーを作成

1. 左側メニューから「APIとサービス」→「認証情報」
2. 「認証情報を作成」→「APIキー」
3. 作成されたAPIキーをコピー
4. 「制限」をクリックして「HTTPリファラー」を選択
5. 以下のURLを追加:
   - `https://shindan.syachiku-life.com/*`
   - `https://*.syachiku-life.com/*`

### 4. Google Sheets を作成

1. [Google Sheets](https://sheets.google.com/) にアクセス
2. 「空白のスプレッドシート」を作成
3. スプレッドシート名: `社畜診断 Analytics`
4. URLからスプレッドシートIDを取得
   - URL例: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
   - スプレッドシートID: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

### 5. スプレッドシートの設定

1. 1行目にヘッダーを設定:
   ```
   A1: タイムスタンプ
   B1: 結果タイプ
   C1: 社畜レベル
   D1: 献身度
   E1: 犠牲度
   F1: ストレス耐性
   G1: 人間関係
   H1: 生献身度
   I1: 生犠牲度
   J1: 生ストレス耐性
   K1: 生人間関係
   L1: タイプインデックス
   M1: ユーザーエージェント
   N1: 画面解像度
   O1: 言語
   P1: URL
   ```

2. スプレッドシートを「リンクを知っている全員が編集可」に設定

### 6. コードの設定を更新

`sheets-api.js` の以下の部分を更新:

```javascript
const SHEETS_CONFIG = {
    // 手順3で取得したAPIキー
    API_KEY: 'YOUR_ACTUAL_API_KEY_HERE',
    // 手順4で取得したスプレッドシートID
    SPREADSHEET_ID: 'YOUR_ACTUAL_SHEET_ID_HERE',
    RANGE: 'Sheet1!A:Z'
};
```

## 動作確認

1. 診断サイトで診断を実行
2. 管理者画面で「🔄 データを更新」をクリック
3. Google Sheetsにデータが追加されていることを確認
4. 「📊 データエクスポート」でCSV/JSONファイルをダウンロード

## セキュリティ注意事項

- APIキーは公開リポジトリにコミットしないでください
- 本番環境では環境変数を使用してください
- 定期的にAPIキーをローテーションしてください

## トラブルシューティング

### エラー: "HTTP error! status: 403"
- APIキーの制限設定を確認
- Google Sheets APIが有効になっているか確認

### エラー: "HTTP error! status: 400"
- スプレッドシートIDが正しいか確認
- スプレッドシートの共有設定を確認

### データが保存されない
- スプレッドシートが「リンクを知っている全員が編集可」になっているか確認
- ブラウザのコンソールでエラーメッセージを確認
