/**
 * Created by wudongbo on 2015/10/21.
 */
/**
 * Expose
 */

module.exports = {

	/**
	 * CnodeJs接口相关配置
	 */
	CNODEJS_API_Config: {
		ACCESS_TOKEN: "92c39ea0-9086-4e0e-8cbe-b24666a74e0e",
		baseUrl: 'https://cnodejs.org/api/v1',
		api: {
			//验证 accessToken 的正确性
			ACCESS_TOKEN : '/accesstoken',
			//用户详情
			GET_USER : '/user/{0}',
			//主题首页
			GET_TOPICS : '/topics',
			//主题详情
			GET_TOPIC : '/topic/{0}',
			//新建主题
			POST_TOPIC : '/topics'
		}
	}
};
