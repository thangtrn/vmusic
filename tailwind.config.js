/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         fontFamily: {
            inter: ['Inter', 'sans-serif'],
            roboto: ['Roboto', 'sans-serif'],
         },
         colors: {
            'primary-color': 'var(--primary-color)',
            'secondary-color': 'var(--secondary-color)',
            'alpha-color': 'var(--alpha-color)',
            'purple-color': 'var(--purple-color)',
            'border-color': 'var(--border-color)',
            'header-color': 'var(--header-color)',
            'sidebar-color': 'var(--sidebar-color)',
            'sidebar-popup-color': 'var(--sidebar-popup-color)',
            'playingbar-color': 'var(--playingbar-color)',
            'overlay-color': 'var(--overlay-color)',
            'icon-hover-color': 'var(--icon-hover-color)',

            'progressbar-active': 'var(--progressbar-active)',
            'progressbar-player': 'var(--progressbar-player)',
         },
         textColor: {
            'search-color': 'var(--search-color)',
            'navigation-color': 'var(--navigation-color)',
            'hover-color': 'var(--hover-color)',
            'title-color': 'var(--title-color)',
            'subtitle-color': 'var(--subtitle-color)',
         },
         boxShadow: {
            header: '0 3px 5px var(--header-shadow-color)',
            primary: 'var(--header-shadow-color) 0px 5px 15px',
            'search-bottom': '0 4px 6px 0 rgba(32,33,36,.28)',
            'search-top': '0 1px 5px 0 rgba(0,0,0,.2)',
            media: '0 5px 8px 0 rgba(0,0,0,.2)',
            drawer:
               '0 1px 0 rgba(0,0,0,0.3),0 1px 6px rgba(0,0,0,0.3),inset 0 1px 1px hsla(0,0%,100%,0.3)',
            tab: '0 1px 3px 0 rgba(0,0,0,.07)',
            'menu-context': '0 2px 5px rgba(0,0,0,0.3)',
            button: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
         },
         spacing: {
            header: '70px',
            playingbar: '90px',
            sidebar: '240px',
            drawer: 'calc(100vh - 90px)',
            section: '60px',
         },
         maxHeight: {
            'search-list': 'calc(100vh - 180px)',
         },
         lineHeight: {
            normal: 'normal',
         },
      },
   },
   plugins: [import('@tailwindcss/line-clamp')],
};
