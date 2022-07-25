/** @jsx h */
import { Fragment, h } from "preact";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { handler as jokeHandler } from './api/joke.ts';

const GetFromHandler = async (
  req: Request,
  ctx: HandlerContext,
  handler: (_req: Request, _ctx: HandlerContext) => Response
) => {
  const response = handler(req, ctx);
  const decoded = new TextDecoder().decode(
    (await response.body?.getReader().read())?.value
  );

  return decoded;
};

export const handler: Handlers<string | null> = {
  async GET(_req: Request, _ctx: HandlerContext) {
    const joke = await GetFromHandler(_req, _ctx, jokeHandler);
      return _ctx.render(joke);
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