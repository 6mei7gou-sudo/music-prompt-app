// 作曲お題ジェネレーター v2.0 (Node.js v14対応)
// ES2020 準拠

const fs = require('fs').promises;
const path = require('path');

class CompositionPromptGenerator {
  constructor() {
    this.currentPrompt = null;
    this.isAnimating = false;
    this.promptHistory = [];
    this.lockedItems = {
      genre: false,
      mood: false,
      theme: false,
      instrument: false,
      timeSignature: false,
      key: false,
      tempo: false,
      challenge: false
    };
    this.promptCount = 1;
    this.savedPrompts = [];
    this.customSelections = {
      genre: '',
      mood: '',
      theme: '',
      instrument: '',
      timeSignature: '',
      key: '',
      tempo: '',
      challenge: ''
    };
    this.enabledElements = {
      genre: true,
      mood: true,
      theme: true,
      instrument: true,
      timeSignature: true,
      key: true,
      tempo: true,
      challenge: true
    };

    this.initializeData();
  }

  initializeData() {
    this.genres = [
      'ポップス', 'ロック', 'ジャズ', 'クラシック', 'エレクトロニック', 
      'R&B', 'レゲエ', 'カントリー', 'フォーク', 'ファンク', 'ブルース', 
      'ヒップホップ', 'アンビエント', 'ボサノバ', 'スカ', 'パンク',
      'メタル', 'インディー', 'テクノ', 'ハウス', 'トランス', 'ダブステップ',
      'ソウル', 'ゴスペル', 'ワールドミュージック', 'ニューエイジ'
    ];

    this.moods = [
      '幸せな', '切ない', '力強い', '穏やかな', '緊張感のある', 
      '夢想的な', '情熱的な', '神秘的な', 'ノスタルジックな', '希望に満ちた',
      'メランコリックな', 'エネルギッシュな', '内省的な', '勇敢な', '優しい',
      '怒りに満ちた', '恐ろしい', '不気味な', '陽気な', '儚い', '壮大な',
      '暗い', '明るい', '複雑な', '単純な', '混沌とした', '秩序立った'
    ];

    this.themes = [
      '恋愛', '友情', '家族', '故郷', '旅', '夢', '青春', '別れ', 
      '再会', '季節の変化', '成長', '挑戦', '平和', '自然', '都市生活',
      '記憶', '未来への願い', '孤独', '絆', '自由', '戦争', '愛国心',
      '革命', '社会問題', '環境保護', '時間', '空間', '宇宙', '海',
      '山', '森', '砂漠', '雨', '雪', '風', '火', '水', '地球'
    ];

    this.instruments = [
      'ピアノソロ', 'アコースティックギター', 'エレキギター', 'バイオリン', 
      'フルート', 'サックス', 'ドラム', 'ベース', 'シンセサイザー', 
      'ハーモニカ', 'ウクレレ', 'チェロ', 'トランペット', 'クラリネット',
      'オルガン', 'マンドリン', 'バンジョー', 'アコーディオン', 'ハープ',
      'オーボエ', 'ファゴット', 'ホルン', 'トロンボーン', 'チューバ',
      'ビオラ', 'コントラバス', 'ティンパニ', 'マリンバ', 'ビブラフォン'
    ];

    this.timeSignatures = ['4/4', '3/4', '6/8', '2/4', '5/4', '7/8', '9/8', '12/8', '2/2', '3/8'];
    
    this.keys = [
      'Cメジャー', 'Gメジャー', 'Dメジャー', 'Aメジャー', 'Eメジャー',
      'Fメジャー', 'B♭メジャー', 'E♭メジャー', 'A♭メジャー', 'D♭メジャー',
      'G♭メジャー', 'C♭メジャー', 'Aマイナー', 'Eマイナー', 'Bマイナー', 
      'F#マイナー', 'C#マイナー', 'G#マイナー', 'D#マイナー', 'Dマイナー', 
      'Gマイナー', 'Cマイナー', 'Fマイナー', 'B♭マイナー', 'E♭マイナー'
    ];

    this.tempos = [
      { name: 'とても遅い (40-60 BPM)', range: '40-60' },
      { name: 'ゆっくり (60-80 BPM)', range: '60-80' },
      { name: 'ミディアム (90-120 BPM)', range: '90-120' },
      { name: '速め (130-150 BPM)', range: '130-150' },
      { name: '高速 (160-180 BPM)', range: '160-180' },
      { name: '超高速 (180+ BPM)', range: '180+' }
    ];

    this.specialChallenges = [
      '転調を含む', 'リズムチェンジあり', 'インストゥルメンタルのみ',
      'ボーカルハーモニー重視', 'ループ構造', '1分以内で完結',
      'サビから始まる', 'アカペラスタイル', 'モード奏法を使用',
      'ポリリズム', '無調または十二音技法', 'ミニマル・ミュージック風',
      'クロスオーバー・リズム', 'オスティナート・パターン', 'カノン形式',
      'ロンド形式', 'ソナタ形式', 'フーガ形式', 'ブルース進行',
      'サイクリック・コード進行', 'モーダル・インターチェンジ', 'セカンダリー・ドミナント',
      'ディミニッシュ・コード多用', 'オーグメント・コード使用', 'サスペンデッド・コード重視',
      'パワーコードのみ', 'アルペジオ中心', 'ストライド奏法',
      'スウィング・フィール', 'ラテン・グルーヴ', 'アフロ・キューバン',
      'ブラジリアン・グルーヴ', 'ファンク・グルーヴ', 'ゴスペル・チョップス',
      'ブルーノート使用', 'ベンド・ノート多用', 'スライド奏法',
      'ピッチベンド効果', 'ヴィブラート重視', 'トレモロ効果',
      'スタッカート奏法', 'レガート奏法', 'ピツィカート奏法',
      'アルコ奏法', 'ハーモニクス使用', 'ミュート奏法',
      'オーバーダビング', 'レイヤリング', 'カウンターポイント',
      'オスティナート', 'ペダルポイント', 'ドローン音使用',
      'グリッサンド多用', 'ポルタメント効果', 'マイクロトーン使用',
      'クラスター和音', 'ノイズ要素導入', '環境音使用',
      'サウンドスケープ', 'テクスチャル・アプローチ', 'ティンバー重視',
      '楽器の特殊奏法', '準備されたピアノ', 'エクステンデッド・テクニック',
      '電子処理音', 'リアルタイム・エフェクト', 'ライブ・エレクトロニクス',
      'アルゴリズミック作曲', '確率的作曲', 'ジェネラティブ作曲',
      '即興要素含む', 'フリー・インプロヴィゼーション', 'ガイド・インプロ',
      'コール・アンド・レスポンス', 'アンティフォナル', 'エコー効果',
      'ディレイ・チェーン', 'リバース・エコー', 'フリーズ・エフェクト',
      'グラニュラー・シンセシス', 'FM合成', 'AM合成', '減算合成',
      '加算合成', 'ウェーブテーブル合成', '物理モデリング',
      'スペクトラル・シンセシス', 'コンボルーション', 'モーフィング'
    ];
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  toggleLock(item) {
    this.lockedItems[item] = !this.lockedItems[item];
    return this.lockedItems[item];
  }

  clearAllLocks() {
    Object.keys(this.lockedItems).forEach(key => {
      this.lockedItems[key] = false;
    });
    return this.lockedItems;
  }

  toggleElementEnabled(element) {
    this.enabledElements[element] = !this.enabledElements[element];
    return this.enabledElements[element];
  }

  resetCustomSelections() {
    this.customSelections = {
      genre: '',
      mood: '',
      theme: '',
      instrument: '',
      timeSignature: '',
      key: '',
      tempo: '',
      challenge: ''
    };
    return this.customSelections;
  }

  generatePrompt(options = {}) {
    const { count = this.promptCount, useCustomMode = false } = options;
    const prompts = [];
    
    for (let i = 0; i < count; i++) {
      const prompt = {
        genre: useCustomMode && this.customSelections.genre ? 
          this.customSelections.genre : 
          (this.lockedItems.genre && this.currentPrompt ? this.currentPrompt.genre : this.getRandomElement(this.genres)),
        mood: useCustomMode && this.customSelections.mood ? 
          this.customSelections.mood : 
          (this.lockedItems.mood && this.currentPrompt ? this.currentPrompt.mood : this.getRandomElement(this.moods)),
        theme: useCustomMode && this.customSelections.theme ? 
          this.customSelections.theme : 
          (this.lockedItems.theme && this.currentPrompt ? this.currentPrompt.theme : this.getRandomElement(this.themes)),
        instrument: useCustomMode && this.customSelections.instrument ? 
          this.customSelections.instrument : 
          (this.lockedItems.instrument && this.currentPrompt ? this.currentPrompt.instrument : this.getRandomElement(this.instruments)),
        timeSignature: useCustomMode && this.customSelections.timeSignature ? 
          this.customSelections.timeSignature : 
          (this.lockedItems.timeSignature && this.currentPrompt ? this.currentPrompt.timeSignature : this.getRandomElement(this.timeSignatures)),
        key: useCustomMode && this.customSelections.key ? 
          this.customSelections.key : 
          (this.lockedItems.key && this.currentPrompt ? this.currentPrompt.key : this.getRandomElement(this.keys)),
        tempo: useCustomMode && this.customSelections.tempo ? 
          this.customSelections.tempo : 
          (this.lockedItems.tempo && this.currentPrompt ? this.currentPrompt.tempo : this.getRandomElement(this.tempos)),
        challenge: useCustomMode && this.customSelections.challenge ? 
          this.customSelections.challenge : 
          (this.lockedItems.challenge && this.currentPrompt && this.currentPrompt.challenge ? 
            this.currentPrompt.challenge : 
            (Math.random() > 0.6 ? this.getRandomElement(this.specialChallenges) : null)),
        timestamp: new Date().toLocaleString('ja-JP'),
        id: Date.now() + i
      };

      // カスタムモードで無効化された要素を除外
      if (useCustomMode) {
        Object.keys(this.enabledElements).forEach(key => {
          if (!this.enabledElements[key]) {
            delete prompt[key];
          }
        });
      }

      prompts.push(prompt);
    }
    
    // 最初のプロンプトを現在のプロンプトに設定
    this.currentPrompt = prompts[0];
    
    // 履歴に追加（最大50件まで保持）
    this.promptHistory = [...prompts, ...this.promptHistory].slice(0, 50);
    
    return prompts;
  }

  savePrompt(prompt) {
    this.savedPrompts = [prompt, ...this.savedPrompts];
    return this.savedPrompts.length;
  }

  deleteFromHistory(index) {
    if (index >= 0 && index < this.promptHistory.length) {
      this.promptHistory.splice(index, 1);
      return true;
    }
    return false;
  }

  clearHistory() {
    this.promptHistory = [];
    return this.promptHistory;
  }

  getFilteredHistory(options = {}) {
    const { searchTerm = '', filter = 'all', sortBy = 'newest' } = options;
    let filtered = [...this.promptHistory];

    // 検索フィルター
    if (searchTerm) {
      filtered = filtered.filter(prompt =>
        Object.values(prompt).some(value => 
          value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // カテゴリーフィルター
    if (filter !== 'all') {
      filtered = filtered.filter(prompt => {
        switch (filter) {
          case 'with-challenge':
            return prompt.challenge;
          case 'no-challenge':
            return !prompt.challenge;
          case 'recent':
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            return new Date(prompt.timestamp) > oneDayAgo;
          default:
            return true;
        }
      });
    }

    // ソート
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.timestamp) - new Date(a.timestamp);
        case 'oldest':
          return new Date(a.timestamp) - new Date(b.timestamp);
        case 'genre':
          return (a.genre || '').localeCompare(b.genre || '');
        case 'mood':
          return (a.mood || '').localeCompare(b.mood || '');
        default:
          return 0;
      }
    });

    return filtered;
  }

  getHistoryStats() {
    const stats = {
      totalCount: this.promptHistory.length,
      challengeCount: this.promptHistory.filter(p => p.challenge).length,
      todayCount: (() => {
        const today = new Date().toDateString();
        return this.promptHistory.filter(p => 
          new Date(p.timestamp).toDateString() === today
        ).length;
      })(),
      topGenre: (() => {
        const genreCounts = {};
        this.promptHistory.forEach(p => {
          if (p.genre) genreCounts[p.genre] = (genreCounts[p.genre] || 0) + 1;
        });
        const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0];
        return topGenre ? topGenre[0] : 'なし';
      })(),
      genreDistribution: (() => {
        const genreCounts = {};
        this.promptHistory.forEach(p => {
          if (p.genre) genreCounts[p.genre] = (genreCounts[p.genre] || 0) + 1;
        });
        return genreCounts;
      })()
    };
    return stats;
  }

  createPromptHTML(prompt) {
    return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>作曲お題 - ${prompt.genre || '楽曲'}</title>
  <style>
    body {
      font-family: 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif;
      line-height: 1.6;
      margin: 40px;
      color: #333;
      background: white;
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #6366f1;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      color: #6366f1;
      margin-bottom: 10px;
    }
    .timestamp {
      color: #666;
      font-size: 14px;
    }
    .prompt-section {
      background: #f8fafc;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      padding: 25px;
      margin-bottom: 30px;
    }
    .prompt-title {
      font-size: 18px;
      font-weight: bold;
      color: #1e293b;
      margin-bottom: 20px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 10px;
    }
    .prompt-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      padding: 8px 0;
    }
    .prompt-label {
      font-weight: bold;
      color: #475569;
      min-width: 120px;
    }
    .prompt-value {
      color: #1e293b;
      font-weight: 600;
    }
    .challenge-item {
      background: linear-gradient(135deg, #fef3c7, #fde68a);
      border: 2px solid #f59e0b;
      border-radius: 8px;
      padding: 15px;
      margin-top: 10px;
    }
    .memo-section {
      border: 2px solid #d1d5db;
      border-radius: 12px;
      padding: 25px;
      margin-top: 30px;
    }
    .memo-title {
      font-size: 18px;
      font-weight: bold;
      color: #374151;
      margin-bottom: 20px;
    }
    .memo-item {
      margin-bottom: 25px;
    }
    .memo-label {
      font-weight: bold;
      color: #4b5563;
      margin-bottom: 8px;
      display: block;
    }
    .memo-lines {
      border-bottom: 1px solid #d1d5db;
      height: 20px;
      margin-bottom: 5px;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
      font-size: 12px;
    }
    .instructions {
      background: #fffbeb;
      border: 2px solid #f59e0b;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 20px;
      font-size: 14px;
    }
    @media print {
      .instructions { display: none; }
      body { margin: 20px; }
    }
  </style>
</head>
<body>
  <div class="instructions">
    <strong>📄 PDF化の方法:</strong> このページで右クリック → 「印刷」 → 送信先を「PDFに保存」に変更してください
  </div>
  
  <div class="header">
    <div class="title">🎵 作曲お題ジェネレーター v2.0</div>
    <div class="timestamp">生成日時: ${prompt.timestamp}</div>
  </div>
  
  <div class="prompt-section">
    <div class="prompt-title">📋 今回のお題</div>
    ${prompt.genre ? `
      <div class="prompt-item">
        <span class="prompt-label">🎵 ジャンル:</span>
        <span class="prompt-value">${prompt.genre}</span>
      </div>
    ` : ''}
    ${prompt.mood ? `
      <div class="prompt-item">
        <span class="prompt-label">💭 ムード:</span>
        <span class="prompt-value">${prompt.mood}</span>
      </div>
    ` : ''}
    ${prompt.theme ? `
      <div class="prompt-item">
        <span class="prompt-label">🎨 テーマ:</span>
        <span class="prompt-value">${prompt.theme}</span>
      </div>
    ` : ''}
    ${prompt.instrument ? `
      <div class="prompt-item">
        <span class="prompt-label">🎹 メイン楽器:</span>
        <span class="prompt-value">${prompt.instrument}</span>
      </div>
    ` : ''}
    ${prompt.key ? `
      <div class="prompt-item">
        <span class="prompt-label">🎼 キー:</span>
        <span class="prompt-value">${prompt.key}</span>
      </div>
    ` : ''}
    ${prompt.timeSignature ? `
      <div class="prompt-item">
        <span class="prompt-label">🥁 拍子:</span>
        <span class="prompt-value">${prompt.timeSignature}</span>
      </div>
    ` : ''}
    ${prompt.tempo ? `
      <div class="prompt-item">
        <span class="prompt-label">⏱️ テンポ:</span>
        <span class="prompt-value">${prompt.tempo.name || prompt.tempo}</span>
      </div>
    ` : ''}
    ${prompt.challenge ? `
      <div class="challenge-item">
        <div class="prompt-item">
          <span class="prompt-label">⚡ チャレンジ:</span>
          <span class="prompt-value">${prompt.challenge}</span>
        </div>
      </div>
    ` : ''}
  </div>
  
  <div class="memo-section">
    <div class="memo-title">📝 創作メモ</div>
    <div class="memo-item">
      <span class="memo-label">💡 コード進行のアイデア:</span>
      <div class="memo-lines"></div>
      <div class="memo-lines"></div>
      <div class="memo-lines"></div>
    </div>
    <div class="memo-item">
      <span class="memo-label">🎶 メロディーライン:</span>
      <div class="memo-lines"></div>
      <div class="memo-lines"></div>
      <div class="memo-lines"></div>
    </div>
    <div class="memo-item">
      <span class="memo-label">🥁 リズムパターン:</span>
      <div class="memo-lines"></div>
      <div class="memo-lines"></div>
    </div>
    <div class="memo-item">
      <span class="memo-label">🏗️ 楽曲構成:</span>
      <div class="memo-lines"></div>
      <div class="memo-lines"></div>
      <div class="memo-lines"></div>
    </div>
    <div class="memo-item">
      <span class="memo-label">✨ その他のアイデア:</span>
      <div class="memo-lines"></div>
      <div class="memo-lines"></div>
      <div class="memo-lines"></div>
      <div class="memo-lines"></div>
    </div>
  </div>
  
  <div class="footer">
    <p>🎵 作曲お題ジェネレーター v2.0 で生成されました</p>
  </div>
</body>
</html>`;
  }

  createHistoryHTML(prompts) {
    const stats = this.getHistoryStats();
    return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>作曲お題履歴レポート</title>
  <style>
    body {
      font-family: 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif;
      line-height: 1.6;
      margin: 40px;
      color: #333;
      background: white;
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #6366f1;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      color: #6366f1;
      margin-bottom: 10px;
    }
    .subtitle {
      color: #666;
      font-size: 16px;
    }
    .instructions {
      background: #fffbeb;
      border: 2px solid #f59e0b;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 20px;
      font-size: 14px;
    }
    .stats-section {
      background: #f8fafc;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 30px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }
    .stat-item {
      text-align: center;
      padding: 15px;
      background: white;
      border-radius: 8px;
      border: 1px solid #d1d5db;
    }
    .stat-number {
      font-size: 24px;
      font-weight: bold;
      color: #6366f1;
    }
    .stat-label {
      color: #6b7280;
      font-size: 14px;
    }
    .prompt-list {
      margin-top: 30px;
    }
    .prompt-item {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      background: white;
      break-inside: avoid;
    }
    .prompt-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      border-bottom: 1px solid #f3f4f6;
      padding-bottom: 10px;
    }
    .prompt-timestamp {
      color: #6b7280;
      font-size: 12px;
    }
    .prompt-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;
    }
    .prompt-detail {
      font-size: 14px;
    }
    .prompt-label {
      font-weight: bold;
      color: #374151;
    }
    .prompt-value {
      color: #1f2937;
    }
    .challenge-highlight {
      background: linear-gradient(135deg, #fef3c7, #fde68a);
      border: 1px solid #f59e0b;
      border-radius: 6px;
      padding: 8px;
      margin-top: 10px;
    }
    @media print {
      .instructions { display: none; }
      body { margin: 20px; }
      .prompt-item { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="instructions">
    <strong>📄 PDF化の方法:</strong> このページで右クリック → 「印刷」 → 送信先を「PDFに保存」に変更してください
  </div>
  
  <div class="header">
    <div class="title">📊 作曲お題履歴レポート</div>
  </div>
  
  <div class="stats-section">
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-number">${stats.totalCount}</div>
        <div class="stat-label">総生成数</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">${stats.challengeCount}</div>
        <div class="stat-label">チャレンジあり</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">${stats.todayCount}</div>
        <div class="stat-label">今日の生成</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">${stats.topGenre}</div>
        <div class="stat-label">人気ジャンル</div>
      </div>
    </div>
  </div>
  
  <div class="prompt-list">
    ${prompts.map((prompt, index) => `
      <div class="prompt-item">
        <div class="prompt-header">
          <strong>お題 #${index + 1}</strong>
          <span class="prompt-timestamp">${prompt.timestamp}</span>
        </div>
        <div class="prompt-details">
          ${prompt.genre ? `
            <div class="prompt-detail">
              <span class="prompt-label">🎵 ジャンル:</span>
              <span class="prompt-value">${prompt.genre}</span>
            </div>
          ` : ''}
          ${prompt.mood ? `
            <div class="prompt-detail">
              <span class="prompt-label">💭 ムード:</span>
              <span class="prompt-value">${prompt.mood}</span>
            </div>
          ` : ''}
          ${prompt.theme ? `
            <div class="prompt-detail">
              <span class="prompt-label">🎨 テーマ:</span>
              <span class="prompt-value">${prompt.theme}</span>
            </div>
          ` : ''}
          ${prompt.instrument ? `
            <div class="prompt-detail">
              <span class="prompt-label">🎹 楽器:</span>
              <span class="prompt-value">${prompt.instrument}</span>
            </div>
          ` : ''}
          ${prompt.key ? `
            <div class="prompt-detail">
              <span class="prompt-label">🎼 キー:</span>
              <span class="prompt-value">${prompt.key}</span>
            </div>
          ` : ''}
          ${prompt.timeSignature ? `
            <div class="prompt-detail">
              <span class="prompt-label">🥁 拍子:</span>
              <span class="prompt-value">${prompt.timeSignature}</span>
            </div>
          ` : ''}
          ${prompt.tempo ? `
            <div class="prompt-detail">
              <span class="prompt-label">⏱️ テンポ:</span>
              <span class="prompt-value">${prompt.tempo.name || prompt.tempo}</span>
            </div>
          ` : ''}
        </div>
        ${prompt.challenge ? `
          <div class="challenge-highlight">
            <strong>⚡ チャレンジ:</strong> ${prompt.challenge}
          </div>
        ` : ''}
      </div>
    `).join('')}
  </div>
</body>
</html>`;
  }

  // ファイル操作（Node.js環境用）
  async saveToFile(data, filename) {
    try {
      await fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf8');
      return { success: true, message: `データを ${filename} に保存しました` };
    } catch (error) {
      return { success: false, message: `保存エラー: ${error.message}` };
    }
  }

  async loadFromFile(filename) {
    try {
      const data = await fs.readFile(filename, 'utf8');
      const parsed = JSON.parse(data);
      
      if (parsed.promptHistory) this.promptHistory = parsed.promptHistory;
      if (parsed.savedPrompts) this.savedPrompts = parsed.savedPrompts;
      if (parsed.lockedItems) this.lockedItems = parsed.lockedItems;
      if (parsed.customSelections) this.customSelections = parsed.customSelections;
      if (parsed.enabledElements) this.enabledElements = parsed.enabledElements;
      
      return { success: true, message: `データを ${filename} から読み込みました` };
    } catch (error) {
      return { success: false, message: `読み込みエラー: ${error.message}` };
    }
  }

  async exportHTMLFile(prompt, outputPath = './') {
    const html = this.createPromptHTML(prompt);
    const filename = path.join(outputPath, `作曲お題_${prompt.genre || 'お題'}_${Date.now()}.html`);
    
    try {
      await fs.writeFile(filename, html, 'utf8');
      return { success: true, filename, message: `HTMLファイルを生成しました: ${filename}` };
    } catch (error) {
      return { success: false, message: `HTMLファイル生成エラー: ${error.message}` };
    }
  }

  async exportHistoryHTMLFile(prompts = null, outputPath = './') {
    const targetPrompts = prompts || this.promptHistory;
    const html = this.createHistoryHTML(targetPrompts);
    const filename = path.join(outputPath, `作曲お題履歴レポート_${Date.now()}.html`);
    
    try {
      await fs.writeFile(filename, html, 'utf8');
      return { success: true, filename, message: `履歴HTMLファイルを生成しました: ${filename}` };
    } catch (error) {
      return { success: false, message: `履歴HTMLファイル生成エラー: ${error.message}` };
    }
  }

  async exportJSONFile(data, filename, outputPath = './') {
    const fullPath = path.join(outputPath, filename);
    return await this.saveToFile(data, fullPath);
  }

  // CLI用のメソッド
  displayPrompt(prompt = this.currentPrompt) {
    if (!prompt) {
      console.log('お題が生成されていません。');
      return;
    }

    console.log('\n🎵 ====== 作曲お題ジェネレーター v2.0 ======');
    console.log(`📅 生成日時: ${prompt.timestamp}`);
    console.log('📋 今回のお題:');
    console.log('─'.repeat(50));
    
    if (prompt.genre) console.log(`🎵 ジャンル: ${prompt.genre}`);
    if (prompt.mood) console.log(`💭 ムード: ${prompt.mood}`);
    if (prompt.theme) console.log(`🎨 テーマ: ${prompt.theme}`);
    if (prompt.instrument) console.log(`🎹 メイン楽器: ${prompt.instrument}`);
    if (prompt.key) console.log(`🎼 キー: ${prompt.key}`);
    if (prompt.timeSignature) console.log(`🥁 拍子: ${prompt.timeSignature}`);
    if (prompt.tempo) console.log(`⏱️ テンポ: ${prompt.tempo.name || prompt.tempo}`);
    if (prompt.challenge) console.log(`⚡ チャレンジ: ${prompt.challenge}`);
    
    console.log('─'.repeat(50));
    console.log('🎼 素晴らしい音楽を作りましょう！\n');
  }

  displayHistory(count = 10) {
    console.log('\n📊 ====== 生成履歴 ======');
    const recent = this.promptHistory.slice(0, count);
    
    if (recent.length === 0) {
      console.log('履歴がありません。');
      return;
    }

    recent.forEach((prompt, index) => {
      console.log(`\n${index + 1}. ${prompt.timestamp}`);
      console.log(`   🎵 ${prompt.genre || '未設定'} | 💭 ${prompt.mood || '未設定'} | 🎨 ${prompt.theme || '未設定'}`);
      if (prompt.challenge) console.log(`   ⚡ ${prompt.challenge}`);
    });
    
    console.log(`\n表示: ${recent.length}件 / 総数: ${this.promptHistory.length}件\n`);
  }

  displayStats() {
    const stats = this.getHistoryStats();
    console.log('\n📈 ====== 統計情報 ======');
    console.log(`📊 総生成数: ${stats.totalCount}件`);
    console.log(`⚡ チャレンジあり: ${stats.challengeCount}件`);
    console.log(`📅 今日の生成: ${stats.todayCount}件`);
    console.log(`🏆 人気ジャンル: ${stats.topGenre}`);
    
    console.log('\n🎵 ジャンル別分布:');
    Object.entries(stats.genreDistribution)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .forEach(([genre, count]) => {
        console.log(`   ${genre}: ${count}件`);
      });
    console.log('');
  }

  // バックアップ・復元機能
  async createBackup(outputPath = './') {
    const backupData = {
      version: '2.0',
      timestamp: new Date().toISOString(),
      data: {
        promptHistory: this.promptHistory,
        savedPrompts: this.savedPrompts,
        lockedItems: this.lockedItems,
        customSelections: this.customSelections,
        enabledElements: this.enabledElements
      }
    };

    const filename = path.join(outputPath, `作曲お題_バックアップ_${Date.now()}.json`);
    return await this.saveToFile(backupData, filename);
  }

  async restoreFromBackup(filename) {
    try {
      const result = await this.loadFromFile(filename);
      if (result.success) {
        return { success: true, message: 'バックアップから復元しました' };
      } else {
        return result;
      }
    } catch (error) {
      return { success: false, message: `復元エラー: ${error.message}` };
    }
  }

  // ユーティリティメソッド
  getRandomPromptSet(count = 5) {
    const prompts = [];
    for (let i = 0; i < count; i++) {
      prompts.push(this.generatePrompt({ count: 1 })[0]);
    }
    return prompts;
  }

  findPromptsByGenre(genre) {
    return this.promptHistory.filter(p => p.genre === genre);
  }

  findPromptsByMood(mood) {
    return this.promptHistory.filter(p => p.mood === mood);
  }

  findPromptsWithChallenge() {
    return this.promptHistory.filter(p => p.challenge);
  }

  getPromptsByDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return this.promptHistory.filter(p => {
      const promptDate = new Date(p.timestamp);
      return promptDate >= start && promptDate <= end;
    });
  }

  // 自動保存機能
  enableAutoSave(intervalSeconds = 300, filename = './autosave.json') {
    return setInterval(async () => {
      await this.saveToFile({
        promptHistory: this.promptHistory,
        savedPrompts: this.savedPrompts,
        lockedItems: this.lockedItems,
        customSelections: this.customSelections,
        enabledElements: this.enabledElements
      }, filename);
    }, intervalSeconds * 1000);
  }

  disableAutoSave(intervalId) {
    clearInterval(intervalId);
  }
}

// CLI用のヘルパー関数
function createCLI() {
  const generator = new CompositionPromptGenerator();
  
  const commands = {
    generate: (count = 1) => {
      const prompts = generator.generatePrompt({ count: parseInt(count) });
      generator.displayPrompt(prompts[0]);
      if (prompts.length > 1) {
        console.log(`他に${prompts.length - 1}件のお題も生成されました。`);
      }
    },
    
    custom: () => {
      console.log('カスタムモードを有効にしました。');
      console.log('customSelections を設定してから generate を実行してください。');
    },
    
    history: (count = 10) => {
      generator.displayHistory(parseInt(count));
    },
    
    stats: () => {
      generator.displayStats();
    },
    
    save: async (filename = 'prompts.json') => {
      const result = await generator.saveToFile({
        promptHistory: generator.promptHistory,
        savedPrompts: generator.savedPrompts
      }, filename);
      console.log(result.message);
    },
    
    load: async (filename = 'prompts.json') => {
      const result = await generator.loadFromFile(filename);
      console.log(result.message);
    },
    
    export: async (format = 'html') => {
      if (!generator.currentPrompt) {
        console.log('先にお題を生成してください。');
        return;
      }
      
      if (format === 'html') {
        const result = await generator.exportHTMLFile(generator.currentPrompt);
        console.log(result.message);
      }
    },
    
    backup: async () => {
      const result = await generator.createBackup();
      console.log(result.message);
    },
    
    help: () => {
      console.log('\n🎵 作曲お題ジェネレーター v2.0 - コマンド一覧');
      console.log('─'.repeat(50));
      console.log('generate [数]     - お題を生成 (デフォルト: 1)');
      console.log('custom           - カスタムモードを有効化');
      console.log('history [数]     - 履歴を表示 (デフォルト: 10)');
      console.log('stats            - 統計情報を表示');
      console.log('save [ファイル名] - データを保存');
      console.log('load [ファイル名] - データを読み込み');
      console.log('export [形式]    - 現在のお題をエクスポート');
      console.log('backup           - バックアップを作成');
      console.log('help             - このヘルプを表示');
      console.log('─'.repeat(50));
    }
  };
  
  return { generator, commands };
}

// モジュールエクスポート（Node.js v14対応）
module.exports = CompositionPromptGenerator;
module.exports.createCLI = createCLI;

// 直接実行時の処理
if (require.main === module) {
  const { generator, commands } = createCLI();
  
  // 引数解析
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  const params = args.slice(1);
  
  if (commands[command]) {
    commands[command](...params);
  } else {
    console.log(`未知のコマンド: ${command}`);
    commands.help();
  }
}