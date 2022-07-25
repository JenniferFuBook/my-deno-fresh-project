/** @jsx h */
import { Fragment, h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<string | null> = {
  async GET(_, _ctx) {
    const resp = await fetch('http://localhost:8000/api/joke');
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