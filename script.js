// 質問データ（15問）
// 各質問は4つの軸（dedication, sacrifice, stress, relationship）に影響
const questionsOriginal = [
    {
        text: "終電の時間でも仕事が終わっていなければ残る",
        axes: { dedication: 1, sacrifice: 1, stress: 0.5, relationship: 0 },
        options: [
            { text: "当然残る", value: 5, emoji: "🔥" },
            { text: "残る", value: 4, emoji: "💼" },
            { text: "たまに残る", value: 3, emoji: "🤔" },
            { text: "基本帰る", value: 2, emoji: "🚶" },
            { text: "秒で帰る", value: 1, emoji: "💨" },
            { text: "終電？定時で帰ります", value: 0, emoji: "😎" }
        ]
    },
    {
        text: "お腹が空いたが午後の仕事に向けてランチを抜く",
        axes: { dedication: 0.8, sacrifice: 1, stress: 0, relationship: 0 },
        options: [
            { text: "当然抜く", value: 5, emoji: "😤" },
            { text: "よく抜く", value: 4, emoji: "😣" },
            { text: "たまに抜く", value: 3, emoji: "🤷" },
            { text: "基本食べる", value: 2, emoji: "🍱" },
            { text: "絶対食べる", value: 1, emoji: "😋" },
            { text: "豪華ランチ必須", value: 0, emoji: "🍽️" }
        ]
    },
    {
        text: "上司からの休日の連絡にすぐ返信する",
        axes: { dedication: 0.7, sacrifice: 0.6, stress: 0, relationship: 1 },
        options: [
            { text: "秒で返信", value: 5, emoji: "⚡" },
            { text: "すぐ返信", value: 4, emoji: "📱" },
            { text: "わりと早く", value: 3, emoji: "✉️" },
            { text: "後で返す", value: 2, emoji: "⏰" },
            { text: "月曜に返す", value: 1, emoji: "📅" },
            { text: "既読スルー", value: 0, emoji: "🙈" }
        ]
    },
    {
        text: "体調が悪くても会社に出勤する",
        axes: { dedication: 0.9, sacrifice: 1, stress: 0.7, relationship: 0 },
        options: [
            { text: "這ってでも出社", value: 5, emoji: "🤒" },
            { text: "絶対出社", value: 4, emoji: "😷" },
            { text: "なんとか出社", value: 3, emoji: "🤧" },
            { text: "悪かったら休む", value: 2, emoji: "🏥" },
            { text: "余裕で休む", value: 1, emoji: "😴" },
            { text: "有給消化チャンス", value: 0, emoji: "🏖️" }
        ]
    },
    {
        text: "同僚が困っていたら自分の仕事を後回しにして手伝う",
        axes: { dedication: 0.3, sacrifice: 0.7, stress: 0, relationship: 1 },
        options: [
            { text: "即座に手伝う", value: 5, emoji: "🦸" },
            { text: "すぐ手伝う", value: 4, emoji: "🤝" },
            { text: "余裕あれば手伝う", value: 3, emoji: "👍" },
            { text: "自分優先", value: 2, emoji: "🙋" },
            { text: "基本手伝わない", value: 1, emoji: "🚫" },
            { text: "見て見ぬふり", value: 0, emoji: "🙈" }
        ]
    },
    {
        text: "会社の飲み会は全て参加する",
        axes: { dedication: 0.5, sacrifice: 0.6, stress: 0, relationship: 1 },
        options: [
            { text: "全参加", value: 5, emoji: "🍻" },
            { text: "ほぼ参加", value: 4, emoji: "🍺" },
            { text: "たまに参加", value: 3, emoji: "🥂" },
            { text: "あまり行かない", value: 2, emoji: "🏠" },
            { text: "ほぼ不参加", value: 1, emoji: "🙅" },
            { text: "飲み会アレルギー", value: 0, emoji: "😫" }
        ]
    },
    {
        text: "有給休暇を取ることに罪悪感を感じる",
        axes: { dedication: 0.8, sacrifice: 0.8, stress: 0.5, relationship: 0.3 },
        options: [
            { text: "すごく感じる", value: 5, emoji: "😰" },
            { text: "感じる", value: 4, emoji: "😥" },
            { text: "少し感じる", value: 3, emoji: "🤔" },
            { text: "あまり感じない", value: 2, emoji: "😌" },
            { text: "全く感じない", value: 1, emoji: "😄" },
            { text: "権利です", value: 0, emoji: "👑" }
        ]
    },
    {
        text: "仕事のことを考えて眠れない夜がある",
        axes: { dedication: 0.7, sacrifice: 0.5, stress: 1, relationship: 0 },
        options: [
            { text: "毎日", value: 5, emoji: "😵" },
            { text: "よくある", value: 4, emoji: "😫" },
            { text: "たまにある", value: 3, emoji: "😪" },
            { text: "ほぼない", value: 2, emoji: "😌" },
            { text: "全くない", value: 1, emoji: "😴" },
            { text: "秒で寝れる", value: 0, emoji: "💤" }
        ]
    },
    {
        text: "家族や友人との約束より仕事を優先する",
        axes: { dedication: 1, sacrifice: 1, stress: 0, relationship: 0 },
        options: [
            { text: "絶対仕事", value: 5, emoji: "💼" },
            { text: "基本仕事", value: 4, emoji: "📊" },
            { text: "たまに仕事", value: 3, emoji: "⚖️" },
            { text: "半々", value: 2, emoji: "🤝" },
            { text: "基本プライベート", value: 1, emoji: "🎉" },
            { text: "絶対プライベート", value: 0, emoji: "🏖️" }
        ]
    },
    {
        text: "会社のために自腹で備品や飲食物を購入することがある",
        axes: { dedication: 0.9, sacrifice: 1, stress: 0, relationship: 0.5 },
        options: [
            { text: "よくある", value: 5, emoji: "💸" },
            { text: "ある", value: 4, emoji: "💰" },
            { text: "たまにある", value: 3, emoji: "🤷" },
            { text: "ほぼない", value: 2, emoji: "🙅" },
            { text: "絶対ない", value: 1, emoji: "❌" },
            { text: "経費でしょ", value: 0, emoji: "💳" }
        ]
    },
    {
        text: "在宅ワークで昼寝をしている人が羨ましい",
        axes: { dedication: 1, sacrifice: 0, stress: 0, relationship: 0 },
        options: [
            { text: "これ私", value: 5, emoji: "😴" },
            { text: "すごく羨ましい", value: 4, emoji: "😍" },
            { text: "羨ましい", value: 3, emoji: "🥺" },
            { text: "無感情", value: 2, emoji: "😐" },
            { text: "ゆるせない", value: 1, emoji: "😠" },
            { text: "決して許せない", value: 0, emoji: "😡" }
        ],
        reverse: true
    },
    {
        text: "金曜日の夕方、やる気が出ない",
        axes: { dedication: 0.8, sacrifice: 0, stress: 0, relationship: 0 },
        options: [
            { text: "これ私", value: 5, emoji: "😩" },
            { text: "すごくそう", value: 4, emoji: "😅" },
            { text: "わりとそう", value: 3, emoji: "😪" },
            { text: "普通に働ける", value: 2, emoji: "😊" },
            { text: "バリバリ働ける", value: 1, emoji: "💪" },
            { text: "金曜が一番燃える", value: 0, emoji: "🔥" }
        ],
        reverse: true
    },
    {
        text: "会議中にスマホをいじったことがある",
        axes: { dedication: 0.7, sacrifice: 0, stress: 0, relationship: 0.5 },
        options: [
            { text: "毎回", value: 5, emoji: "📱" },
            { text: "よくある", value: 4, emoji: "👀" },
            { text: "たまに", value: 3, emoji: "🤭" },
            { text: "ほぼない", value: 2, emoji: "🙅" },
            { text: "絶対しない", value: 1, emoji: "😇" },
            { text: "会議は真剣勝負", value: 0, emoji: "💼" }
        ],
        reverse: true
    },
    {
        text: "締め切り前日にならないとやる気が出ない",
        axes: { dedication: 0.6, sacrifice: 0, stress: 0.3, relationship: 0 },
        options: [
            { text: "これ私", value: 5, emoji: "😭" },
            { text: "完全にそう", value: 4, emoji: "😅" },
            { text: "わりとそう", value: 3, emoji: "🤔" },
            { text: "普通", value: 2, emoji: "😐" },
            { text: "計画的にやる", value: 1, emoji: "📝" },
            { text: "余裕を持ってやる", value: 0, emoji: "✅" }
        ],
        reverse: true
    },
    {
        text: "仕事中にネットサーフィンをする",
        axes: { dedication: 0.9, sacrifice: 0, stress: 0, relationship: 0 },
        options: [
            { text: "常に", value: 5, emoji: "💻" },
            { text: "よくする", value: 4, emoji: "🌐" },
            { text: "たまに", value: 3, emoji: "🤫" },
            { text: "ほぼしない", value: 2, emoji: "🙅" },
            { text: "絶対しない", value: 1, emoji: "🚫" },
            { text: "仕事に集中してる", value: 0, emoji: "💪" }
        ],
        reverse: true
    }
];

// シャッフル用の質問配列
let questions = [];

// 配列をシャッフルする関数
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 16タイプの定義（オリジナルキャラクター）
const resultTypes = [
    {
        name: "生粋の社畜",
        icon: "🤖💻",
        level: 100,
        features: "仕事への献身度、自己犠牲度、ストレス耐性、人間関係重視度、すべてが最高レベル。まさに社畜の鑑です。会社があなたの人生そのものであり、仕事が最優先。同僚や上司との関係も良好で、会社のイベントには必ず参加します。",
        style: "朝は誰よりも早く出社し、夜は最後まで残業。休日も仕事のことを考え、メールチェックは欠かしません。体調が悪くても這ってでも出社し、有給休暇を取ることに罪悪感を感じるほど。あなたの献身的な姿勢は周囲から信頼されています。",
        advice: "時には自分の健康や家族のことも考える時間を持ってください。ワークライフバランスという言葉を思い出し、たまには自分を甘やかすことも大切です。完璧でなくても大丈夫。あなた自身の幸せも仕事と同じくらい大切にしましょう。",
        jobs: "大企業の総合職、コンサルタント、プロジェクトマネージャー、営業職、人事・総務、経営企画",
        compatibility: ["ストイック社畜", "心優しき社畜", "チームプレイヤー"],
        condition: { dedication: "high", sacrifice: "high", stress: "high", relationship: "high" }
    },
    {
        name: "バーンアウト予備軍",
        icon: "🪫😵",
        level: 95,
        features: "仕事への献身度と自己犠牲度は非常に高く、会社のために全力を尽くしています。しかし、ストレスを抱え込みやすく、人間関係で消耗しがち。頑張りすぎて心身ともに疲弊し、燃え尽きてしまう可能性が高いタイプです。",
        style: "仕事は完璧にこなそうとするあまり、休息を取ることを忘れがち。深夜まで働き、睡眠不足が続き、食事も不規則に。人間関係のストレスも相まって、精神的な疲労が蓄積しています。",
        advice: "今すぐ適度な休息が必要です。有給休暇を取って旅行に行ったり、趣味の時間を作ったり、カウンセリングを受けることも検討してください。あなたの健康が何よりも大切です。無理をせず、自分を守りましょう。",
        jobs: "クリエイティブ職、研究職、医療従事者、弁護士、会計士、スタートアップ企業",
        compatibility: ["心優しき社畜", "マイペース社員", "ライフワークバランス"],
        condition: { dedication: "high", sacrifice: "high", stress: "high", relationship: "low" }
    },
    {
        name: "ストイック社畜",
        icon: "🥋⚡",
        level: 85,
        features: "仕事に全力投球し、自己犠牲も厭わない一方で、ストレスには非常に強いタイプ。精神的にタフで、プレッシャーをものともせず、むしろそれをエネルギーに変えて成長していく力を持っています。",
        style: "孤高の戦士として仕事に打ち込み、困難な課題にも果敢に挑戦。チームワークよりも個人のパフォーマンスを重視し、自分のスキルアップと成果にこだわります。仕事を修行のように捉えています。",
        advice: "常に自分を高めようとする姿勢は素晴らしいですが、時には周囲との協調も意識してみましょう。あなたの強さは本物ですが、人とのつながりも力になることを忘れないでください。",
        jobs: "アスリート、職人、エンジニア、外科医、パイロット、投資家、起業家",
        compatibility: ["生粋の社畜", "一匹狼ワーカー", "デキる社員"],
        condition: { dedication: "high", sacrifice: "high", stress: "low", relationship: "high" }
    },
    {
        name: "一匹狼ワーカー",
        icon: "🦊🌙",
        level: 75,
        features: "仕事への献身度と自己犠牲度は高く、ストレスに強い。しかし人間関係はあまり得意ではなく、群れることを好まない一匹狼タイプです。独自の視点とスキルを持っています。",
        style: "自分のペースで黙々と仕事をこなすことを好み、静かな環境で集中して作業することで最高のパフォーマンスを発揮。会議や飲み会などの集団行動は苦手で、できれば避けたいと思っています。",
        advice: "孤独を愛し、自由を求めるあなたのスタイルは、これからの時代にマッチしています。リモートワークが最も適した働き方かも。自分らしさを大切に、信頼できる成果を出し続けてください。",
        jobs: "プログラマー、データサイエンティスト、作家、翻訳家、デザイナー、研究者、フリーランス",
        compatibility: ["ストイック社畜", "繊細ワーカー", "マイペース社員"],
        condition: { dedication: "high", sacrifice: "high", stress: "low", relationship: "low" }
    },
    {
        name: "心優しき社畜",
        icon: "🐰💝",
        level: 65,
        features: "仕事への献身度は高く、人間関係も大切にする優しい心の持ち主。自己犠牲は控えめで、ストレスを感じやすい繊細な一面もあります。周囲への気配りを忘れない優しい働き者です。",
        style: "困っている同僚がいればすぐに手を差し伸べ、チームの雰囲気を良くすることに貢献。みんなから慕われる存在です。優しさゆえに自分の気持ちを抑え込んでしまうことがあります。",
        advice: "他人を思いやる心は素晴らしいですが、自分自身のケアも忘れないでください。時には「NO」と言う勇気も必要です。あなたの優しさを保つためには自分を大切にすることが何よりも重要です。",
        jobs: "看護師、保育士、介護士、カウンセラー、教師、人事、カスタマーサポート",
        compatibility: ["チームプレイヤー", "生粋の社畜", "お人好し社員"],
        condition: { dedication: "high", sacrifice: "low", stress: "high", relationship: "high" }
    },
    {
        name: "繊細ワーカー",
        icon: "🦋🌿",
        level: 55,
        features: "仕事は真面目にこなし質の高い成果を出していますが、自己犠牲は避け、ストレスを感じやすいタイプ。繊細な感性を持ち、細かいことに気づく観察力があります。",
        style: "自分のペースを大切にし、無理をせず、心の余裕を保つことを優先。環境の変化やプレッシャーに敏感で、安定した環境で力を発揮。大勢の人との交流よりも、少数の信頼できる人との深い関係を好みます。",
        advice: "自分の限界をよく理解しており、無理をして体調を崩すことを避ける賢さがあります。あなたの繊細さは弱点ではなく、深い洞察力と丁寧な仕事ぶりの源。自分らしさを大切にしてください。",
        jobs: "アーティスト、編集者、校正者、図書館司書、品質管理、リサーチャー、在宅ワーク職",
        compatibility: ["一匹狼ワーカー", "マイペース社員", "ライフワークバランス"],
        condition: { dedication: "high", sacrifice: "low", stress: "high", relationship: "low" }
    },
    {
        name: "チームプレイヤー",
        icon: "🐧🎪",
        level: 60,
        features: "仕事への献身度は高く、人間関係を重視しながらも、自己犠牲は少なくストレスにも強い、バランスの取れた理想的な働き方をしています。コミュニケーション能力が高い存在です。",
        style: "チームの一員として協力し合うことの大切さを理解し、周囲との調和を保ちながら高いパフォーマンスを発揮。プロジェクトをスムーズに進行させる潤滑油のような役割を果たします。",
        advice: "ストレス管理も上手で、メンタルヘルスを保ちながら長期的に活躍できる素質があります。このバランス感覚は、キャリアの成功において最も重要な要素の一つ。多くの人のロールモデルとなるでしょう。",
        jobs: "営業職、マーケター、イベントプランナー、人事、広報、プロジェクトマネージャー、教師",
        compatibility: ["心優しき社畜", "デキる社員", "生粋の社畜"],
        condition: { dedication: "high", sacrifice: "low", stress: "low", relationship: "high" }
    },
    {
        name: "マイペース社員",
        icon: "🦥☕",
        level: 45,
        features: "仕事はしっかりこなし責任を持って業務を遂行しますが、自己犠牲はせず、ストレスにも強く、人間関係もほどほどに保つ健全なタイプ。周囲の期待やプレッシャーに流されません。",
        style: "無理をせず、自分のリズムで仕事を進めることで、長期的に高いパフォーマンスを維持。仕事とプライベートの境界線をしっかり引き、休日はしっかり休むことで心身のバランスを保っています。",
        advice: "効率的に仕事を進め、残業は最小限に抑える工夫が素晴らしいです。この健全な働き方は、燃え尽き症候群を防ぎ、長く楽しく働き続けるための秘訣。自分らしさを失わず、幸せに働き続けてください。",
        jobs: "事務職、経理、総務、公務員、図書館司書、品質保証、バックオフィス業務",
        compatibility: ["繊細ワーカー", "ライフワークバランス", "現実派社員"],
        condition: { dedication: "high", sacrifice: "low", stress: "low", relationship: "low" }
    },
    {
        name: "ゆるふわ社畜",
        icon: "🐑☁️",
        level: 35,
        features: "仕事への献身度は低めですが、なぜか自己犠牲はしてしまう不思議なタイプ。ストレスを感じやすく、人間関係を重視するため、周りに流されやすい傾向があります。",
        style: "断ることが苦手で、頼まれるとついつい引き受けてしまい、結果的に自分の時間が犠牲に。本当はもっとゆったりと働きたいのに、周囲の期待に応えようとして無理をしてしまいます。",
        advice: "人間関係を大切にする優しさは素晴らしいですが、自分の気持ちも大切にしてください。「NO」と言う練習をして、自分の境界線を守ることが重要。ゆるふわとした雰囲気を保ちながらも、芯の強さを持ちましょう。",
        jobs: "受付、アシスタント、販売員、カフェ店員、事務サポート、インフルエンサー",
        compatibility: ["お人好し社員", "心優しき社畜", "家庭が大事"],
        condition: { dedication: "low", sacrifice: "high", stress: "high", relationship: "high" }
    },
    {
        name: "隠れ疲労タイプ",
        icon: "🐨💭",
        level: 40,
        features: "仕事への献身度は低めなのに、なぜか自己犠牲してしまい、ストレスも溜まりがち。人間関係はあまり重視しないため、孤独を抱えやすいタイプ。無理していませんか？",
        style: "本当は仕事に全力を注ぎたいわけではないのに、責任感や義務感から頑張ってしまい、知らず知らずのうちに疲労が蓄積。周囲に相談できる人が少なく、一人で抱え込んでしまいます。",
        advice: "まずは自分の気持ちと向き合い、本当にやりたいことは何かを考えてみてください。仕事のスタイルや環境を見直し、もっと自分らしく働ける方法を探すことが大切。早めにケアすることで、健康的で充実した人生を取り戻せます。",
        jobs: "在宅ワーク、データ入力、校正、ライター、システム管理、夜勤業務、派遣社員",
        compatibility: ["マイペース社員", "現実派社員", "繊細ワーカー"],
        condition: { dedication: "low", sacrifice: "high", stress: "high", relationship: "low" }
    },
    {
        name: "お人好し社員",
        icon: "🐶🌼",
        level: 30,
        features: "仕事への献身度は控えめですが、頼まれると断れず、つい自己犠牲してしまう優しい性格。ストレスには比較的強く、人間関係を大切にするタイプです。",
        style: "周囲の人々との調和を保つことを優先し、自分のことは後回しにしがち。同僚や上司から頼まれごとをされると、忙しくても断れずに引き受けてしまい、気づけば自分の仕事が山積みに。",
        advice: "人間関係を大切にする姿勢は素晴らしく、周囲から信頼されています。ただし、自分の時間や気持ちも大切にすることを忘れないで。時には自分を優先し、お人好しであることの長所を活かしながら自分も守りましょう。",
        jobs: "サービス業、接客業、秘書、アシスタント、ボランティア、NPO職員、サポートデスク",
        compatibility: ["心優しき社畜", "ゆるふわ社畜", "家庭が大事"],
        condition: { dedication: "low", sacrifice: "high", stress: "low", relationship: "high" }
    },
    {
        name: "現実派社員",
        icon: "🐱📱",
        level: 25,
        features: "仕事への献身度と人間関係重視度は低めで、自己犠牲はしがちだがストレスには強い、割り切って働くタイプ。仕事はあくまで生活のための手段と考えています。",
        style: "必要以上に入れ込むことはなく、人間関係のしがらみに振り回されることは少なく、ドライに物事を判断。ストレス耐性が高いため、困難な状況でも冷静に対処できます。",
        advice: "感情に流されず、現実的な判断を下せる冷静さが強み。仕事とプライベートを明確に分け、効率的に働くことを心がけています。理想を追い求めるよりも、現実を見据えて着実に進むスタイルは安定した人生を築く上で有利です。",
        jobs: "ITエンジニア、会計士、アナリスト、技術職、工場勤務、ドライバー、警備員",
        compatibility: ["マイペース社員", "隠れ疲労タイプ", "一匹狼ワーカー"],
        condition: { dedication: "low", sacrifice: "high", stress: "low", relationship: "low" }
    },
    {
        name: "家庭が大事",
        icon: "🦁👨‍👩‍👧‍👦",
        level: 20,
        features: "仕事よりも家庭やプライベートを優先するライフ重視派。自己犠牲はせず、ストレスは感じやすいものの、人間関係は大切にします。仕事以外の生活を充実させることに価値を置いています。",
        style: "仕事は生活を支えるための手段。定時で帰宅し、週末は家族と過ごすことを何よりも大切に。子どもの学校行事には必ず参加し、家族旅行を楽しみます。仕事のストレスを家庭に持ち込まないよう心がけています。",
        advice: "人間関係も大切にし、友人や家族との絆を深めることに時間を使うバランス感覚は、人生全体の幸福度を高める重要な要素。仕事だけが人生ではないという考え方は、豊かな人生を送るための賢い選択です。",
        jobs: "パート・アルバイト、在宅ワーク、時短勤務、地域密着型ビジネス、フレックス可能な職種",
        compatibility: ["ライフワークバランス", "お人好し社員", "ゆるふわ社畜"],
        condition: { dedication: "low", sacrifice: "low", stress: "high", relationship: "high" }
    },
    {
        name: "ライフワークバランス",
        icon: "🐼🎋",
        level: 15,
        features: "仕事への献身度も自己犠牲も控えめで、ストレスを感じやすいものの、人間関係はほどほどに保つ、仕事と生活のバランスを大切にする理想的なタイプです。",
        style: "無理をせず、自分のペースで働きながら、プライベートも充実させることを心がけています。残業は極力避け、有給休暇も計画的に取得。人間関係も適度な距離を保ち、深入りしすぎず、疎遠にもならないバランスを取っています。",
        advice: "ストレスを感じやすい性質のため、自分なりのストレス解消法を持ち、メンタルヘルスを管理。仕事も大切、プライベートも大切、そして自分の健康が最も大切という考え方は、これからの時代に最も求められる価値観です。",
        jobs: "公務員、教員、事務職、契約社員、リモートワーク職、フレックス制の企業、福利厚生充実企業",
        compatibility: ["マイペース社員", "家庭が大事", "繊細ワーカー"],
        condition: { dedication: "low", sacrifice: "low", stress: "high", relationship: "low" }
    },
    {
        name: "デキる社員",
        icon: "🦅👑",
        level: 10,
        features: "仕事への献身度は低めですが、自己犠牲はせず、ストレスに強く、人間関係を重視する、リーダーシップを発揮し人を動かすタイプ。優れたコミュニケーション能力とカリスマ性を持っています。",
        style: "自分が第一線で働くよりも、チームを率いて目標を達成することに長けています。自分自身は無理をせず、効率的に働きながら、周囲の人々の能力を最大限に引き出します。人間関係を戦略的に構築します。",
        advice: "ストレスマネジメントが上手で、プレッシャーの中でも冷静に判断を下せます。部下や同僚からの信頼も厚く、困難な状況でもチームをまとめ上げる力があります。このリーダーシップを活かし、さらに高みを目指してください。",
        jobs: "経営者、マネージャー、コンサルタント、営業部長、人事部長、起業家、政治家",
        compatibility: ["チームプレイヤー", "ストイック社畜", "自由人"],
        condition: { dedication: "low", sacrifice: "low", stress: "low", relationship: "high" }
    },
    {
        name: "自由人",
        icon: "🦜🏝️",
        level: 0,
        features: "仕事への献身度も自己犠牲も低く、ストレスに強く、人間関係もほどほどに保つ、自分らしく自由に生きることを最優先する理想的な働き方を実現しています。",
        style: "仕事に縛られることなく、自分の時間を大切にし、やりたいことを自由にやる生き方を選択。ストレスフリーな環境を作り出すことに長けており、無駄なプレッシャーを感じることなく日々を過ごしています。",
        advice: "趣味や旅行、自己啓発など、人生を豊かにする様々な活動に時間を使います。束縛を嫌い、自分の人生を自分でデザインするあなたの姿勢は、真の幸福を手に入れるための最高の方法。この自由を謳歌し続けてください。",
        jobs: "フリーランス、起業家、YouTuber、ブロガー、投資家、アーティスト、ノマドワーカー",
        compatibility: ["デキる社員", "マイペース社員", "ライフワークバランス"],
        condition: { dedication: "low", sacrifice: "low", stress: "low", relationship: "low" }
    }
];

// 状態管理
let currentQuestion = 0;
let scores = {
    dedication: 0,
    sacrifice: 0,
    stress: 0,
    relationship: 0
};

// DOM要素
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const loadingScreen = document.getElementById('loading-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');
const questionText = document.getElementById('question-text');
const currentQuestionNum = document.getElementById('current-question');
const progressFill = document.getElementById('progress-fill');
const optionsContainer = document.getElementById('options-container');
const resultCard = document.getElementById('result-card');

// イベントリスナー
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', resetQuiz);
shareBtn.addEventListener('click', shareResult);

// 診断開始
function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    currentQuestion = 0;
    scores = { dedication: 0, sacrifice: 0, stress: 0, relationship: 0 };
    
    // 質問をシャッフル
    questions = shuffleArray(questionsOriginal);
    
    showQuestion();
}

// 質問を表示
function showQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.text;
    currentQuestionNum.textContent = currentQuestion + 1;
    
    // プログレスバー更新
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    
    // 質問番号に応じて背景を変更
    const questionNumber = currentQuestion + 1;
    const quizScreen = document.getElementById('quiz-screen');
    
    // 既存のクラスを削除
    quizScreen.classList.remove('group-office', 'group-stress', 'group-lifestyle');
    
    if (questionNumber <= 5) {
        // 1-5問目: オフィス・仕事系の背景（落ち着いたブルーグレー）
        quizScreen.style.background = 'linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 50%, #DEE2E6 100%)';
        quizScreen.classList.add('group-office');
    } else if (questionNumber <= 10) {
        // 6-10問目: ストレス・疲労系の背景（温かいオレンジ系）
        quizScreen.style.background = 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 50%, #FFCC02 100%)';
        quizScreen.classList.add('group-stress');
    } else {
        // 11-15問目: 自由・ライフスタイル系の背景（爽やかなグリーン）
        quizScreen.style.background = 'linear-gradient(135deg, #F1F8E9 0%, #DCEDC8 50%, #8BC34A 100%)';
        quizScreen.classList.add('group-lifestyle');
    }
    
    // 選択肢を動的に生成
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        
        // イラスト（絵文字）とテキストを表示
        if (option.emoji) {
            const emojiSpan = document.createElement('span');
            emojiSpan.className = 'option-emoji';
            emojiSpan.textContent = option.emoji;
            btn.appendChild(emojiSpan);
            
            const textSpan = document.createElement('span');
            textSpan.className = 'option-text';
            textSpan.textContent = option.text;
            btn.appendChild(textSpan);
        } else {
            btn.textContent = option.text;
        }
        
        btn.setAttribute('data-value', option.value);
        btn.addEventListener('click', () => {
            selectAnswer(option.value);
        });
        optionsContainer.appendChild(btn);
    });
    
    // アニメーション再トリガー
    const questionCard = document.querySelector('.question-card');
    questionCard.style.animation = 'none';
    setTimeout(() => {
        questionCard.style.animation = 'slideIn 0.4s ease-out';
    }, 10);
}

// 回答選択
function selectAnswer(value) {
    const question = questions[currentQuestion];
    
    // 通常質問：高い値を選ぶとスコアが上がる
    // 逆転質問：高い値を選ぶとスコアが下がる（社畜度が低い）
    const multiplier = question.reverse ? -1 : 1;
    
    // 各軸にスコアを加算（0-5の値 × 軸の重み × 乗数）
    scores.dedication += value * question.axes.dedication * multiplier;
    scores.sacrifice += value * question.axes.sacrifice * multiplier;
    scores.stress += value * question.axes.stress * multiplier;
    scores.relationship += value * question.axes.relationship * multiplier;
    
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showLoading();
    }
}

// ローディング画面を表示
function showLoading() {
    quizScreen.classList.remove('active');
    loadingScreen.classList.add('active');
    
    // 2.5秒後に結果を表示
    setTimeout(() => {
        showResult();
    }, 2500);
}

// 演出アニメーション（5種類からランダム）
function createCelebration() {
    const types = ['confetti', 'fireworks', 'hearts', 'stars', 'sparkles'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    switch(randomType) {
        case 'confetti':
            createConfetti();
            break;
        case 'fireworks':
            createFireworks();
            break;
        case 'hearts':
            createHearts();
            break;
        case 'stars':
            createStars();
            break;
        case 'sparkles':
            createSparkles();
            break;
    }
}

// 1. 紙吹雪
function createConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    container.className = 'confetti-container';
    
    const colors = ['#ff69b4', '#ff1493', '#ffc0e3', '#ff85c0', '#ffb3d9', '#ffd700', '#00bcd4', '#4caf50'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = ['🎉', '🎊', '✨', '💫'][Math.floor(Math.random() * 4)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';
        container.appendChild(confetti);
    }
    
    setTimeout(() => container.innerHTML = '', 5000);
}

// 2. 花火
function createFireworks() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    container.className = 'confetti-container';
    
    for (let i = 0; i < 50; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.textContent = '🎆';
        firework.style.left = Math.random() * 100 + '%';
        firework.style.top = Math.random() * 100 + '%';
        firework.style.animationDelay = Math.random() * 2 + 's';
        firework.style.fontSize = (Math.random() * 30 + 20) + 'px';
        container.appendChild(firework);
    }
    
    setTimeout(() => container.innerHTML = '', 5000);
}

// 3. ハート
function createHearts() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    container.className = 'confetti-container';
    
    const heartTypes = ['💕', '💖', '💗', '💓', '💝'];
    
    for (let i = 0; i < 80; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 3 + 's';
        heart.style.animationDuration = (Math.random() * 4 + 3) + 's';
        heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
        container.appendChild(heart);
    }
    
    setTimeout(() => container.innerHTML = '', 5000);
}

// 4. 星
function createStars() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    container.className = 'confetti-container';
    
    const starTypes = ['⭐', '🌟', '✨', '💫', '🌠'];
    
    for (let i = 0; i < 70; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = starTypes[Math.floor(Math.random() * starTypes.length)];
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.fontSize = (Math.random() * 25 + 15) + 'px';
        container.appendChild(star);
    }
    
    setTimeout(() => container.innerHTML = '', 5000);
}

// 5. キラキラ
function createSparkles() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    container.className = 'confetti-container';
    
    for (let i = 0; i < 60; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = '✨';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkle.style.fontSize = (Math.random() * 30 + 15) + 'px';
        container.appendChild(sparkle);
    }
    
    setTimeout(() => container.innerHTML = '', 5000);
}

// 結果を表示
function showResult() {
    loadingScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    // ランダムな演出を発動
    setTimeout(() => {
        createCelebration();
    }, 300);
    
    // 各軸の最大・最小スコアを計算
    let maxDedication = 0, minDedication = 0;
    let maxSacrifice = 0, minSacrifice = 0;
    let maxStress = 0, minStress = 0;
    let maxRelationship = 0, minRelationship = 0;
    
    questions.forEach(q => {
        const multiplier = q.reverse ? -1 : 1;
        const dedWeight = q.axes.dedication * multiplier;
        const sacWeight = q.axes.sacrifice * multiplier;
        const strWeight = q.axes.stress * multiplier;
        const relWeight = q.axes.relationship * multiplier;
        
        // 各重みに対して、最大・最小を加算
        // 正の重み：最大=5倍、最小=0倍
        // 負の重み：最大=0倍、最小=5倍（負の数になる）
        maxDedication += Math.max(dedWeight * 5, dedWeight * 0);
        minDedication += Math.min(dedWeight * 5, dedWeight * 0);
        
        maxSacrifice += Math.max(sacWeight * 5, sacWeight * 0);
        minSacrifice += Math.min(sacWeight * 5, sacWeight * 0);
        
        maxStress += Math.max(strWeight * 5, strWeight * 0);
        minStress += Math.min(strWeight * 5, strWeight * 0);
        
        maxRelationship += Math.max(relWeight * 5, relWeight * 0);
        minRelationship += Math.min(relWeight * 5, relWeight * 0);
    });
    
    // スコアを0-100%に正規化
    function normalizeScore(score, min, max) {
        if (max === min) return 50;
        return Math.max(0, Math.min(100, ((score - min) / (max - min)) * 100));
    }
    
    const normalizedScores = {
        dedication: normalizeScore(scores.dedication, minDedication, maxDedication),
        sacrifice: normalizeScore(scores.sacrifice, minSacrifice, maxSacrifice),
        stress: normalizeScore(scores.stress, minStress, maxStress),
        relationship: normalizeScore(scores.relationship, minRelationship, maxRelationship)
    };
    
    // デバッグ用ログ
    console.log('生スコア:', scores);
    console.log('範囲:', { 
        dedication: [minDedication, maxDedication],
        sacrifice: [minSacrifice, maxSacrifice],
        stress: [minStress, maxStress],
        relationship: [minRelationship, maxRelationship]
    });
    console.log('正規化スコア:', normalizedScores);
    
    // 各軸を高/低に分類（50%を閾値）
    const classification = {
        dedication: normalizedScores.dedication >= 50 ? "high" : "low",
        sacrifice: normalizedScores.sacrifice >= 50 ? "high" : "low",
        stress: normalizedScores.stress >= 50 ? "high" : "low",
        relationship: normalizedScores.relationship >= 50 ? "high" : "low"
    };
    
    console.log('分類:', classification);
    
    // マッチするタイプを見つける
    const resultType = resultTypes.find(type => 
        type.condition.dedication === classification.dedication &&
        type.condition.sacrifice === classification.sacrifice &&
        type.condition.stress === classification.stress &&
        type.condition.relationship === classification.relationship
    ) || resultTypes[15]; // デフォルトは「自由人」
    
    console.log('結果タイプ:', resultType.name);
    
    // タイプに応じたクラスを追加（0-15のインデックス）
    const typeIndex = resultTypes.findIndex(type => type.name === resultType.name);
    resultCard.className = 'result-card';
    resultCard.classList.add(`result-type-${typeIndex}`);
    resultScreen.className = 'screen active';
    resultScreen.classList.add(`result-theme-${typeIndex}`);
    
    // 結果を表示
    document.getElementById('result-icon').textContent = resultType.icon;
    document.getElementById('result-type').textContent = resultType.name;
    
    // 社畜レベルを表示
    const shachuLevelEl = document.getElementById('shachu-level');
    const shachuLevelBarEl = document.getElementById('shachu-level-bar');
    if (shachuLevelEl) shachuLevelEl.textContent = resultType.level || 0;
    if (shachuLevelBarEl) {
        setTimeout(() => {
            shachuLevelBarEl.style.width = (resultType.level || 0) + '%';
        }, 500);
    }
    
    // 3つのセクションに分けて表示
    const featuresEl = document.getElementById('result-features');
    const styleEl = document.getElementById('result-style');
    const adviceEl = document.getElementById('result-advice');
    const jobsEl = document.getElementById('result-jobs');
    const compatibilityEl = document.getElementById('result-compatibility');
    
    if (featuresEl) featuresEl.textContent = resultType.features || '';
    if (styleEl) styleEl.textContent = resultType.style || '';
    if (adviceEl) adviceEl.textContent = resultType.advice || '';
    if (jobsEl) jobsEl.textContent = resultType.jobs || '';
    
    // 相性の良いタイプを表示
    if (compatibilityEl && resultType.compatibility) {
        compatibilityEl.innerHTML = '';
        resultType.compatibility.forEach(typeName => {
            const compatType = resultTypes.find(t => t.name === typeName);
            if (compatType) {
                const compatItem = document.createElement('div');
                compatItem.className = 'compatibility-item';
                compatItem.innerHTML = `
                    <span class="compat-icon">${compatType.icon}</span>
                    <span class="compat-name">${compatType.name}</span>
                `;
                compatibilityEl.appendChild(compatItem);
            }
        });
    }
    
    // バーを更新
    setTimeout(() => {
        document.getElementById('dedication-bar').style.width = normalizedScores.dedication + '%';
        document.getElementById('sacrifice-bar').style.width = normalizedScores.sacrifice + '%';
        document.getElementById('stress-bar').style.width = normalizedScores.stress + '%';
        document.getElementById('relationship-bar').style.width = normalizedScores.relationship + '%';
    }, 300);
}

// リセット
function resetQuiz() {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
}

// 結果をシェア
function shareResult() {
    const resultType = document.getElementById('result-type').textContent;
    const shareText = `私の社畜診断結果は「${resultType}」でした！ #社畜診断`;
    
    if (navigator.share) {
        navigator.share({
            title: '社畜診断',
            text: shareText,
            url: window.location.href
        }).catch(err => console.log('シェアがキャンセルされました'));
    } else {
        // フォールバック：クリップボードにコピー
        navigator.clipboard.writeText(shareText).then(() => {
            alert('結果をクリップボードにコピーしました！');
        }).catch(() => {
            alert(shareText);
        });
    }
}

