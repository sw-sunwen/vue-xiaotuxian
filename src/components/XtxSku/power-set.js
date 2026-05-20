
export default function bwPowerSet (originalSet) {
  const subSets = []

  // We will have 2^n possible combinations (where n is a length of original set).
  // It is because for every element of original set we will decide whether to include
  // it or not (2 options for each set element).
  // 我们将有 2^n 种可能的组合（其中 n 是原始集合的长度）
  // 这是因为对于原始集合中的每个元素，我们都要决定是否包含它（每个集合元素有 2 个选项）
  const numberOfCombinations = 2 ** originalSet.length

  // Each number in binary representation in a range from 0 to 2^n does exactly what we need:
  // it shows by its bits (0 or 1) whether to include related element from the set or not.
  // For example, for the set {1, 2, 3} the binary number of 0b010 would mean that we need to
  // include only "2" to the current set.
  // 0 到 2^n 范围内每个数字的二进制表示正好满足我们的需求：
  // 它通过位（0 或 1）显示是否包含集合中的相关元素
  // 例如，对于集合 {1, 2, 3}，二进制数 0b010 意味着我们只需要在当前集合中包含 "2"
  for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
    const subSet = []

    for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
      // Decide whether we need to include current element into the subset or not.
      // 决定是否需要将当前元素包含到子集中
      if (combinationIndex & (1 << setElementIndex)) {
        subSet.push(originalSet[setElementIndex])
      }
    }

    // Add current subset to the list of all subsets.
    // 将当前子集添加到所有子集的列表中
    subSets.push(subSet)
  }

  return subSets
}