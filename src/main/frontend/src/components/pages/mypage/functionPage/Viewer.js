import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Button from "../../../baseComponents/Button";

function ContentsViewer({ contents, isTag }) {

    if (!isTag) {
        // <p> 태그를 제거하고 줄바꿈 문자를 추가
        const withoutPTags = contents.replace(/<p[^>]*>(.*?)<\/p>/g, '$1\n');

        // <p> 태그를 제거하고 줄바꿈 문자를 추가
        const withoutBrTags = withoutPTags.replace(/<br[^>]*>(.*?)<\/br>/g, '$1\n');

        // 나머지 태그들 제거
        const withoutTags = withoutBrTags.replace(/<[^>]*>/g, '');

        // &nbsp; 제거
        const withoutNBSP = withoutTags.replace(/&nbsp;/g, ' ');

        return withoutNBSP ? withoutNBSP : '';
    } else {
        return <Viewer initialValue={contents || ''} />;
    }
}

ContentsViewer.defaultProps = {
    isTag: true
};

export default ContentsViewer;