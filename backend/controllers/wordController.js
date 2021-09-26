const axios = require('axios');

function parsingDataFromInput(req, res, next) {
  const { str } = req.body;
  const url = `http://google.ru/search?q=${str}+hh`;
  axios(url)
    .then((response) => response.data)
    .then((data) => {
      let regex2 = /\D*/;
      const regex = /https\:\/\/hh\.ru\/\w*\/\d*/gm;
      let found = (data.match(regex) || []).map((e) => e.replace(regex2, ''));
      let fin = found.filter((elem) => elem !== '');
      return fin;
    })
    .then((data) => {
      let array = data.map((elem) => {
        let urlWithId = `https://api.hh.ru/employers/${elem}?User-Agent=api-test-agent`;
        return axios.get(urlWithId);
      });
      let a = Promise.allSettled(array)
        .then((data) => data.filter((x) => x.status === 'fulfilled'))
        .catch((err) => console.log(err));
      a.then((x) => {
        const dataFinal = [];
        x.forEach((element) => {
          dataFinal.push({
            companyName: element.value.data.name,
            companyLogo: element.value.data.logo_urls,
            companyId: element.value.data.id,
          });
          return {
            companyName: element.value.data.name,
            companyLogo: element.value.data.logo_urls,
            companyId: element.value.data.id,
          };
        });
        res.json(dataFinal);
      }).catch((err) => console.log(err));
    })
    .catch((err) => res.json(err));
}

module.exports = parsingDataFromInput;
