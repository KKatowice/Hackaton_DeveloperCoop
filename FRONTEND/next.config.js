/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',  //ricorda smania api
    images: { unoptimized : true},
    exportImageAssets: true,
    /* api: {
      bodyParser: false,
  }, */
  asset: {
    publicPath: '/public',
  },
}

module.exports = nextConfig