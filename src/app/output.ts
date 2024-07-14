import Data from '../../public/button_list.json';

// 数値を4文字の16進数文字列に変換(0フィルあり)
const num2HexStr = (num: number) => {
  const hexString = num.toString(16).toUpperCase(); // 16進数に変換し、大文字にする
  return hexString.padStart(4, '0');
};

// 16進数文字列を数値に変換
const hexStr2Num = (hexString: string) => {
  return parseInt(hexString, 16); // 基数16で数値に変換
};

// 16進数文字列かどうか判定
const isHexString = (str: string) => {
  return /^[0-9A-Fa-f]+$/.test(str);
};

// ラベルの値をシリアル値に変換するマップ
const label2SerialMap = Data.reduce<{ [key: string]: number }>((map, item) => {
  map[item.label] = item.serial;
  return map;
}, {});

// シリアル値をラベルの値に変換するマップ
const serial2LabelMap = Data.reduce<{ [key: number]: string }>((map, item) => {
  map[item.serial] = item.label;
  return map;
}, {});

// 連続再生の一覧を再現できるURLを出力する
export const createUrl = (items: string[]): string => {
  const paramStr = items.map((item) => num2HexStr(label2SerialMap[item])).join('');
  const url = new URL('', window.location.origin);
  url.search = new URLSearchParams({ v: paramStr }).toString();
  return url.toString();
};

// クエリパラメータを読み込んで再生リストを返す
export const parseQueryParam = (playListStr: string) => {
  //まずは4文字ずつの配列に直す
  const playListArr = playListStr.match(/.{1,4}/g);
  const retArr: string[] = [];

  playListArr?.forEach((item) => {
    if (isHexString(item)) {
      retArr.push(serial2LabelMap[hexStr2Num(item)]);
    } else {
      return [];
    }
  });
  return retArr;
};
