/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
};

import {withContentlayer} from "next-contentlayer";

export default withContentlayer(nextConfig);