import { supportedBrowsersReg } from "./browser";
import log from "loglevel";

// chrome >=69,edge>=101,Safari>=13,android>=4.4.3,ios>=12,ChromeAndroid>=100
const supportedUserAgents = [
  // Chrome
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_16_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.100.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/205.0.0.0 Safari/537.36",

  // Safari
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Safari/605.1.15",

  // Android (WeChat/WeCom/DingDing/Lark/QQ/AliPay)
  "Mozilla/5.0 (Linux; Android 12; 22041211AC Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3770.156 Mobile Safari/537.36 Lark/5.20.4 LarkLocale/zh_CN ChannelName/Feishu TTWebView/0751130016465",
  "Mozilla/5.0 (Linux; Android 12; 22041211AC Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4313 MMWEBSDK/20220805 Mobile Safari/537.36 MMWEBID/8093 MicroMessenger/8.0.27.2220(0x28001B59) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64",
  "Mozilla/5.0 (Linux; U; Android 12; zh-CN; 22041211AC Build/SP1A.210812.016) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/69.0.3497.100 UWS/3.22.1.233 Mobile Safari/537.36 AliApp(DingTalk/6.5.40) com.alibaba.android.rimet/25926245 Channel/700159 language/zh-CN abi/64 UT4Aplus/0.2.25 colorScheme/dark",
  "Mozilla/5.0 (Linux; Android 12; 22041211AC Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/103.0.5060.129 Mobile Safari/537.36 wxwork/4.0.6 ColorScheme/Dark MicroMessenger/7.0.1 NetType/WIFI Language/zh Lang/zh",
  "Mozilla/5.0 (Linux; Android 10; ONEPLUS A5010 Build/QKQ1.191014.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4317 MMWEBSDK/20220805 Mobile Safari/537.36 MMWEBID/7877 MicroMessenger/8.0.27.2220(0x28001B59) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64",
  "Mozilla/5.0 (Linux; Android 10; ONEPLUS A5010 Build/QKQ1.191014.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3770.156 Mobile Safari/537.36 Lark/5.9.3 LarkLocale/zh_CN ChannelName/Feishu TTWebView/0751130016465",
  "Mozilla/5.0 (Linux; Android 10; TAS-AN00 Build/HUAWEITAS-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4317 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/7869 MicroMessenger/8.0.28.2240(0x28001C39) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64",
  "Mozilla/5.0 (Linux; Android 10; HarmonyOS; TAS-AN00; HMSCore 6.7.0.322) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/12.1.3.303 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 10; TAS-AN00 Build/HUAWEITAS-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3770.156 Mobile Safari/537.36 Lark/5.21.3 LarkLocale/zh_CN ChannelName/Feishu TTWebView/0751130016465",
  "Mozilla/5.0 (Linux; Android 10; TAS-AN00 Build/HUAWEITAS-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046125 Mobile Safari/537.36 wxwork/4.0.16 ColorScheme/Light MicroMessenger/7.0.1 NetType/WIFI Language/zh Lang/zh",
  "Mozilla/5.0 (Linux; Android 12; V2118A Build/SP1A.210812.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4317 MMWEBSDK/20220805 Mobile Safari/537.36 MMWEBID/8237 MicroMessenger/8.0.27.2220(0x28001B59) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64",
  "Mozilla/5.0 (Linux; Android 12; V2118A Build/SP1A.210812.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3770.156 Mobile Safari/537.36 Lark/5.21.3 LarkLocale/zh_CN ChannelName/Feishu TTWebView/0751130016465",
  "Mozilla/5.0 (Linux; Android 12; V2118A Build/SP1A.210812.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046125 Mobile Safari/537.36 wxwork/4.0.8 ColorScheme/Light MicroMessenger/7.0.1 NetType/WIFI Language/zh Lang/zh",
  "Mozilla/5.0 (Linux; U; Android 12; zh-cn; PDNM00 Build/RKQ1.211103.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/90.0.4430.61 Mobile Safari/537.36 HeyTapBrowser/40.8.4.1",
  "Mozilla/5.0 (Linux; Android 12; PDNM00 Build/RKQ1.211103.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3770.156 Mobile Safari/537.36 Lark/5.21.3 LarkLocale/zh_CN ChannelName/Feishu TTWebView/0751130016465",
  "Mozilla/5.0 (Linux; Android 12; PDNM00 Build/RKQ1.211103.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4317 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/3763 MicroMessenger/8.0.28.2240(0x28001C6F) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64",
  "Mozilla/5.0 (Linux; Android 12; PDNM00 Build/RKQ1.211103.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046125 Mobile Safari/537.36 wxwork/4.0.16 ColorScheme/Dark MicroMessenger/7.0.1 NetType/WIFI Language/zh Lang/zh",
  "Mozilla/5.0 (Linux; U; Android 12; zh-CN; PDNM00 Build/RKQ1.211103.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/69.0.3497.100 UWS/3.22.2.43 Mobile Safari/537.36 UCBS/3.22.2.43_220223200704 ChannelId(0) NebulaSDK/1.8.100112 Nebula AlipayDefined(nt:WIFI,ws:360|0|3.0) AliApp(AP/10.3.0.8000) AlipayClient/10.3.0.8000 Language/zh-Hans useStatusBar/true isConcaveScreen/false Region/CNAriver/1.0.0",
  "Mozilla/5.0 (Linux; U; Android 12; zh-CN; PDNM00 Build/RKQ1.211103.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/69.0.3497.100 UWS/3.22.1.210 Mobile Safari/537.36 AliApp(DingTalk/6.5.45) com.alibaba.android.rimet/26284409 Channel/263200 language/zh-CN abi/64 UT4Aplus/0.2.25 colorScheme/dark",
  "Mozilla/5.0 (Linux; Android 12; 2112123AC Build/SKQ1.211230.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046125 Mobile Safari/537.36 wxwork/4.0.16 ColorScheme/Light MicroMessenger/7.0.1 NetType/WIFI Language/zh Lang/zh",
  "Mozilla/5.0 (Linux; Android 12; 2112123AC Build/SKQ1.211230.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3770.156 Mobile Safari/537.36 Lark/5.20.4 LarkLocale/zh_CN ChannelName/Feishu TTWebView/0751130016465",
  "Mozilla/5.0 (Linux; Android 12; 2112123AC Build/SKQ1.211230.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4317 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/4291 MicroMessenger/8.0.28.2240(0x28001C3B) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64",
  "Mozilla/5.0 (Linux; U; Android 12; zh-cn; 2112123AC Build/SKQ1.211230.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.116 Mobile Safari/537.36 XiaoMi/MiuiBrowser/16.9.11 swan-mibrowser",
  "Mozilla/5.0 (Linux; Android 10; JEF-AN00 Build/HUAWEIJEF-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4317 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/9371 MicroMessenger/8.0.28.2240(0x28001C3B) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64",
  "Mozilla/5.0 (Linux; Android 10; JEF-AN00 Build/HUAWEIJEF-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3770.156 Mobile Safari/537.36 Lark/5.21.3 LarkLocale/zh_CN ChannelName/Feishu TTWebView/0751130016465",
  "Mozilla/5.0 (Linux; Android 10; JEF-AN00 Build/HUAWEIJEF-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046125 Mobile Safari/537.36 wxwork/4.0.16 ColorScheme/Light MicroMessenger/7.0.1 NetType/WIFI Language/zh Lang/zh",

  // iOS
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.28(0x18001c2d) NetType/WIFI Language/zh_CN",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0.2 Mobile/15E148 Safari/604.1 Lark/5.21.3 LarkLocale/zh_CN ChannelName/Feishu LKBrowserIdentifier/E94CFA9A-E0D6-45F0-9100-1A46F2D5F104",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 wxwork/4.0.16 MicroMessenger/7.0.1 Language/zh ColorScheme/Light",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d26) NetType/WIFI Language/zh_CN",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20A362 QQ/8.9.10.668 V1_IPH_SQ_8.9.10_1_APP_A Pixel/1080 SimpleUISwitch/0 StudyMode/0 CurrentMode/0 CurrentFontScale/1.000000 QQTheme/1000 AppId/537134832 Core/WKWebView Device/Apple(iPhone 12 mini) NetType/WIFI QBWebViewType/1 WKType/1",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20A362 AliApp(DingTalk/6.5.40) com.laiwang.DingTalk/25831625 Channel/201200 language/zh-Hans-CN UT4Aplus/0.0.6 WK",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d26) NetType/WIFI Language/zh_CN",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0.2 Mobile/15E148 Safari/604.1 Lark/5.21.3 LarkLocale/zh_CN ChannelName/Feishu LKBrowserIdentifier/B03AA87A-ED92-428F-9517-1C190196C2F7",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 wxwork/4.0.16 MicroMessenger/7.0.1 Language/zh ColorScheme/Dark",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20A380 AliApp(DingTalk/6.5.45) com.laiwang.DingTalk/26191496 Channel/201200 language/zh-Hans-CN UT4Aplus/0.0.6 WK",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/106.0.5249.70 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20A380 QQ/103.4 TIM/3.4.2.653 V1_IPH_SQ_8.4.8_342_TIM_D Pixel/1284 SimpleUISwitch/1 QQTheme/1015712 Core/WKWebView Device/Apple(iPhone X) NetType/WIFI QBWebViewType/1 WKType/1",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.4 Mobile/15E148 Safari/604.1 Lark/5.21.3 LarkLocale/zh_CN ChannelName/Feishu LKBrowserIdentifier/E3F34B44-C999-4A80-84F0-89CFF00083A3",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.3.1 Mobile/15E148 Safari/604.1 Lark/5.2.3 LarkLocale/zh_CN ChannelName/Feishu",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.18(0x1800123f) NetType/4G Language/zh_CN",

  // Firefox
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:105.0) Gecko/20100101 Firefox/105.0",
];

const unSupportedUserAgent = [
  "Opera/8.0 (Windows NT 5.1; U; en)",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12 Safari/605.1.15",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_16_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.100.0 Safari/537.36",
  "Opera/9.80 (Android; Opera Mini/36.2.2254/119.132; U; id) Presto/2.12.423 Version/12.16)",
  "Opera/9.80 (Android; Opera Mini/36.2.2254/119.132; U; id) Presto/2.12.423 Version/12.16",
  "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko",
  "Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko",
];

test("supportedBrowserReg", () => {
  supportedUserAgents.forEach((i) => {
    const ok = supportedBrowsersReg.test(i);
    if (!ok) {
      log.error(i);
    }
    expect(ok).toBe(true);
  });

  unSupportedUserAgent.forEach((i) => {
    expect(supportedBrowsersReg.test(i)).toBe(false);
  });
});
