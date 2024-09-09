/** @type {import('next').NextConfig} */
import webpack from 'next/dist/compiled/webpack/webpack-lib.js';

const nextConfig = {
  images: { unoptimized: true },
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,

  webpack: (config) => {
    config.resolve.extensions.push('.web.js', '.js');

    config.plugins.push(
      new webpack.DefinePlugin({
        // CONTACT FORM
        'process.env.ENDPOINT_SEND_FORM': JSON.stringify('/wp-json/send/form/'),
        // END CONTACT FORM

        // CONTACT CITA FORM
        'process.env.ENDPOINT_SEND_FORM_HOTEL': JSON.stringify('/wp-json/send/formcita/'),
        // END CONTACT CITA FORM

        // CONTACT DONACION FORM
        'process.env.ENDPOINT_SEND_FORM_HOTEL': JSON.stringify('/wp-json/send/formdonacion/'),
        // END CONTACT DONACION FORM
      })
    );

    return config;
  },
};

export default nextConfig;
