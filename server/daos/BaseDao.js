const { Schema } = require('mongoose');
const MongodbUtil = require('../utils/MongodbUtil');

class BaseDao {
  constructor(tbName, bean) {
    this.bean = bean;
    this.Model = MongodbUtil.getClient().model(tbName, new Schema(bean), tbName);
  }

  /**
   * 根据条件获取总数
   * @param bean
   * @return {Promise<Number>}
   */
  getCountByCondition(bean = {}) {
    return this.Model.countDocuments(this.fmtBean(bean)).exec();
  }

  /**
   * 根据条件删除
   * @param bean
   * @return {Promise<any>}
   */
  deleteByCondition(bean = {}) {
    return this.Model.deleteMany(this.fmtBean(bean)).exec().then((res) => {
      const { n, ok } = res;

      if (ok !== 1) {
        return Promise.reject(new Error('删除失败'));
      }

      if (n === 0) {
        return Promise.reject(new Error('未匹配到记录'));
      }

      if (n > 0) {
        return Promise.resolve('ok');
      }
    });
  }

  /**
   * 插入
   * @param bean
   * @returns {Promise<any>}
   */
  insert(bean) {
    return new Promise((resolve, reject) => {
      new this.Model(this.fmtBean(bean)).save((error) => {
        if (error) {
          return reject(error);
        }
        return resolve('ok');
      });
    });
  }

  /**
   * 根据条件获取一条数据
   * @param bean
   * @returns {Promise<any>}
   */
  getByCondition(bean) {
    return this.Model.findOne(this.fmtBean(bean)).exec();
  }


  /**
   * 根据条件和分页器获取列表
   * @param bean {Object} 条件
   * @param pager {{pageSize: Number, currentPage: Number}} 分页器
   * @return {Promise<Array>}
   */
  getListByConditionAndPager(bean = {}, pager = { pageSize: 20, currentPage: 1 }) {
    const { pageSize, currentPage } = pager;
    const limit = pageSize;
    const skip = pageSize * (currentPage - 1);

    return this.Model.find(this.fmtBean(bean)).skip(skip).limit(limit).exec();
  }

  /**
   * 根据条件更新，只更新不为 null/undefined 的字段
   * @param conditionBean
   * @param bean
   * @return {Promise<Array>}
   */
  async updateSelectiveByCondition(conditionBean = {}, bean) {
    const newBean = {};
    Object.keys(bean).forEach((key) => {
      if (bean[key] != null) {
        newBean[key] = bean[key];
      }
    });
    return this.Model.updateOne(this.fmtBean(conditionBean), newBean).exec().then((res) => {
      // { n: 1, nModified: 1, ok: 1 }
      const { n, ok } = res;

      if (ok !== 1) {
        return Promise.reject(new Error('更新失败'));
      }

      if (n === 0) {
        return Promise.reject(new Error('未匹配到记录'));
      }

      if (n > 0) {
        return Promise.resolve('ok');
      }
    });
  }

  /**
   * 格式化 bean，剔除掉 Model 中不存在的字段
   * @param bean
   */
  fmtBean(bean) {
    const newBean = {};
    Object.keys(bean).forEach((prop) => {
      if (prop in this.bean) {
        newBean[prop] = bean[prop];
      }
    });

    return newBean;
  }
}

module.exports = BaseDao;
