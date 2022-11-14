package com.openblocks.infra.util;

import org.apache.commons.lang3.StringUtils;

import com.openblocks.infra.constant.NewUrl;

public final class AssetUtils {

    public static String toAssetPath(CharSequence assetId) {
        return StringUtils.isBlank(assetId) ? "" : NewUrl.ASSET_URL + "/" + assetId;
    }
}
