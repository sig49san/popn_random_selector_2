### 設計フェーズ (2026-02-06 12:15)

#### 1. プロジェクト構造

Vite, React, TypeScriptをベースとした標準的なプロジェクト構造を採用する。

-   `src/`: アプリケーションのソースコード
    -   `assets/`: 画像などの静的アセット
    -   `components/`: 再利用可能なUIコンポーネント
    -   `hooks/`: カスタムフック
    -   `pages/`: ルーティングに関連するページコンポーネント (今回は単一ページのため `App.tsx` が中心)
    -   `styles/`: グローバルスタイル、CSSモジュールなど
    -   `utils/`: ユーティリティ関数（CSV読み込み、楽曲抽選ロジックなど）
    -   `data/`: CSVから変換されたJSONデータファイル
    -   `App.tsx`: メインアプリケーションコンポーネント
    -   `main.tsx`: エントリーポイント
    -   `vite-env.d.ts`: Vite環境の型定義
-   `public/`: 静的ファイル
-   `package.json`: プロジェクトのメタデータと依存関係
-   `tsconfig.json`: TypeScriptの設定
-   `vite.config.ts`: Viteの設定
-   `index.html`: エントリーHTMLファイル

#### 2. データフロー

1.  **CSVデータの準備**:
    -   提供された `popn_music_list.csv` を `src/data/` ディレクトリに配置する。
    -   初回開発時に、CSVを読み込みJSON形式に変換するスクリプトを別途作成する。または、ビルド時にViteのプラグイン等で処理することを検討する。
    -   今回は、手動または簡単なスクリプトでCSVをJSONに変換し、`src/data/music_data.json` として配置することを初期設計とする。
2.  **アプリケーションでのデータの利用**:
    -   `src/data/music_data.json` をアプリケーション内で直接インポートして利用する。

#### 3. UIコンポーネント設計

-   **`App` コンポーネント**: 全体のレイアウトとロジックを統括する。
-   **`MusicSelector` コンポーネント**:
    -   楽曲数設定スライダー (Material UI `Slider` コンポーネントを使用)
    -   抽選ボタン (Material UI `Button` コンポーネントを使用)
-   **`MusicList` コンポーネント**:
    -   選出された楽曲を表示するリスト (Material UI `List`, `ListItem` などを使用)
    -   各楽曲の表示形式はReferenceのレイアウトを参考にする。

#### 4. 状態管理

-   **Reactの`useState`とカスタムフック**:
    -   抽選する楽曲数: `useState` で管理。
    -   選出された楽曲リスト: `useState` で管理。
    -   楽曲データ読み込み、抽選ロジックなどはカスタムフック (`useMusicData.ts` のようなもの) でカプセル化し、再利用性と可読性を高める。
    -   `popn_random_selector/src/hooks/useMusicData.ts` を参考に既存ロジックを検討する。

#### 5. テスト戦略

-   **ユニットテスト**:
    -   Vitestをテストランナーとして使用。
    -   ユーティリティ関数（例: 楽曲抽選ロジック）やカスタムフックのロジックをテストする。
-   **コンポーネントテスト**:
    -   React Testing Libraryを使用して、Material UIコンポーネントを含むUIコンポーネントが正しくレンダリングされ、ユーザーインタラクションに反応するかをテストする。

#### 6. デプロイメント戦略 (GitHub Pages)

-   **Vite設定**: `vite.config.ts` に `base` オプションを設定し、GitHub Pagesのサブディレクトリ構成に対応させる。
    -   例: `base: '/<repository-name>/'`
-   **`package.json`のスクリプト**: `deploy` スクリプトを追加し、ビルドと`gh-pages`パッケージを使ったデプロイを自動化する。
    -   例: `"predeploy": "npm run build"`, `"deploy": "gh-pages -d dist"`
-   **GitHub Actions**: 必要に応じて、CI/CDパイプラインを構築し、プッシュ時に自動でデプロイが実行されるようにする。これは後続フェーズで検討する。まずは手動デプロイを想定。
