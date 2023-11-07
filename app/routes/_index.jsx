import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  const env = context.env;
  return defer({env});
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
//  console.log("env", data.env);
  const line_login_url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${data.env.LINELOGIN_CLIENTID}&redirect_uri=${data.env.REDIRECT_URI}&state=12345abcde&scope=profile%20openid%20email`;
  console.log("line_login_url", line_login_url);

  return (
    <div className="home">
      <h1>
        <a href={line_login_url}>Sign in with LINE Login.</a>
      </h1>
    </div>
  );
}


/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
