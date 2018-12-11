import http from '../plugins/CordovaHttp';

class BaseService {
  /**
   *
   * @param API {{INSERT?: string, DELETE?: string,
   * UPDATE?: string, GET_ONE?: string, GET_LIST?: string}}
   */
  constructor(API) {
    this.API = API;
  }

  /**
   * 插入一条数据
   * @param bean
   * @return {AxiosPromise<any>}
   */
  insert(bean) {
    return http.post(this.API.INSERT, bean);
  }

  /**
   * 删除一条数据
   * @param bean
   * @return {AxiosPromise<any> | * | void}
   */
  delete(bean) {
    return http.post(this.API.DELETE, bean);
  }

  /**
   * 更新一条数据
   * @param bean
   * @return {AxiosPromise<any> | * | void}
   */
  update(bean) {
    return http.post(this.API.UPDATE, bean);
  }

  /**
   * 获取一条数据
   * @param bean
   * @return {AxiosPromise<any> | * | void}
   */
  get(bean) {
    if (Reflect.ownKeys(bean).length === 0) {
      throw new Error('bean prop is required!');
    }
    return http.post(this.API.GET_ONE, bean);
  }

  /**
   * 获取一页数据
   * @param bean
   * @param pager
   * @return {AxiosPromise<any> | * | void}
   */
  getList(bean, pager) {
    const param = { condition: {}, pager };
    Object.assign(param.condition, bean);
    return http.post(this.API.GET_LIST, param);
  }
}

export default BaseService;
