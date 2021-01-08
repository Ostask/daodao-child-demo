import actions from "@/shared/actions";

export function sendUserInfo(info){
    actions.setGlobalState({ userInfo:info });
}

export function watchUserInfo(func,bool){
    actions.onGlobalStateChange(func,bool);
}