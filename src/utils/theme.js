const theme = {
  colors: {
    lightBackground: '#EBF3FA',
    darkBackground: '#1D1F23',
    lightMainColor: '#EBF3FA',
    darkMainColor: '#1D1F23',
  },
  size: {
    smallest: '25em', //275px
    smaller: '31.25em', //500px
    small: '37.5em', //600px
    medium: '56.25em', //900px
    large: '80em', //1300px
    larger: '90em', //1300px
    largest: '97em', //1500px
  },
  mediaQueries: {
    smallest: `only screen and (max-width: 25em)`,
    smaller: 'only screen and (max-width: 31.25em)',
    small: 'only screen and (max-width: 37.5em)',
    medium: 'only screen and (max-width: 56.25em)',
    large: 'only screen and (max-width: 80em)',
    larger: 'only screen and (max-width: 90em)',
    largest: 'only screen and (max-width: 97em)',
  },
};

export default theme;
