/** @jsx h */
import { Fragment, h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<string | null> = {
  async GET(req, ctx) {
    const urlArray = req.url.split('/');
    const resp = await fetch(`${urlArray[0]}//${urlArray[2]}/api/joke`);
    console.log(resp);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const result = await resp.text();
    return ctx.render(result);
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