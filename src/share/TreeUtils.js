/**
 * 根据传入的 IDs，获取数据列表。如果 IDs 为 null 之类的，则将父节点为 null 的作为根节点
 */
function getRootList(items = [], ids = [], idName = 'id', parentIdName = 'parentId') {
  const rootItems = [];
  let rootIds = ids;
  let propName = idName;

  if (!ids) {
    rootIds = [null, undefined, ''];
    propName = parentIdName;
  }

  rootIds.forEach((id) => {
    items.some((item) => {
      if (item[propName] === id) {
        rootItems.push(item);
        // return true;
      }
      return false;
    });
  });


  return rootItems;
}

/**
 * 根据 parentId 对 items 进行分组
 * @param items {Array}
 * @param parentIdName {String}
 * @return {Map}
 */
function groupByParentId(items = [], parentIdName = 'parentId') {
  const groups = new Map();

  // 以 parentId 为 key 构造集合
  items.forEach((item) => {
    if (!(parentIdName in item)) {
      return;
    }

    const parentId = item[parentIdName];
    const subTree = groups.get(parentId);

    if (!subTree) {
      groups.set(parentId, []);
    }

    groups.get(parentId).push(item);
  });

  return groups;
}

/**
 * 创建嵌套树，可传入根节点的 ID
 * @param items {Array}
 * @param rootIds {Array}
 * @param options {Object}
 * @return {Array}
 */
function createNestedTree(items = [], rootIds, options) {
  const {
    idName = 'id',
    parentIdName = 'parentId',
    subTreeName = 'children',
  } = options;

  const group = groupByParentId(items, parentIdName);
  const rootItems = getRootList(items, rootIds, idName, parentIdName);

  // 递归创建树
  function createTreeItems(roots) {
    const list = [];
    if (!roots) {
      return [];
    }
    roots.forEach((rootItem) => {
      const newItem = Object.assign({}, rootItem);
      const key = rootItem[idName];
      newItem[subTreeName] = createTreeItems(group.get(key));
      list.push(newItem);
    });
    return list;
  }

  return createTreeItems(rootItems);
}

/**
 * 摊平嵌套树
 */
function concatNestedTree(items = [], depth = 0, subTreeName = 'children', depthName = '$depth') {
  const list = [];

  items.forEach((item) => {
    const newItem = Object.assign({}, item);
    const subTree = newItem[subTreeName];

    delete newItem[subTreeName];
    newItem[depthName] = depth;

    list.push(newItem);

    if (Array.isArray(subTree) && subTree.length > 0) {
      const subList = concatNestedTree(subTree, depth + 1, subTreeName, depthName);
      list.push(...subList);
    }
  });

  return list;
}

const TreeUtils = {
  createNestedTree,
  concatNestedTree,
};

export default TreeUtils;
