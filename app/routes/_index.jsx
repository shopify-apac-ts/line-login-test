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
  const encoded_redirect_uri = encodeURIComponent(env.LINELOGIN_REDIRECT_URI);
  const line_login_url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${env.LINELOGIN_CLIENTID}&redirect_uri=${encoded_redirect_uri}&state=12345abcde&scope=profile%20openid%20email`;

  return defer({env, line_login_url});
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  console.log("line_login_url", data.line_login_url);

  return (
    <div className="home">
      <h1>
        <a href={data.line_login_url}>
          <img src="https://cdn.shopify.com/s/files/1/0812/5399/0422/files/btn_login_base.png?v=1699401536" />
          <p>Sign in with LINE Login.</p>
        </a>
      </h1>
    </div>
  );
}


/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
