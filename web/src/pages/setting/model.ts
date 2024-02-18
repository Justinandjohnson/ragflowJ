import { ITenantInfo } from '@/interfaces/database/knowledge';
import { IThirdOAIModelCollection as IThirdAiModelCollection } from '@/interfaces/database/llm';
import userService from '@/services/userService';
import authorizationUtil from '@/utils/authorizationUtil';
import { message } from 'antd';
import { Nullable } from 'typings';
import { DvaModel } from 'umi';

export interface SettingModelState {
  isShowPSwModal: boolean;
  isShowTntModal: boolean;
  isShowSAKModal: boolean;
  isShowSSModal: boolean;
  llm_factory: string;
  tenantIfo: Nullable<ITenantInfo>;
  llmInfo: IThirdAiModelCollection;
  myLlm: any[];
  factoriesList: any[];
}

const model: DvaModel<SettingModelState> = {
  namespace: 'settingModel',
  state: {
    isShowPSwModal: false,
    isShowTntModal: false,
    isShowSAKModal: false,
    isShowSSModal: false,
    llm_factory: '',
    tenantIfo: null,
    llmInfo: {},
    myLlm: [],
    factoriesList: [],
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {});
    },
  },
  effects: {
    *setting({ payload = {} }, { call, put }) {
      const { data } = yield call(userService.setting, payload);
      const { retcode } = data;
      if (retcode === 0) {
        message.success('密码修改成功！');
        yield put({
          type: 'updateState',
          payload: {
            isShowPSwModal: false,
          },
        });
        yield put({
          type: 'getUserInfo',
          payload: {},
        });
      }
    },
    *getUserInfo({ payload = {} }, { call, put }) {
      const { data, response } = yield call(userService.user_info, payload);
      const { retcode, data: res, retmsg } = data;
      const userInfo = {
        avatar: res.avatar,
        name: res.nickname,
        email: res.email,
      };
      authorizationUtil.setUserInfo(userInfo);
      if (retcode === 0) {
        // localStorage.setItem('userInfo',res.)
      }
    },
    *getTenantInfo({ payload = {} }, { call, put }) {
      const { data } = yield call(userService.get_tenant_info, payload);
      const { retcode, data: res } = data;
      // llm_id 对应chat_id
      // asr_id 对应speech2txt

      if (retcode === 0) {
        res.chat_id = res.llm_id;
        res.speech2text_id = res.asr_id;
        yield put({
          type: 'updateState',
          payload: {
            tenantIfo: res,
          },
        });
      }
    },
    *set_tenant_info({ payload = {} }, { call, put }) {
      const { data } = yield call(userService.set_tenant_info, payload);
      const { retcode } = data;
      // llm_id 对应chat_id
      // asr_id 对应speech2txt
      if (retcode === 0) {
        yield put({
          type: 'updateState',
          payload: {
            isShowSSModal: false,
          },
        });
        yield put({
          type: 'getTenantInfo',
        });
      }
      return retcode;
    },

    *factories_list({ payload = {} }, { call, put }) {
      const { data, response } = yield call(
        userService.factories_list,
        payload,
      );
      const { retcode, data: res, retmsg } = data;
      if (retcode === 0) {
        yield put({
          type: 'updateState',
          payload: {
            factoriesList: res,
          },
        });
      }
    },
    *llm_list({ payload = {} }, { call, put }) {
      const { data } = yield call(userService.llm_list, payload);
      const { retcode, data: res } = data;
      if (retcode === 0) {
        yield put({
          type: 'updateState',
          payload: {
            llmInfo: res,
          },
        });
      }
    },
    *my_llm({ payload = {} }, { call, put }) {
      const { data, response } = yield call(userService.my_llm, payload);
      const { retcode, data: res, retmsg } = data;
      if (retcode === 0) {
        yield put({
          type: 'updateState',
          payload: {
            myLlm: res,
          },
        });
      }
    },
    *set_api_key({ payload = {} }, { call, put }) {
      const { data } = yield call(userService.set_api_key, payload);
      const { retcode } = data;
      if (retcode === 0) {
        message.success('设置API KEY成功！');
        yield put({
          type: 'updateState',
          payload: {
            isShowSAKModal: false,
          },
        });
      }
    },
  },
};
export default model;
