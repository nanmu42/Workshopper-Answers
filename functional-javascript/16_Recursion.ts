/**
 * 2017-9-5 15:29:32
 *
 * Implement a recursive function that returns all of the unique dependencies,
 * and sub-dependencies of a module, sorted alphabetically.
 * Dependencies should be printed as dependency@version e.g. 'inflection@1.2.6'.
 *
 * Multiple versions of the same module are allowed,
 * but duplicates modules of the same version should be removed.
 * */

interface NpmTree {
  name: string,
  version: string,
  dependencies: any,
}

/**
 * 递归地求取依赖数组
 * @description
 * 递归情况分析：
 * 1. 输入有name字段，说明在树顶；
 * 2. 输入有dependencies和version字段，说明还可以下探；
 * 3. 输入仅有version字段，说明已到分支底部
 * */
function getDependencies(tree: NpmTree | any, prev: string[] = []): any {
  console.warn(tree);

  let result = function resolveOneLayer(tree: NpmTree | any, prev: string[] = []): any[] {
    for (let branch in tree) {
      uniquePush(prev, branch + '@' + tree[ branch ].version);
      if ('dependencies' in tree[ branch ]) {
        resolveOneLayer(tree[ branch ].dependencies, prev);
      }
    }
    return prev;
  }(tree.dependencies, []);

  return result.sort();
}

function uniquePush(arr: any[], item: any) {
  if (arr.indexOf(item) === -1) {
    arr.push(item);
  }
}

module.exports = getDependencies;
