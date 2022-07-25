/** @jsx h */
import { Fragment, h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<string | null> = {
  async GET(_req, _ctx) {
    const urlArray = _req.url.split('/');
    const apiUrl = `${urlArray[0]}//${urlArray[2]}/api/joke`;
    console.log(apiUrl);
    const resp = await fetch(apiUrl);
    console.log(resp);
    if (resp.status === 404) {
      return _ctx.render(null);
    }
    const result = await resp.text();
    return _ctx.render(result);
  },
};

export default function Greet(props: PageProps) {
  console.log(props);
  return (
    <Fragment>
      <div>Hello {props.params.name}</div>
      <div>Joke for you: {props.data}</div>
    </Fragment>
  );
}