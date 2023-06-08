/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
export const theme = {
  extend: {
    colors: {
      primary: '#DDCCAA',
      modal: '#222030',
      headerBg: '#24222F',
      search: '#CED4DA',
      movie: '#11101A',
      field: '#CED4DA'
    },
    width: {
      form: '688px',
      quote: '840px',
      profile: '1200px'
    },
    height: {
      posterHeight: '441px',
      thumbnailHeight: '141px'
    },
    fontFamily: {
      geo: ['geo', 'sans-serif'],
      eng: ['eng', 'sans-serif']
    },
    backgroundImage: {
      landingBg: 'linear-gradient(180deg, #11101A 0%, #08080D 100.52%);',
      transparentLandingBg:
        'linear-gradient(180deg, rgba(17, 16, 26, 0.8) 0%, rgba(8, 8, 13, 0.8) 100.52%);'
    }
  }
}
