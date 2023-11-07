import {json, redirect} from '@shopify/remix-oxygen';
import {Form, Link, useActionData} from '@remix-run/react';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'LINE Login'}];
};

export default function Login() {

  return (
    <div className="login">
      <h1>Sign in.</h1>
    </div>
  );
}