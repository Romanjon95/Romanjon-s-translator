const fromText = document.querySelector('.from-text');
const toText = document.querySelector('.to-text');
const exchangeBtn = document.querySelector('.exchange');
const selectTag = document.querySelectorAll('select');
const translateBtn = document.querySelector('.button');
const icons = document.querySelectorAll('.select-icon');

selectTag.forEach((tag, id) => {
  // setting English by default as FROM language and Russian as TO language
  for (const country_code in countries) {
    let selected;
    if (id === 0 && country_code === 'en-GB') {
      selected = 'selected';
    } else if (
      id === 1 && country_code === 'ru-RU'
    ) {
      selected = 'selected';
    }
    let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML('beforeend', option); // adding options tag inside select tag
  }
})

exchangeBtn.addEventListener('click', () => {
  // exchanging textarea
  let tempText = fromText.value,
  tempLang = selectTag[0].value;
  fromText.value = toText.value;
  selectTag[0].value = selectTag[1].value;
  toText.value = tempText;
  selectTag[1].value = tempLang;
})

translateBtn.addEventListener('click', () => {
  let text = fromText.value,
    translateFrom = selectTag[0].value, // getting fromSelect tag value
    translateTo = selectTag[1].value; // getting toSelect tag value
  if (!text) return;
  toText.setAttribute('placehorder', 'Translating...');
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl).then(response => response.json()).then(data => {
    toText.value = data.responseData.translatedText;
    toText.setAttribute('placehorder', 'Translation');
  });
});

icons.forEach(icon => {
  icon.addEventListener('click', ({ target }) => {
    if (target.classList.contains('copy')) {
      // if clicked img has id "from", copy the fromTextarea value, else copy the toTextarea value
      if (target.id === 'from') {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      let utterance;
      if (target.id === 'from') {
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTag[0].value;
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTag[1].value;
      }
      speechSynthesis.speak(utterance);
    }
  });
})

//Press Enter = Press Button
// fromText.addEventListener('keypress', (e) => {
//   if (e.keyCode === 13) {
//     translateBtn.click();
//   }
// })