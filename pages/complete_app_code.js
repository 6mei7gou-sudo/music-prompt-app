import React, { useState } from 'react';
import { Shuffle, Music, Clock, Palette, Heart, Zap, Moon, Sun, CloudRain, Sparkles, Lock, Unlock } from 'lucide-react';

export default function Home() {
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [promptCount, setPromptCount] = useState(1);
  const [multiplePrompts, setMultiplePrompts] = useState([]);
  const [lockedItems, setLockedItems] = useState({
    genre: false,
    mood: false,
    theme: false,
    instrument: false,
    timeSignature: false,
    key: false,
    tempo: false,
    challenge: false
  });

  const genres = [
    'ポップス', 'ロック', 'ジャズ', 'クラシック', 'エレクトロニック', 
    'R&B', 'レゲエ', 'カントリー', 'フォーク', 'ファンク', 'ブルース', 
    'ヒップホップ', 'アンビエント', 'ボサノバ', 'スカ', 'パンク',
    'メタル', 'ハードロック', 'プログレッシブロック', 'インディーロック',
    'オルタナティブ', 'グランジ', 'ニューウェーブ', 'シンセポップ',
    'テクノ', 'ハウス', 'トランス', 'ドラムンベース', 'ダブステップ',
    'チルアウト', 'ラウンジ', 'フュージョン', 'スムースジャズ',
    'ソウル', 'ゴスペル', 'ディスコ', 'モータウン', 'ネオソウル',
    'トラップ', 'ローファイ', 'ヴェイパーウェーブ', 'シティポップ',
    'K-POP', 'J-POP', 'アニソン', 'ゲーム音楽', 'チップチューン',
    'ワールドミュージック', 'ケルト', 'フラメンコ', 'タンゴ', 'サルサ',
    'レゲトン', 'バチャータ', 'クンビア', 'ボレロ', 'マンボ',
    'アフロビート', 'ハイライフ', 'カリプソ', 'スカ', 'ダンスホール',
    'インダストリアル', 'ゴシック', 'ダークウェーブ', 'エレクトロクラッシュ',
    'IDM', 'グリッチ', 'ノイズ', 'ドローン', 'ポストロック',
    'マスロック', 'エモ', 'スクリーモ', 'ハードコア', 'デスメタル',
    'ブラックメタル', 'ドゥームメタル', 'スラッシュメタル', 'パワーメタル',
    'フォークメタル', 'シンフォニックメタル', 'プログレッシブメタル'
  ];

  const moods = [
    '幸せな', '切ない', '力強い', '穏やかな', '緊張感のある', 
    '夢想的な', '情熱的な', '神秘的な', 'ノスタルジックな', '希望に満ちた',
    'メランコリックな', 'エネルギッシュな', '内省的な', '勇敢な', '優しい',
    '暗い', '明るい', '重厚な', '軽やかな', '華やかな', '地味な',
    '激しい', '静かな', '不安な', '安心する', '興奮した', '冷静な',
    'ロマンチックな', 'ドラマチックな', 'コミカルな', 'シリアスな',
    '哀愁漂う', '躍動的な', '荘厳な', '親しみやすい', '威厳のある',
    '儚い', '力強い', '優雅な', 'ワイルドな', '上品な', '粗野な',
    '洗練された', '素朴な', '都会的な', '田舎風の', 'モダンな',
    'レトロな', 'フューチャリスティック', 'オーガニックな',
    '機械的な', '人間的な', 'スピリチュアルな', '現実的な',
    '幻想的な', '現実逃避的な', '社会派の', '反抗的な', '従順な',
    'カオティックな', '秩序だった', '実験的な', '伝統的な',
    'ミニマルな', 'マキシマリストな', 'アンダーグラウンドな',
    'メインストリームな', 'アーティスティックな', '商業的な',
    'インティメートな', '壮大な', 'マイクロな', 'マクロな'
  ];

  const themes = [
    '恋愛', '友情', '家族', '故郷', '旅', '夢', '青春', '別れ', 
    '再会', '季節の変化', '成長', '挑戦', '平和', '自然', '都市生活',
    '記憶', '未来への願い', '孤独', '絆', '自由',
    '戦争', '愛国心', '反戦', '社会問題', '環境保護', '政治',
    '宗教', 'スピリチュアリティ', '哲学', '存在論', '時間',
    '死', '生', '誕生', '老い', '病気', '健康', '治癒',
    '仕事', '学校', '卒業', '入学', '就職', '退職', '結婚',
    '離婚', '出産', '子育て', '教育', '学習', '知識', '無知',
    '成功', '失敗', '挫折', '復活', '勝利', '敗北', '競争',
    '協力', 'チームワーク', 'リーダーシップ', '責任', '自立',
    '依存', '信頼', '裏切り', '許し', '復讐', '正義', '悪',
    '善', '道徳', '倫理', '価値観', '伝統', '革新', '変化',
    '不変', '永遠', '一瞬', '瞬間', '持続', '継続', '断絶',
    '連続', 'サイクル', 'リズム', 'ハーモニー', '不協和音',
    'カラフル', 'モノクローム', '光', '影', '闇', '明け方',
    '夕暮れ', '真夜中', '正午', '四季', '春', '夏', '秋', '冬',
    '雨', '雪', '嵐', '晴れ', '曇り', '風', '海', '山',
    '川', '森', '砂漠', '都市', '田舎', '島', '宇宙', '地球',
    'テクノロジー', 'AI', 'ロボット', 'サイバー', 'デジタル',
    'アナログ', 'ヴィンテージ', '未来', '過去', '現在',
    '食事', '料理', '味', '香り', '触感', '温度', '色彩',
    '言葉', '沈黙', '音', '静寂', '騒音', 'リズム', 'メロディ'
  ];

  const instruments = [
    'ピアノソロ', 'アコースティックギター', 'エレキギター', 'バイオリン', 
    'フルート', 'サックス', 'ドラム', 'ベース', 'シンセサイザー', 
    'ハーモニカ', 'ウクレレ', 'チェロ', 'トランペット', 'クラリネット',
    'オルガン', 'マンドリン', 'バンジョー', 'ハープ', 'ヴィオラ',
    'コントラバス', 'ピッコロ', 'オーボエ', 'ファゴット', 'ホルン',
    'トロンボーン', 'チューバ', 'コルネット', 'フリューゲルホルン',
    'アルトサックス', 'テナーサックス', 'バリトンサックス', 'ソプラノサックス',
    'パーカッション', 'ティンパニ', 'マリンバ', 'シロフォン', 'ヴィブラフォン',
    'グロッケンシュピール', 'チャイム', 'タンバリン', 'カスタネット',
    'トライアングル', 'シンバル', 'ゴング', 'ボンゴ', 'コンガ',
    'カホン', 'ジャンベ', 'タブラ', 'ティンバレス', 'スチールドラム',
    'アコーディオン', 'ハーモニウム', 'バグパイプ', 'リコーダー',
    'オカリナ', 'パンフルート', 'ディジュリドゥ', 'カリンバ', 'シタール',
    'タンブーラ', 'サンタール', 'ケーナ', 'サンポーニャ', 'チャランゴ',
    'バラライカ', 'ツィンバロン', 'エルフ・ハープ', 'ケルティック・ハープ',
    'エレクトリックベース', 'フレットレスベース', '5弦ベース', '6弦ベース',
    '12弦ギター', '7弦ギター', 'クラシックギター', 'フラメンコギター',
    'スチールギター', 'レゾネーターギター', 'エレクトリックバイオリン',
    'エレクトリックチェロ', 'バス・クラリネット', 'コントラファゴット',
    'ワウワウ・ギター', 'ディストーション・ギター', 'クリーン・ギター',
    'ミュート・トランペット', 'ワウワウ・トランペット', 'エレクトリックピアノ',
    'クラビネット', 'ハモンドオルガン', 'パイプオルガン', 'ローズピアノ',
    'Wurlitzerピアノ', 'シンセベース', 'シンセリード', 'シンセパッド',
    'シンセストリングス', 'シンセブラス', 'ボコーダー', 'トークボックス',
    'サンプラー', 'ドラムマシン', '808ドラム', '909ドラム', 'アナログドラム'
  ];

  const timeSignatures = [
    '4/4', '3/4', '6/8', '2/4', '5/4', '7/8', '9/8', '12/8',
    '5/8', '11/8', '13/8', '15/8', '2/2', '3/2', '6/4', '9/4',
    '7/4', '11/4', '3/8', '4/8', '10/8', '14/8', '16/8',
    '混合拍子', '変拍子', 'ポリリズム', '自由拍子'
  ];
  
  const keys = [
    'Cメジャー', 'Gメジャー', 'Dメジャー', 'Aメジャー', 'Eメジャー',
    'Bメジャー', 'F#メジャー', 'C#メジャー', 'Fメジャー', 'B♭メジャー', 
    'E♭メジャー', 'A♭メジャー', 'D♭メジャー', 'G♭メジャー', 'C♭メジャー',
    'Aマイナー', 'Eマイナー', 'Bマイナー', 'F#マイナー', 'C#マイナー',
    'G#マイナー', 'D#マイナー', 'A#マイナー', 'Dマイナー', 'Gマイナー', 
    'Cマイナー', 'Fマイナー', 'B♭マイナー', 'E♭マイナー', 'A♭マイナー',
    'Cドリアン', 'Dドリアン', 'Eドリアン', 'Fドリアン', 'Gドリアン',
    'Aドリアン', 'Bドリアン', 'Cフリジアン', 'Dフリジアン', 'Eフリジアン',
    'Cリディアン', 'Dリディアン', 'Eリディアン', 'Fリディアン', 'Gリディアン',
    'Cミクソリディアン', 'Dミクソリディアン', 'Gミクソリディアン',
    'Cロクリアン', 'Dロクリアン', 'Bロクリアン',
    'Cハーモニックマイナー', 'Dハーモニックマイナー', 'Eハーモニックマイナー',
    'Cメロディックマイナー', 'Dメロディックマイナー', 'Gメロディックマイナー',
    'Cブルース', 'Fブルース', 'Gブルース', 'Aブルース', 'Eブルース',
    'Cペンタトニック', 'Gペンタトニック', 'Aペンタトニック',
    'C全音階', 'D全音階', 'E全音階',
    '無調', '十二音技法', 'セリー音楽', '微分音'
  ];

  const tempos = [
    { name: '極遅 (40-60 BPM)', range: '40-60' },
    { name: 'ゆっくり (60-80 BPM)', range: '60-80' },
    { name: 'やや遅め (80-100 BPM)', range: '80-100' },
    { name: 'ミディアム (100-120 BPM)', range: '100-120' },
    { name: 'やや速め (120-140 BPM)', range: '120-140' },
    { name: '速め (140-160 BPM)', range: '140-160' },
    { name: '高速 (160-180 BPM)', range: '160-180' },
    { name: '超高速 (180-200 BPM)', range: '180-200' },
    { name: '極高速 (200+ BPM)', range: '200+' },
    { name: 'ルバート（自由なテンポ）', range: 'rubato' },
    { name: 'アッチェルランド（だんだん早く）', range: 'accelerando' },
    { name: 'リタルダンド（だんだん遅く）', range: 'ritardando' },
    { name: 'テンポチェンジあり', range: 'variable' },
    { name: 'ポリテンポ（複数テンポ同時）', range: 'polytempo' },
    { name: 'メトリック・モジュレーション', range: 'metric-modulation' }
  ];

  const specialChallenges = [
    '転調を含む', 'リズムチェンジあり', 'インストゥルメンタルのみ',
    'ボーカルハーモニー重視', 'ループ構造', '1分以内で完結',
    'サビから始まる', 'アカペラスタイル', 'モード奏法を使用',
    'ポリリズム', '無調または十二音技法', 'ミニマル・ミュージック風',
    '逆再生効果を使用', 'サンプリング使用', 'フィールドレコーディング使用',
    'エコー/リバーブ重視', 'ディストーション効果', 'フィルター・スウィープ',
    'ボリューム・スウェル', 'パンニング効果', 'ステレオ効果活用',
    'モノフォニック（単旋律）', 'ポリフォニック（多声）', 'ホモフォニック',
    'カノン形式', 'フーガ形式', 'ロンド形式', 'ソナタ形式',
    'テーマと変奏', 'ABA形式', '通作歌曲形式', 'ブルース進行',
    'ジャズ・スタンダード進行', 'ii-V-I進行', 'サークル・オブ・フィフス',
    'クロマチック・ハーモニー', '拡張和音使用', 'テンション・ノート多用',
    'オープン・ヴォイシング', 'クローズ・ヴォイシング', 'ドロップ2ヴォイシング',
    '代理コード使用', 'トライトーン代理', '裏コード使用',
    '同音連結', '反行', '平行移動', '逆行', '反行逆行',
    'ヘミオラ', 'クロスリズム', 'ポリメーター', 'メトリック・ディスプレイスメント',
    'シンコペーション重視', 'オフビート強調', '3連符中心', '5連符使用',
    '7連符使用', '不規則分割', 'グルーヴ重視', 'シャッフル・ビート',
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

  const toggleLock = (item) => {
    setLockedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const clearAllLocks = () => {
    setLockedItems({
      genre: false,
      mood: false,
      theme: false,
      instrument: false,
      timeSignature: false,
      key: false,
      tempo: false,
      challenge: false
    });
  };

  const getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const generatePrompt = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      const prompts = [];
      
      for (let i = 0; i < promptCount; i++) {
        const prompt = {
          genre: lockedItems.genre && currentPrompt ? currentPrompt.genre : getRandomElement(genres),
          mood: lockedItems.mood && currentPrompt ? currentPrompt.mood : getRandomElement(moods),
          theme: lockedItems.theme && currentPrompt ? currentPrompt.theme : getRandomElement(themes),
          instrument: lockedItems.instrument && currentPrompt ? currentPrompt.instrument : getRandomElement(instruments),
          timeSignature: lockedItems.timeSignature && currentPrompt ? currentPrompt.timeSignature : getRandomElement(timeSignatures),
          key: lockedItems.key && currentPrompt ? currentPrompt.key : getRandomElement(keys),
          tempo: lockedItems.tempo && currentPrompt ? currentPrompt.tempo : getRandomElement(tempos),
          challenge: lockedItems.challenge && currentPrompt && currentPrompt.challenge ? 
            currentPrompt.challenge : 
            (Math.random() > 0.6 ? getRandomElement(specialChallenges) : null)
        };
        prompts.push(prompt);
      }
      
      if (promptCount === 1) {
        setCurrentPrompt(prompts[0]);
        setMultiplePrompts([]);
      } else {
        setCurrentPrompt(null);
        setMultiplePrompts(prompts);
      }
      
      setIsAnimating(false);
    }, 800);
  };

  const getMoodIcon = (mood) => {
    if (mood.includes('幸せ') || mood.includes('希望') || mood.includes('明るい')) return <Sun className="w-5 h-5" />;
    if (mood.includes('切ない') || mood.includes('メランコリック') || mood.includes('暗い')) return <Moon className="w-5 h-5" />;
    if (mood.includes('力強い') || mood.includes('エネルギッシュ') || mood.includes('激しい')) return <Zap className="w-5 h-5" />;
    if (mood.includes('穏やか') || mood.includes('優しい') || mood.includes('安心')) return <Heart className="w-5 h-5" />;
    if (mood.includes('神秘') || mood.includes('夢想') || mood.includes('幻想')) return <Sparkles className="w-5 h-5" />;
    if (mood.includes('雨') || mood.includes('嵐') || mood.includes('雲')) return <CloudRain className="w-5 h-5" />;
    return <Palette className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="w-8 h-8 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">作曲お題アプリ</h1>
            <Music className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-blue-200 text-lg">
            膨大な組み合わせから生成される無限の音楽創作お題！
          </p>
          <div className="text-blue-300 text-sm mt-2">
            80+ ジャンル × 70+ ムード × 100+ テーマ × 100+ 楽器 × 120+ 特殊要素
          </div>
        </header>

        <div className="text-center mb-8">
          <div className="mb-6">
            <label className="block text-white text-lg font-medium mb-4">
              生成するお題の個数を選択
            </label>
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={() => setPromptCount(Math.max(1, promptCount - 1))}
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                −
              </button>
              <div className="px-6 py-3 bg-white/10 text-white text-xl font-bold rounded-lg border border-white/20 min-w-[80px] text-center">
                {promptCount}
              </div>
              <button
                onClick={() => setPromptCount(Math.min(10, promptCount + 1))}
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                ＋
              </button>
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              {[1, 3, 5, 10].map(num => (
                <button
                  key={num}
                  onClick={() => setPromptCount(num)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    promptCount === num 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-white/20 text-white/80 hover:bg-white/30'
                  }`}
                >
                  {num}個
                </button>
              ))}
            </div>
          </div>

          {currentPrompt && (
            <div className="mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <h3 className="text-white text-lg font-medium">項目をロック</h3>
                <button
                  onClick={clearAllLocks}
                  className="px-3 py-1 bg-red-500/20 text-red-200 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                >
                  全て解除
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-2xl mx-auto">
                {Object.keys(lockedItems).map(item => {
                  const labels = {
                    genre: 'ジャンル',
                    mood: 'ムード',
                    theme: 'テーマ',
                    instrument: '楽器',
                    timeSignature: '拍子',
                    key: 'キー',
                    tempo: 'テンポ',
                    challenge: 'チャレンジ'
                  };
                  
                  return (
                    <button
                      key={item}
                      onClick={() => toggleLock(item)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                        lockedItems[item]
                          ? 'bg-yellow-500/30 text-yellow-100 border border-yellow-400/50'
                          : 'bg-white/20 text-white/80 hover:bg-white/30'
                      }`}
                    >
                      {lockedItems[item] ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      {labels[item]}
                    </button>
                  );
                })}
              </div>
              <p className="text-blue-300 text-sm mt-3">
                🔒 ロックした項目は次回生成時も同じ値が使用されます
              </p>
            </div>
          )}
          
          <button
            onClick={generatePrompt}
            disabled={isAnimating}
            className={`
              px-8 py-4 text-xl font-bold text-white rounded-full
              bg-gradient-to-r from-pink-500 to-violet-500 
              hover:from-pink-600 hover:to-violet-600
              transform transition-all duration-200 hover:scale-105
              shadow-lg hover:shadow-xl
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center gap-3 mx-auto
            `}
          >
            <Shuffle className={`w-6 h-6 ${isAnimating ? 'animate-spin' : ''}`} />
            {isAnimating ? 'お題を生成中...' : `${promptCount}個のお題を生成`}
          </button>
        </div>

        {multiplePrompts.length > 0 && (
          <div className={`
            space-y-6 mb-8
            transition-all duration-800 ease-out
            ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
          `}>
            <h2 className="text-2xl font-bold text-center mb-8 text-white">
              🎵 {multiplePrompts.length}個の作曲お題 🎵
            </h2>
            
            {multiplePrompts.map((prompt, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl"
              >
                <h3 className="text-xl font-bold text-center mb-6 text-white">
                  お題 #{index + 1}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Music className="w-4 h-4 text-blue-300" />
                        <span className="text-blue-200 font-medium text-sm">ジャンル</span>
                      </div>
                      <p className="text-lg font-bold text-white">{prompt.genre}</p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                      <div className="flex items-center gap-2 mb-1">
                        {getMoodIcon(prompt.mood)}
                        <span className="text-blue-200 font-medium text-sm">ムード</span>
                      </div>
                      <p className="text-lg font-bold text-white">{prompt.mood}</p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Heart className="w-4 h-4 text-pink-300" />
                        <span className="text-blue-200 font-medium text-sm">テーマ</span>
                      </div>
                      <p className="text-lg font-bold text-white">{prompt.theme}</p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Music className="w-4 h-4 text-green-300" />
                        <span className="text-blue-200 font-medium text-sm">メイン楽器</span>
                      </div>
                      <p className="text-lg font-bold text-white">{prompt.instrument}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-orange-300" />
                        <span className="text-blue-200 font-medium text-sm">拍子</span>
                      </div>
                      <p className="text-lg font-bold text-white">{prompt.timeSignature}</p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Music className="w-4 h-4 text-purple-300" />
                        <span className="text-blue-200 font-medium text-sm">キー</span>
                      </div>
                      <p className="text-lg font-bold text-white">{prompt.key}</p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="w-4 h-4 text-yellow-300" />
                        <span className="text-blue-200 font-medium text-sm">テンポ</span>
                      </div>
                      <p className="text-lg font-bold text-white">{prompt.tempo.name}</p>
                    </div>

                    {prompt.challenge && (
                      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl p-3 border border-orange-300/30">
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles className="w-4 h-4 text-orange-300" />
                          <span className="text-orange-200 font-medium text-sm">特別チャレンジ</span>
                        </div>
                        <p className="text-lg font-bold text-orange-100">{prompt.challenge}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentPrompt && (
          <div className={`
            bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8
            border border-white/20 shadow-2xl
            transition-all duration-800 ease-out
            ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
          `}>
            <h2 className="text-2xl font-bold text-center mb-8 text-white">
              🎵 今日の作曲お題 🎵
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white/10 rounded-2xl p-4 border border-white/20 relative">
                  <button
                    onClick={() => toggleLock('genre')}
                    className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${
                      lockedItems.genre 
                        ? 'bg-yellow-500/30 text-yellow-200' 
                        : 'bg-white/20 text-white/60 hover:bg-white/30'
                    }`}
                  >
                    {lockedItems.genre ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </button>
                  <div className="flex items-center gap-3 mb-2">
                    <Music className="w-5 h-5 text-blue-300" />
                    <span className="text-blue-200 font-medium">ジャンル</span>
                  </div>
                  <p className="text-xl font-bold text-white">{currentPrompt.genre}</p>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 border border-white/20 relative">
                  <button
                    onClick={() => toggleLock('mood')}
                    className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${
                      lockedItems.mood 
                        ? 'bg-yellow-500/30 text-yellow-200' 
                        : 'bg-white/20 text-white/60 hover:bg-white/30'
                    }`}
                  >
                    {lockedItems.mood ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </button>
                  <div className="flex items-center gap-3 mb-2">
                    {getMoodIcon(currentPrompt.mood)}
                    <span className="text-blue-200 font-medium">ムード</span>
                  </div>
                  <p className="text-xl font-bold text-white">{currentPrompt.mood}</p>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 border border-white/20 relative">
                  <button
                    onClick={() => toggleLock('theme')}
                    className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${
                      lockedItems.theme 
                        ? 'bg-yellow-500/30 text-yellow-200' 
                        : 'bg-white/20 text-white/60 hover:bg-white/30'
                    }`}
                  >
                    {lockedItems.theme ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </button>
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="w-5 h-5 text-pink-300" />
                    <span className="text-blue-200 font-medium">テーマ</span>
                  </div>
                  <p className="text-xl font-bold text-white">{currentPrompt.theme}</p>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 border border-white/20 relative">
                  <button
                    onClick={() => toggleLock('instrument')}
                    className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${
                      lockedItems.instrument 
                        ? 'bg-yellow-500/30 text-yellow-200' 
                        : 'bg-white/20 text-white/60 hover:bg-white/30'
                    }`}
                  >
                    {lockedItems.instrument ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </button>
                  <div className="flex items-center gap-3 mb-2">
                    <Music className="w-5 h-5 text-green-300" />
                    <span className="text-blue-200 font-medium">メイン楽器</span>
                  </div>
                  <p className="text-xl font-bold text-white">{currentPrompt.instrument}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 rounded-2xl p-4 border border-white/20 relative">
                  <button
                    onClick={() => toggleLock('timeSignature')}
                    className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${
                      lockedItems.timeSignature 
                        ? 'bg-yellow-500/30 text-yellow-200' 
                        : 'bg-white/20 text-white/60 hover:bg-white/30'
                    }`}
                  >
                    {lockedItems.timeSignature ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </button>
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-orange-300" />
                    <span className="text-blue-200 font-medium">拍子</span>
                  </div>
                  <p className="text-xl font-bold text-white">{currentPrompt.timeSignature}</p>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 border border-white/20 relative">
                  <button
                    onClick={() => toggleLock('key')}
                    className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${
                      lockedItems.key 
                        ? 'bg-yellow-500/30 text-yellow-200' 
                        : 'bg-white/20 text-white/60 hover:bg-white/30'
                    }`}
                  >
                    {lockedItems.key ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </button>
                  <div className="flex items-center gap-3 mb-2">
                    <Music className="w-5 h-5 text-purple-300" />
                    <span className="text-blue-200 font-medium">キー</span>
                  </div>
                  <p className="text-xl font-bold text-white">{currentPrompt.key}</p>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 border border-white/20 relative">
                  <button
                    onClick={() => toggleLock('tempo')}
                    className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${
                      lockedItems.tempo 
                        ? 'bg-yellow-500/30 text-yellow-200' 
                        : 'bg-white/20 text-white/60 hover:bg-white/30'
                    }`}
                  >
                    {lockedItems.tempo ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </button>
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-yellow-300" />
                    <span className="text-blue-200 font-medium">テンポ</span>
                  </div>
                  <p className="text-xl font-bold text-white">{currentPrompt.tempo.name}</p>
                </div>

                {currentPrompt.challenge && (
                  <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl p-4 border border-orange-300/30 relative">
                    <button
                      onClick={() => toggleLock('challenge')}
                      className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${
                        lockedItems.challenge 
                          ? 'bg-yellow-500/30 text-yellow-200' 
                          : 'bg-white/20 text-white/60 hover:bg-white/30'
                      }`}
                    >
                      {lockedItems.challenge ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="w-5 h-5 text-orange-300" />
                      <span className="text-orange-200 font-medium">特別チャレンジ</span>
                    </div>
                    <p className="text-xl font-bold text-orange-100">{currentPrompt.challenge}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!currentPrompt && multiplePrompts.length === 0 && (
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
              <Music className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <p className="text-xl text-white/70">
                ボタンを押して作曲のお題を生成してください
              </p>
              <p className="text-md text-blue-300 mt-4">
                数百万通りの組み合わせからユニークなお題が生まれます
              </p>
            </div>
          </div>
        )}

        <footer className="text-center mt-8 text-blue-200">
          <p>🎼 クリエイティブな音楽制作を楽しんでください！ 🎼</p>
          <p className="text-sm text-blue-300 mt-2">
            毎回異なる組み合わせで無限の創作可能性を探索
          </p>
        </footer>
      </div>
    </div>
  );
}