#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修正後の診断分布テストスクリプト
"""

import random
from collections import defaultdict

# 結果タイプ
result_types = [
    {"name": "生粋の社畜", "index": 0},
    {"name": "バーンアウト予備軍", "index": 1},
    {"name": "ストイック社畜", "index": 2},
    {"name": "一匹狼ワーカー", "index": 3},
    {"name": "心優しき社畜", "index": 4},
    {"name": "繊細ワーカー", "index": 5},
    {"name": "チームプレイヤー", "index": 6},
    {"name": "マイペース社員", "index": 7},
    {"name": "ゆるふわ社畜", "index": 8},
    {"name": "デキる社員", "index": 9},
    {"name": "お人好し社員", "index": 10},
    {"name": "現実派社員", "index": 11},
    {"name": "ライフワークバランス", "index": 12},
    {"name": "自由人", "index": 13},
    {"name": "普通の社員", "index": 14},
    {"name": "その他", "index": 15}
]

# 修正後のパターンマップ（ストイック社畜を減らした版）
pattern_map = {
    # === HIGH-HIGH ===
    'high-high-high-high': result_types[0],   # 生粋の社畜（レア）
    'high-high-high-low': result_types[2],    # ストイック社畜
    'high-high-high-medium': result_types[0], # 生粋の社畜（レア）
    'high-high-low-high': result_types[6],    # チームプレイヤー
    'high-high-low-low': result_types[3],     # 一匹狼ワーカー
    'high-high-low-medium': result_types[6],  # チームプレイヤー
    'high-high-medium-high': result_types[1], # バーンアウト予備軍
    'high-high-medium-low': result_types[2],  # ストイック社畜
    'high-high-medium-medium': result_types[9], # デキる社員
    # === HIGH-MEDIUM ===
    'high-medium-high-high': result_types[4], # 心優しき社畜
    'high-medium-high-low': result_types[5],  # 繊細ワーカー
    'high-medium-high-medium': result_types[4], # 心優しき社畜
    'high-medium-low-high': result_types[6],  # チームプレイヤー
    'high-medium-low-low': result_types[3],   # 一匹狼ワーカー
    'high-medium-low-medium': result_types[3], # 一匹狼ワーカー
    'high-medium-medium-high': result_types[4], # 心優しき社畜
    'high-medium-medium-low': result_types[5], # 繊細ワーカー
    'high-medium-medium-medium': result_types[7], # マイペース社員
    # === HIGH-LOW ===
    'high-low-high-high': result_types[4],    # 心優しき社畜
    'high-low-high-low': result_types[5],     # 繊細ワーカー
    'high-low-high-medium': result_types[5],  # 繊細ワーカー
    'high-low-low-high': result_types[3],     # 一匹狼ワーカー
    'high-low-low-low': result_types[3],      # 一匹狼ワーカー
    'high-low-low-medium': result_types[3],   # 一匹狼ワーカー
    'high-low-medium-high': result_types[6],  # チームプレイヤー
    'high-low-medium-low': result_types[15],  # 自由人（レア）
    'high-low-medium-medium': result_types[7], # マイペース社員
    # === MEDIUM-HIGH ===
    'medium-high-high-high': result_types[1], # バーンアウト予備軍
    'medium-high-high-low': result_types[8],  # ゆるふわ社畜
    'medium-high-high-medium': result_types[9], # 隠れ疲労タイプ
    'medium-high-low-high': result_types[10], # お人好し社員
    'medium-high-low-low': result_types[11],  # 現実派社員
    'medium-high-low-medium': result_types[11], # 現実派社員
    'medium-high-medium-high': result_types[10], # お人好し社員
    'medium-high-medium-low': result_types[10], # お人好し社員
    'medium-high-medium-medium': result_types[9], # 隠れ疲労タイプ
    # === MEDIUM-MEDIUM ===
    'medium-medium-high-high': result_types[9], # 隠れ疲労タイプ
    'medium-medium-high-low': result_types[8], # ゆるふわ社畜
    'medium-medium-high-medium': result_types[1], # バーンアウト予備軍
    'medium-medium-low-high': result_types[12], # 家庭が大事
    'medium-medium-low-low': result_types[14], # デキる社員
    'medium-medium-low-medium': result_types[13], # ライフワークバランス
    'medium-medium-medium-high': result_types[10], # お人好し社員
    'medium-medium-medium-low': result_types[11], # 現実派社員
    'medium-medium-medium-medium': result_types[11], # 現実派社員
    # === MEDIUM-LOW ===
    'medium-low-high-high': result_types[12], # 家庭が大事
    'medium-low-high-low': result_types[13],  # ライフワークバランス
    'medium-low-high-medium': result_types[8], # ゆるふわ社畜
    'medium-low-low-high': result_types[14],  # デキる社員
    'medium-low-low-low': result_types[14],   # デキる社員
    'medium-low-low-medium': result_types[14], # デキる社員
    'medium-low-medium-high': result_types[12], # 家庭が大事
    'medium-low-medium-low': result_types[0], # 生粋の社畜（レア移動）
    'medium-low-medium-medium': result_types[7], # マイペース社員
    # === LOW-HIGH ===
    'low-high-high-high': result_types[8],    # ゆるふわ社畜
    'low-high-high-low': result_types[8],     # ゆるふわ社畜
    'low-high-high-medium': result_types[9],  # 隠れ疲労タイプ
    'low-high-low-high': result_types[10],    # お人好し社員
    'low-high-low-low': result_types[11],     # 現実派社員
    'low-high-low-medium': result_types[11],  # 現実派社員
    'low-high-medium-high': result_types[10], # お人好し社員
    'low-high-medium-low': result_types[8],   # ゆるふわ社畜
    'low-high-medium-medium': result_types[12], # ライフワークバランス
    # === LOW-MEDIUM ===
    'low-medium-high-high': result_types[4],  # 心優しき社畜
    'low-medium-high-low': result_types[5],   # 繊細ワーカー
    'low-medium-high-medium': result_types[4], # 心優しき社畜
    'low-medium-low-high': result_types[6],   # チームプレイヤー
    'low-medium-low-low': result_types[3],    # 一匹狼ワーカー
    'low-medium-low-medium': result_types[3], # 一匹狼ワーカー
    'low-medium-medium-high': result_types[4], # 心優しき社畜
    'low-medium-medium-low': result_types[5], # 繊細ワーカー
    'low-medium-medium-medium': result_types[7], # マイペース社員
    # === LOW-LOW ===
    'low-low-high-high': result_types[4],     # 心優しき社畜
    'low-low-high-low': result_types[5],      # 繊細ワーカー
    'low-low-high-medium': result_types[4],   # 心優しき社畜
    'low-low-low-high': result_types[6],      # チームプレイヤー
    'low-low-low-low': result_types[13],      # 自由人（レア）
    'low-low-low-medium': result_types[3],    # 一匹狼ワーカー
    'low-low-medium-high': result_types[4],   # 心優しき社畜
    'low-low-medium-low': result_types[5],    # 繊細ワーカー
    'low-low-medium-medium': result_types[7]  # マイペース社員
}

def calculate_scores(answers):
    """スコア計算"""
    scores = {"dedication": 0, "sacrifice": 0, "stress": 0, "relationship": 0}
    
    # 簡略化：ランダムに各軸にスコアを分配
    for answer in answers:
        if answer >= 3:  # 3以上の場合
            # ランダムに軸を選択してスコアを追加
            axis = random.choice(list(scores.keys()))
            scores[axis] += answer
    
    return scores

def normalize_scores(scores):
    """スコア正規化"""
    max_possible = 16 * 5  # 16問 × 最大値5
    return {
        "dedication": round((scores["dedication"] / max_possible) * 100),
        "sacrifice": round((scores["sacrifice"] / max_possible) * 100),
        "stress": round((scores["stress"] / max_possible) * 100),
        "relationship": round((scores["relationship"] / max_possible) * 100)
    }

def get_level(score):
    """レベル判定"""
    if score >= 60:
        return 'high'
    elif score >= 35:
        return 'medium'
    else:
        return 'low'

def get_result_type(normalized_scores):
    """診断結果取得"""
    dedication_level = get_level(normalized_scores["dedication"])
    sacrifice_level = get_level(normalized_scores["sacrifice"])
    stress_level = get_level(normalized_scores["stress"])
    relationship_level = get_level(normalized_scores["relationship"])
    
    pattern = f"{dedication_level}-{sacrifice_level}-{stress_level}-{relationship_level}"
    result = pattern_map.get(pattern, result_types[14])  # フォールバック: 普通の社員
    
    return result

def run_test():
    """1000回テスト実行"""
    results = defaultdict(int)
    pattern_counts = defaultdict(int)
    
    print("=== 修正後 1000回診断テスト開始 ===")
    
    for i in range(1000):
        # ランダムな回答を生成（0-5の値）
        answers = [random.randint(0, 5) for _ in range(16)]
        
        # スコア計算
        scores = calculate_scores(answers)
        normalized_scores = normalize_scores(scores)
        
        # 結果取得
        result = get_result_type(normalized_scores)
        
        # カウント
        results[result["name"]] += 1
        
        # パターンカウント
        dedication_level = get_level(normalized_scores["dedication"])
        sacrifice_level = get_level(normalized_scores["sacrifice"])
        stress_level = get_level(normalized_scores["stress"])
        relationship_level = get_level(normalized_scores["relationship"])
        pattern = f"{dedication_level}-{sacrifice_level}-{stress_level}-{relationship_level}"
        pattern_counts[pattern] += 1
    
    print("\n=== 結果分布 ===")
    for name, count in sorted(results.items(), key=lambda x: x[1], reverse=True):
        percentage = (count / 1000) * 100
        print(f"{name}: {count}回 ({percentage:.1f}%)")
    
    print("\n=== ストイック社畜の出現パターン ===")
    for pattern, count in pattern_counts.items():
        if pattern_map.get(pattern, {}).get("name") == "ストイック社畜":
            percentage = (count / 1000) * 100
            print(f"{pattern}: {count}回 ({percentage:.1f}%)")
    
    return results

if __name__ == "__main__":
    run_test()
