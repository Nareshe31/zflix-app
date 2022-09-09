const withPWA = require('next-pwa');


module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          }
        ]
      },
      {
              "source": "/api/(.*)",
              "headers": [
                { "key": "Access-Control-Allow-Credentials", "value": "true" },
                { "key": "Access-Control-Allow-Origin", "value": "https://zflix-app.netlify.app" }, // Change this to specific domain for better security
                {
                  "key": "Access-Control-Allow-Methods",
                  "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT"
                },
                {
                  "key": "Access-Control-Allow-Headers",
                  "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
                }
              ]
            }
    ]
  },
  // headers:[
  //     {
  //       "source": "/api/(.*)",
  //       "headers": [
  //         { "key": "Access-Control-Allow-Credentials", "value": "true" },
  //         { "key": "Access-Control-Allow-Origin", "value": "https://zflix-app.netlify.app/" }, // Change this to specific domain for better security
  //         {
  //           "key": "Access-Control-Allow-Methods",
  //           "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  //         },
  //         {
  //           "key": "Access-Control-Allow-Headers",
  //           "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  //         }
  //       ]
  //     }
  //   ],
    images: {
      domains: ['image.tmdb.org','www.themoviedb.org','res.cloudinary.com','i.ytimg.com'],
    }
})
