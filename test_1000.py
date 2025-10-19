import random
import math

# 実際のサイトと同じ質問データ（15問）
questions = [
    {"axes": {"dedication": 1, "sacrifice": 1, "stress": 0.5, "relationship": 0}, "reverse": False},
    {"axes": {"dedication": 0.8, "sacrifice": 1, "stress": 0, "relationship": 0}, "reverse": False},
    {"axes": {"dedication": 0.7, "sacrifice": 0.6, "stress": 0, "relationship": 1}, "reverse": False},
    {"axes": {"dedication": 0.9, "sacrifice": 1, "stress": 0.7, "relationship": 0}, "reverse": False},
    {"axes": {"dedication": 0.3, "sacrifice": 0.7, "stress": 0, "relationship": 1}, "reverse": False},
    {"axes": {"dedication": 0.5, "sacrifice": 0.6, "stress": 0, "relationship": 1}, "reverse": False},
    {"axes": {"dedication": 0.8, "sacrifice": 0.8, "stress": 0.5, "relationship": 0.3}, "reverse": False},
    {"axes": {"dedication": 0.7, "sacrifice": 0.5, "stress": 1, "relationship": 0}, "reverse": False},
    {"axes": {"dedication": 1, "sacrifice": 1, "stress": 0, "relationship": 0}, "reverse": False},
    {"axes": {"dedication": 0.9, "sacrifice": 1, "stress": 0, "relationship": 0.5}, "reverse": False},
    {"axes": {"dedication": 1, "sacrifice": 0, "stress": 0, "relationship": 0}, "reverse": True},
    {"axes": {"dedication": 0.8, "sacrifice": 0, "stress": 0, "relationship": 0}, "reverse": True},
    {"axes": {"dedication": 0.7, "sacrifice": 0, "stress": 0, "relationship": 0.5}, "reverse": True},
    {"axes": {"dedication": 0.6, "sacrifice": 0, "stress": 0.3, "relationship": 0}, "reverse": True},
    {"axes": {"dedication": 0.9, "sacrifice": 0, "stress": 0, "relationship": 0}, "reverse": True}
]

TYPES = {
    "ELITE": {"name": "生粋の社畜", "rare": True},
    "BURNOUT": {"name": "限界突破社畜", "rare": False},
    "STOIC": {"name": "無敗の職人社畜", "rare": False},
    "LONE": {"name": "孤高の成果主義社畜", "rare": False},
    "KIND": {"name": "心優しき社畜", "rare": False},
    "SENSITIVE": {"name": "誠実な観察社員", "rare": False},
    "TEAM": {"name": "共創リーダー社員", "rare": False},
    "PACE": {"name": "マイペース社員", "rare": False},
    "YURUFUWA": {"name": "ゆるふわ社畜", "rare": False},
    "HIDDEN": {"name": "隠れ疲労社畜", "rare": False},
    "NICE": {"name": "お人好し社員", "rare": False},
    "REAL": {"name": "現実派社員", "rare": False},
    "FAMILY": {"name": "家庭が大事社員", "rare": False},
    "LWB": {"name": "バランサー社員", "rare": False},
    "ABLE": {"name": "成果最適化社畜", "rare": False},
    "FREE": {"name": "自由人", "rare": True}
}

def getResultType(normalizedScores):
    ax = {
        "d": normalizedScores["dedication"],
        "s": normalizedScores["sacrifice"],
        "r": normalizedScores["stress"],
        "h": normalizedScores["relationship"]
    }
    
    # レア判定（極端な値のみ）
    if ax["d"] >= 85 and ax["s"] >= 85 and ax["r"] >= 85 and ax["h"] >= 85:
        return TYPES["ELITE"]
    if ax["d"] <= 15 and ax["s"] <= 15 and ax["r"] <= 15 and ax["h"] <= 15:
        return TYPES["FREE"]
    
    # 非レアタイプを均等に分散させるためのシンプルなロジック
    nonRareTypes = [t for t in TYPES.values() if not t["rare"]]
    
    # スコアの合計値を使って均等分散
    totalScore = ax["d"] + ax["s"] + ax["r"] + ax["h"]
    normalizedTotal = (totalScore / 400) * 100  # 0-100に正規化
    
    # 各タイプに均等な範囲を割り当て
    rangePerType = 100 / len(nonRareTypes)
    typeIndex = int(normalizedTotal / rangePerType)
    selectedType = nonRareTypes[min(typeIndex, len(nonRareTypes) - 1)]
    
    return selectedType

def computeAxes(answers):
    scores = {"dedication": 0, "sacrifice": 0, "stress": 0, "relationship": 0}
    
    for i, question in enumerate(questions):
        value = answers[i]
        multiplier = -1 if question["reverse"] else 1
        scores["dedication"] += value * question["axes"]["dedication"] * multiplier
        scores["sacrifice"] += value * question["axes"]["sacrifice"] * multiplier
        scores["stress"] += value * question["axes"]["stress"] * multiplier
        scores["relationship"] += value * question["axes"]["relationship"] * multiplier
    
    # 各軸の最大・最小スコアを計算
    maxDedication = minDedication = 0
    maxSacrifice = minSacrifice = 0
    maxStress = minStress = 0
    maxRelationship = minRelationship = 0
    
    for q in questions:
        multiplier = -1 if q["reverse"] else 1
        dedWeight = q["axes"]["dedication"] * multiplier
        sacWeight = q["axes"]["sacrifice"] * multiplier
        strWeight = q["axes"]["stress"] * multiplier
        relWeight = q["axes"]["relationship"] * multiplier
        
        maxDedication += max(dedWeight * 5, dedWeight * 0)
        minDedication += min(dedWeight * 5, dedWeight * 0)
        maxSacrifice += max(sacWeight * 5, sacWeight * 0)
        minSacrifice += min(sacWeight * 5, sacWeight * 0)
        maxStress += max(strWeight * 5, strWeight * 0)
        minStress += min(strWeight * 5, strWeight * 0)
        maxRelationship += max(relWeight * 5, relWeight * 0)
        minRelationship += min(relWeight * 5, relWeight * 0)
    
    def normalizeScore(score, min_val, max_val):
        if max_val == min_val:
            return 50
        return max(0, min(100, ((score - min_val) / (max_val - min_val)) * 100))
    
    return {
        "dedication": normalizeScore(scores["dedication"], minDedication, maxDedication),
        "sacrifice": normalizeScore(scores["sacrifice"], minSacrifice, maxSacrifice),
        "stress": normalizeScore(scores["stress"], minStress, maxStress),
        "relationship": normalizeScore(scores["relationship"], minRelationship, maxRelationship)
    }

# 1000回テスト実行
results = {}
for i in range(1000):
    answers = [random.randint(0, 5) for _ in range(15)]
    scores = computeAxes(answers)
    resultType = getResultType(scores)
    
    name = resultType["name"]
    if name in results:
        results[name] += 1
    else:
        results[name] = 1

# 結果を表示
print("=== 1000回テスト結果 ===")
for name, count in sorted(results.items(), key=lambda x: x[1], reverse=True):
    percentage = (count / 1000 * 100)
    print(f"{name}: {count}回 ({percentage:.1f}%)")
