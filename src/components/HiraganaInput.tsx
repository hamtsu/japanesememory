import { useState, FC } from "react";

const HiraganaInput: FC = () => {
  const [romaji, setRomaji] = useState<string>("");

  const romajiToHiraganaMap: { [key: string]: string } = {
    a: "あ",
    i: "い",
    u: "う",
    e: "え",
    o: "お",
    ka: "か",
    ki: "き",
    ku: "く",
    ke: "け",
    ko: "こ",
    sa: "さ",
    shi: "し",
    su: "す",
    se: "せ",
    so: "そ",
    ta: "た",
    chi: "ち",
    tsu: "つ",
    te: "て",
    to: "と",
    na: "な",
    ni: "に",
    nu: "ぬ",
    ne: "ね",
    no: "の",
    ha: "は",
    hi: "ひ",
    fu: "ふ",
    he: "へ",
    ho: "ほ",
    ma: "ま",
    mi: "み",
    mu: "む",
    me: "め",
    mo: "も",
    ya: "や",
    yu: "ゆ",
    yo: "よ",
    ra: "ら",
    ri: "り",
    ru: "る",
    re: "れ",
    ro: "ろ",
    wa: "わ",
    wo: "を",
    nn: "ん",
    ga: "が",
    gi: "ぎ",
    gu: "ぐ",
    ge: "げ",
    go: "ご",
    za: "ざ",
    ji: "じ",
    zu: "ず",
    ze: "ぜ",
    zo: "ぞ",
    da: "だ",
    dji: "ぢ",
    dzu: "づ",
    de: "で",
    do: "ど",
    ba: "ば",
    bi: "び",
    bu: "ぶ",
    be: "べ",
    bo: "ぼ",
    pa: "ぱ",
    pi: "ぴ",
    pu: "ぷ",
    pe: "ぺ",
    po: "ぽ",
    kya: "きゃ",
    kyu: "きゅ",
    kyo: "きょ",
    sha: "しゃ",
    shu: "しゅ",
    sho: "しょ",
    cha: "ちゃ",
    chu: "ちゅ",
    cho: "ちょ",
    nya: "にゃ",
    nyu: "にゅ",
    nyo: "にょ",
    hya: "ひゃ",
    hyu: "ひゅ",
    hyo: "ひょ",
    mya: "みゃ",
    myu: "みゅ",
    myo: "みょ",
    rya: "りゃ",
    ryu: "りゅ",
    ryo: "りょ",
    gya: "ぎゃ",
    gyu: "ぎゅ",
    gyo: "ぎょ",
    ja: "じゃ",
    ju: "じゅ",
    jo: "じょ",
    bya: "びゃ",
    byu: "びゅ",
    byo: "びょ",
    pya: "ぴゃ",
    pyu: "ぴゅ",
    pyo: "ぴょ",
    dya: "ぢゃ",
    dyu: "ぢゅ",
    dyo: "ぢょ",
    zya: "じゃ",
    zyu: "じゅ",
    zyo: "じょ",
    xyo: "ょ",
    xya: "ゃ",
    xtsu: "っ",
    xyu: "ゅ",
    tte: "って",
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputRomaji = event.target.value.toLowerCase();
    let convertedHiragana = "";

    let currentRomaji = inputRomaji;
    while (currentRomaji.length > 0) {
      let foundMatch = false;

      for (let key in romajiToHiraganaMap) {
        if (currentRomaji.startsWith(key)) {
          convertedHiragana += romajiToHiraganaMap[key];
          currentRomaji = currentRomaji.slice(key.length);
          foundMatch = true;
          break;
        }
      }

      if (!foundMatch) {
        const singleChar = currentRomaji.slice(0, 1);
        if (romajiToHiraganaMap.hasOwnProperty(singleChar)) {
          convertedHiragana += romajiToHiraganaMap[singleChar];
          currentRomaji = currentRomaji.slice(1);
        } else {
          convertedHiragana += singleChar;
          currentRomaji = currentRomaji.slice(1);
        }
      }
    }

    setRomaji(convertedHiragana);
  };

  return (
    <input
      className="bg-neutral-900 text-slate-100 p-2 text-lg rounded-md w-full"
      placeholder={"Enter answer"}
      lang="ja"
      maxLength={40}
      autoCorrect="off"
      autoCapitalize="off"
      autoComplete="off"
      spellCheck="false"
      value={romaji}
      onChange={handleInputChange}
    />
  );
};

export default HiraganaInput;
