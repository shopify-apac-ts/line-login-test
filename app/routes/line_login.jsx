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
      <h1>LINE Login process completed! See URL parameters for the result.</h1>
    </div>
  );
}