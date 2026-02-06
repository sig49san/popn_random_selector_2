### 実装計画フェーズ (2026-02-06 12:20)

#### 1. プロジェクトの初期設定

- [ ] Vite + React + TypeScript プロジェクトを初期化する。
- [ ] Material UI をインストールし、設定を行う。
- [ ] Vitest と React Testing Library をインストールし、設定を行う。
- [ ] `tsconfig.json` を適切に設定する。
- [ ] プロジェクトのルートディレクトリに `.gitignore` を設定する。

#### 2. データ処理

- [ ] `popn_music_list.csv` を `src/data/` ディレクトリに配置する。
- [ ] CSVをJSONに変換するスクリプトを `utils/convertCsvToJson.ts` として作成し、`src/data/music_data.json` を生成する。
- [ ] `music_data.json` を読み込むための型定義 (`src/types/MusicData.ts`) を作成する。

#### 3. UIコンポーネントの実装

- [ ] `src/components/MusicSelector.tsx` を作成する。
    - [ ] 楽曲数設定スライダー (Material UI `Slider`) を実装する。
    - [ ] 楽曲抽選ボタン (Material UI `Button`) を実装する。
- [ ] `src/components/MusicList.tsx` を作成する。
    - [ ] 選出された楽曲を表示するためのリスト (Material UI `List`, `ListItem`) を実装する。
    - [ ] 各楽曲の表示形式をReferenceのレイアウトを参考に実装する。

#### 4. ロジックの実装（抽選、状態管理）

- [ ] `src/hooks/useMusicData.ts` を作成する。
    - [ ] `music_data.json` を読み込み、楽曲データを管理するロジックを実装する。
    - [ ] 楽曲抽選ロジックを実装する（重複なしでランダムに選出）。
- [ ] `src/App.tsx` に以下の状態とロジックを組み込む。
    - [ ] 抽選する楽曲数を管理するstate。
    - [ ] 選出された楽曲リストを管理するstate。
    - [ ] `useMusicData` フックを利用して、楽曲データと抽選機能を連携させる。
    - [ ] `MusicSelector` と `MusicList` コンポーネントを配置し、必要なpropsを渡す。

#### 5. テストの実装

- [ ] `src/utils/convertCsvToJson.test.ts` を作成し、CSV変換スクリプトのテストを実装する。
- [ ] `src/hooks/useMusicData.test.ts` を作成し、楽曲抽選ロジックのテストを実装する。
- [ ] `src/components/MusicSelector.test.tsx` を作成し、楽曲数設定スライダーとボタンのインタラクションテストを実装する。
- [ ] `src/components/MusicList.test.tsx` を作成し、楽曲リストの表示テストを実装する。

#### 6. デプロイ設定

- [ ] `vite.config.ts` に `base` オプションを設定し、GitHub Pagesのサブディレクトリに対応させる。
- [ ] `package.json` に `gh-pages` パッケージをインストールし、`predeploy` と `deploy` スクリプトを追加する。

#### 7. GEMINI_PLAN.md の更新

- [ ] `GEMINI_PLAN.md` に実装計画フェーズの完了を追記する。
