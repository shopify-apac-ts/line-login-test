import {json, redirect, defer} from '@shopify/remix-oxygen';
import {Form, Link, useActionData, useLoaderData} from '@remix-run/react';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'LINE Login'}];
};

/** We come here after LINE Login redirect */
export async function loader({request, context}) {

  /** LINE access token endpoint - 
      https://developers.line.biz/ja/reference/line-login/#issue-access-token
  */
  const lineAccessTokenUrl = new URL(`https://api.line.me/oauth2/v2.1/token`);
  const code = new URL(request.url).searchParams.get('code');
  const state = new URL(request.url).searchParams.get('state');
  // TODO: state identification
  
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const body = new URLSearchParams();
  body.append('grant_type', 'authorization_code');
  body.append('code', code);
  body.append('redirect_uri', context.env.REDIRECT_URI);
  body.append('client_id', context.env.LINELOGIN_CLIENTID);
  body.append('client_secret', context.env.LINELOGIN_CLIENTSECRET);

  const response = await fetch(lineAccessTokenUrl, {
    method: 'POST',
    headers,
    body,
  });

  console.log("response", response);
  
  if (!response.ok) {
    throw new Error(await response.text());
  }

  const {access_token, expires_in, id_token, refresh_token} =
    await response.json();

  context.session.set('line_access_token', access_token);
  context.session.set('line_token_expires_in', expires_in);
  context.session.set('line_id_token', id_token);
  context.session.set('line_refresh_token', refresh_token);

  return defer({request, context, access_token, expires_in, id_token, refresh_token});
//  return defer({request, context, headers, body, code, state});
}

export default function Login() {
  const loaderData = useLoaderData();
  console.log("loaderData", loaderData);
//  const actionData = useActionData();
//  console.log("actionData", actionData);

  return (
    <div className="login">
      <h1>LINE Login process completed! See URL parameters for the result.</h1>
    </div>
  );
}